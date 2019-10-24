/* eslint-disable jsx-a11y/anchor-has-content */
import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  createContext,
  Children,
  forwardRef
} from "react"
import { LowPriority, unstable_runWithPriority } from "scheduler"

import { globalHistory } from "./history"
import { pick, match, resolve, insertParams } from "./utils"

////////////////////////////////////////////////////////////////////////////////
// re-exports
export { insertParams }

////////////////////////////////////////////////////////////////////////////////
// Contexts
export const __CompatHistoryContext = createContext()
const HistoryContext = createContext(globalHistory)
const RouterContext = createContext({
  isDefault: true,
  outlet: () => null,
  match: {
    route: { path: "", children: undefined },
    uri: "",
    params: undefined
  },
  location: undefined,
  navigate: undefined
})

////////////////////////////////////////////////////////////////////////////////
// Hooks

export function useLocation() {
  // only listens once in a subtree, all descendant calls will use the location
  // from the root useLocation call.
  const parent = useContext(RouterContext)

  // Remove v6: useHistory just helps us be compat w/ v4
  // const history = useContext(HistoryContext)
  const history = useHistory()

  const [location, setLocation] = useState(history.location)
  const [action, setAction] = useState("INITIAL")

  useEffect(() => {
    if (parent.isDefault) {
      return history.listen(({ location, action }) => {
        unstable_runWithPriority(LowPriority, () => {
          setLocation(location)
          setAction(action)
        })
      })
    }
  }, [parent, history])

  // For suspense, all calls to navigate will replace while suspended, when a
  // new location comes in and this effect runs, we know its safe to mark the
  // transition as complete
  useEffect(() => {
    if (parent.isDefault) {
      history._onTransitionComplete && history._onTransitionComplete()
    }
  }, [location, history, parent])

  return {
    location: parent.isDefault ? location : parent.location,
    navigate: history.navigate,
    action
  }
}

export function useParams() {
  return useContext(RouterContext).match.params
}

export function useOutlet() {
  return useContext(RouterContext).outlet()
}

export function useMatch(path) {
  const { location } = useLocation()
  return match(path, location.pathname)
}

export function useRouteData() {
  const router = useContext(RouterContext)
  const params = useParams()
  const key = insertParams(router.match.uri, params)
  return router.preloadCache[key]
}

////////////////////////////////////////////////////////////////////////////////
// Components
//
// TODO: warn about not using an outlet when a child is matched
// TODO: warn about not providing a /* when a nested router
export function Router({ children, basename }) {
  const parentContext = useContext(RouterContext)
  checkBaseName(basename, parentContext)

  const { location, navigate } = useLocation()

  const basePath =
    basename ||
    parentContext.match.route.parentPath ||
    parentContext.match.route.path

  const routes = makeRoutesFromChildren(children, cleanBasePath(basePath))

  const selfContext = useMemo(() => {
    const match = pickRelative(routes, location)
    const outlet = () => {
      return match ? <Router>{match.route.children}</Router> : null
    }
    return {
      isDefault: false,
      match,
      outlet,
      location,
      navigate: (href, options) => navigate(resolve(href, match.uri), options)
    }
  }, [location, routes, navigate])

  if (selfContext.match) {
    const { element } = selfContext.match.route
    return (
      <RouterContext.Provider value={selfContext}>
        {element}
      </RouterContext.Provider>
    )
  } else {
    if (parentContext.isDefault) logNoMatchWarning(location, children)
    return null
  }
}

export function Route({ children }) {
  return Children.toArray(children).filter(child => child.type !== Route)
}

export function DefaultRoute({ children }) {
  return children
}

const makeCompatHref = (to, href, state) => {
  return [to || href, state]
}

export const Link = forwardRef(
  ({ to, href, state, replace, ...anchorProps }, ref) => {
    ;[href, state] = makeCompatHref(to, href, state)

    const { match: base } = useContext(RouterContext)
    const { location, navigate } = useLocation()

    const resolvedHref = resolve(href, base.uri)
    const isCurrent = location.pathname === href

    return (
      <a
        ref={ref}
        aria-current={isCurrent ? "page" : undefined}
        {...anchorProps}
        href={resolvedHref}
        onClick={event => {
          if (anchorProps.onClick) anchorProps.onClick(event)
          if (shouldNavigate(event)) {
            event.preventDefault()
            navigate(resolvedHref, { state, replace })
          }
        }}
      />
    )
  }
)

export function Redirect({ path, to, status = 301 }) {
  redirectTo(to, status)
  return null
}

export { useOutlet as Outlet }

////////////////////////////////////////////////////////////////////////////////
// Server Rendering

// Provide a context for server rendering.
export function ServerLocation({ url, children }) {
  const [pathname, search] = url.split("?")
  const routerContext = {
    isDefault: false,
    outlet: () => null,
    match: {
      route: { path: "", children: undefined },
      uri: "",
      params: undefined
    },
    location: {
      pathname,
      search: search ? "?" + search : "",
      hash: ""
    },
    navigate: () => {
      throw new Error("You can't call navigate on the server.")
    }
  }
  return <RouterContext.Provider value={routerContext} children={children} />
}

