const getLocation = source => {
  const { pathname, search, hash } = source.location
  return {
    pathname,
    search,
    hash,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || "initial"
  }
}

const createHistory = (source, options) => {
  let listeners = []
  let location = getLocation(source)
  let transitioning = false
  let resolveTransition = () => {}

  return {
    get location() {
      return location
    },

    get transitioning() {
      return transitioning
    },

    _onTransitionComplete() {
      transitioning = false
      resolveTransition()
    },

    listen(listener) {
      listeners.push(listener)

      const popstateListener = () => {
        location = getLocation(source)
        listener({ location, action: "POP" })
      }

      source.addEventListener("popstate", popstateListener)

      return () => {
        source.removeEventListener("popstate", popstateListener)
        listeners = listeners.filter(fn => fn !== listener)
      }
    },

    // can go to relative routes: "foo", "./foo", "../foo"
    // absolute routes: "/foo"
    // or move through history: -1, 2, 1
    navigate(to, { state, replace = false } = {}) {
      // TODO: is this naive? What about suspense, `transitioning`, etc.?
      if (typeof to === "number") {
        source.history.go(to)
        return
      }

      state = { ...state, key: Date.now() + "" }
      // try...catch iOS Safari limits to 100 pushState calls
      try {
        if (transitioning || replace) {
          source.history.replaceState(state, null, to)
        } else {
          source.history.pushState(state, null, to)
        }
      } catch (e) {
        source.location[replace ? "replace" : "assign"](to)
      }

      location = getLocation(source)
      transitioning = true
      const transition = new Promise(res => (resolveTransition = res))
      listeners.forEach(listener => listener({ location, action: "PUSH" }))
      return transition
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native
const createMemorySource = (initialPathname = "/") => {
  let index = 0
  const stack = [{ pathname: initialPathname, search: "" }]
  const states = []

  return {
    get location() {
      return stack[index]
    },
    addEventListener(name, fn) {},
    removeEventListener(name, fn) {},
    history: {
      get entries() {
        return stack
      },
      get index() {
        return index
      },
      get state() {
        return states[index]
      },
      pushState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?")
        index++
        stack.push({ pathname, search })
        states.push(state)
      },
      replaceState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?")
        stack[index] = { pathname, search }
        states[index] = state
      }
    }
  }
}

// creates a source from a "history" object
const createCompatHistorySource = history => {
  let listeners = []
  let unlisteners = []
  return {
    get location() {
      return history.location
    },
    addEventListener(name, fn) {
      unlisteners.push(history.listen(fn))
      listeners.push(fn)
    },
    removeEventListener(name, fn) {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
      unlisteners.splice(index, 1)
    },
    history: {
      get state() {
        return history.state
      },
      pushState(state, _, uri) {
        history.push(uri, state)
      },
      replaceState(state, _, uri) {
        history.replace(uri, state)
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history
const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

const getSource = () => {
  return canUseDOM ? window : createMemorySource()
}

const globalHistory = createHistory(getSource())

const { navigate } = globalHistory

////////////////////////////////////////////////////////////////////////////////
export {
  globalHistory,
  navigate,
  createHistory,
  createMemorySource,
  createCompatHistorySource
}
