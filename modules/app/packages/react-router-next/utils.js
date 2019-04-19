import invariant from "invariant"

////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
const startsWith = (string, search) => {
  return string.substr(0, search.length) === search
}

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route: theThingPassedIn, params, uri }
//
// I know, I should use TypeScript not comments for these types.
const pick = (routes, location) => {
  let match
  let default_

  const { pathname: uri } = location
  const [uriPathname] = uri.split("?")
  const uriSegments = segmentize(uriPathname)
  const isRootUri = uriSegments[0] === ""
  const ranked = rankRoutes(routes)

  for (let i = 0, l = ranked.length; i < l; i++) {
    let missed = false
    const route = ranked[i].route

    if (route.default) {
      default_ = {
        route,
        params: {},
        uri
      }
      continue
    }

    const routeSegments = segmentize(route.path)
    const params = {}
    const max = Math.max(uriSegments.length, routeSegments.length)

    if (route.matchState && !route.matchState(location.state)) {
      missed = true
      continue
    }

    let index = 0
    for (; index < max; index++) {
      const routeSegment = routeSegments[index]
      const uriSegment = uriSegments[index]

      const isSplat = routeSegment === "*"
      if (isSplat) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        params["*"] = uriSegments
          .slice(index)
          .map(decodeURIComponent)
          .join("/")

        if (routeIsValid(route, location, params)) {
          break
        } else {
          missed = true
          break
        }
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true
        break
      }

      const dynamicMatch = paramRe.exec(routeSegment)

      if (dynamicMatch && !isRootUri) {
        const matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1
        invariant(
          matchIsNotReserved,
          `<Router> dynamic segment "${
            dynamicMatch[1]
          }" is a reserved name. Please use a different name in path "${
            route.path
          }".`
        )
        const value = decodeURIComponent(uriSegment)
        params[dynamicMatch[1]] = value
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true
        break
      }
    }

    if (!missed && routeIsValid(route, location, params)) {
      match = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      }
      break
    }
  }

  return match || default_ || null
}

const routeIsValid = (route, location, params) =>
  route.validate ? route.validate({ location, params }) : true

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, cleans up the match object
const match = (path, uri) => {
  const match_ = pick([{ path }], { pathname: uri })
  return match_
    ? {
        path,
        uri,
        params: match_.params
      }
    : null
}

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
const resolve = (to, base) => {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to
  }

  const [toPathname, toQuery] = to.split("?")
  const [basePathname] = base.split("?")

  const toSegments = segmentize(toPathname)
  const baseSegments = segmentize(basePathname)

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery)
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    const pathname = baseSegments.concat(toSegments).join("/")
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery)
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  const allSegments = baseSegments.concat(toSegments)
  const segments = []
  for (let i = 0, l = allSegments.length; i < l; i++) {
    const segment = allSegments[i]
    if (segment === "..") segments.pop()
    else if (segment !== ".") segments.push(segment)
  }

  return addQuery("/" + segments.join("/"), toQuery)
}

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)
const insertParams = (path, params) => {
  const segments = segmentize(path)
  return (
    "/" +
    segments
      .map(segment => {
        const match = paramRe.exec(segment)
        return match ? params[match[1]] : segment
      })
      .join("/")
  )
}

const validateRedirect = (from, to) => {
  const filter = segment => isDynamic(segment)
  const fromString = segmentize(from)
    .filter(filter)
    .sort()
    .join("/")
  const toString = segmentize(to)
    .filter(filter)
    .sort()
    .join("/")
  return fromString === toString
}

////////////////////////////////////////////////////////////////////////////////
// Junk
const paramRe = /^:(.+)/

const SEGMENT_POINTS = 4
const STATIC_POINTS = 3
const DYNAMIC_POINTS = 2
// not sure if this should be 2 or 1, need to do some thinking,
// but I think just 1 because all we want to do is beat out another
// route with our same path (or same score) and get one little bump
// from the state
const STATE_POINTS = 1
const SPLAT_PENALTY = 1
const ROOT_POINTS = 1

const isRootSegment = segment => segment === ""
const isDynamic = segment => paramRe.test(segment)
const isSplat = segment => segment === "*"

const rankRoute = (route, index, state) => {
  // TODO: should we build query params in and match on that too?!
  // TODO: should default routes match state?
  let score = route.default
    ? 0
    : segmentize(route.path).reduce((score, segment) => {
        score += SEGMENT_POINTS
        if (isRootSegment(segment)) score += ROOT_POINTS
        else if (isDynamic(segment)) score += DYNAMIC_POINTS
        else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY
        else score += STATIC_POINTS
        return score
      }, 0)

  if (route.matchState) {
    score += STATE_POINTS
  }

  return { route, score, index }
}

const rankRoutes = routes =>
  routes
    .map(rankRoute)
    .sort((a, b) =>
      a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
    )

const segmentize = uri =>
  uri
    // strip starting/ending slashes
    .replace(/(^\/+|\/+$)/g, "")
    .split("/")

const addQuery = (pathname, query) => pathname + (query ? `?${query}` : "")

const reservedNames = ["uri", "path"]

////////////////////////////////////////////////////////////////////////////////
export { startsWith, pick, match, resolve, insertParams, validateRedirect }