// We don't want to pollute the error namespace with something like `if
// (error.url)` or `error.redirect`, so we create our own type along with a
// helper to check if it is that same type
function RedirectRequest(url, status) {
  this.url = url
  this.status = status
}

export function isRedirect(o) {
  return o instanceof RedirectRequest
}

// TODO: put this on context like navigate so it supports relative paths
export function redirectTo(url, status) {
  throw new RedirectRequest(url, status)
}

////////////////////////////////////////////////////////////////////////////////
// helpers
const SPECIAL_CASE_INDEX_PATH = "."

const inheritPath = (basePath, path) =>
  path === SPECIAL_CASE_INDEX_PATH ? basePath : concatPaths(basePath, path)

// could probably be a lot better...
const concatPaths = (basePath, path) =>
  ("/" + [stripSlashes(basePath), stripSlashes(path)].join("/")).replace(
    /^\/\//,
    "/"
  )

const isRouteType = element =>
  element.type === Route ||
  element.type === DefaultRoute ||
  element.type === Redirect

// Converts React elements into objects (internally called "routes") and deals
// with relative paths by recursing through the children.
//
// This got a little harder to understand w/ the <Route><Comp/></Route> API,
// but it seems to work. Could probably clean this up with some more
// effort
const makeRoutesFromChildren = (
  children,
  basePath,
  routes = [],
  // the parentVars are probably the hardest things to think about in all of
  // this. Every Router is responsible for matching its own children, but then
  // the deeper descendants get pushed into the routes as well so that a more
  // specific nested route will be matched, avoiding surprising results.  When
  // a descendant path is matched, we don't want to actually put the
  // descendant's match info on context (Outlet, Link and navigate would
  // misbehave).  Bur rather, we want the current Router's match data to go
  // there, so when pushing the descendant routes into the array we maintain a
  // reference to the current Router's info and we'll put *that* on context.
  parentElement,
  parentChildRoutes,
  parentPath
) => {
  Children.forEach(children, child => {
    if (!isRouteType(child)) return

    const { path, matchState, validate, children } = child.props

    const childRoutes = []
    Children.forEach(children, child => {
      if (isRouteType(child)) {
        childRoutes.push(child)
      }
    })

    const hasChildRoutes = childRoutes.length > 0

    if (child.type === DefaultRoute) {
      // only include "own" default routes, so we don't accidentally match
      // descendant default routes
      const isOwnDefaultRoute = !parentPath
      if (isOwnDefaultRoute) {
        routes.push({
          path: basePath,
          default: true,
          element: child
        })
      }
      return
    }

    const pathWithBase = inheritPath(basePath, path)

    const route = {
      path: hasChildRoutes ? pathWithBase + "/*" : pathWithBase,
      children: parentChildRoutes || childRoutes,
      parentPath,
      default: child.type === DefaultRoute,
      element: parentElement || child,
      matchState,
      validate
    }

    routes.push(route)

    if (hasChildRoutes) {
      makeRoutesFromChildren(
        childRoutes,
        cleanBasePath(pathWithBase),
        routes,
        parentElement || child,
        parentChildRoutes || childRoutes,
        parentPath || pathWithBase
      )
    }
  })

  return routes
}

const cleanBasePath = path => path.replace(/\/\*$/, "")

const shouldNavigate = event =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const stripSlashes = str => str.replace(/(^\/+|\/+$)/g, "")

const pickRelative = (routes, location) => {
  const match = pick(routes, location)
  if (match) {
    const { parentPath } = match.route
    const isChildMatch = parentPath
    return {
      ...match,
      // Because Router can have deeply nested routes, we need to adjust the URI
      // for the actual Sub-Router to set the right context (for Link, mostly)
      uri: isChildMatch ? insertParams(parentPath, match.params) : match.uri
    }
  } else {
    return match
  }
}

// TODO: need to fix this warning since the API changed to <Route>
const logNoMatchWarning = (location, children) => {
  console.warn(
    `[react-router] URL "${
      location.pathname
    }" did not match any routes in:\n\n<Router>\n  ${Children.map(
      children,
      child =>
        `<${child.type.displayName || child.type.name} path="${
          child.props.path
        }" />`
    ).join(
      "\n  "
    )}\n</Router>\n\nConsider adding a "<NotFound default/>" to your routes to avoid this warning and show your users something more useful.`
  )
}

const checkBaseName = (basename, parent) => {
  if (basename && parent.isDefault === false) {
    throw new Error(
      `[react-router]: props.basename is only allowed for root Routers.\n\n<Router basename="${basename}"/> is a sub-router at path "${
        parent.uri
      }".`
    )
  }
}

////////////////////////////////////////////////////////////////////////////////
// BC
function useHistory() {
  const compatHistory = useContext(__CompatHistoryContext)
  const history = useContext(HistoryContext)
  return compatHistory || history
}
