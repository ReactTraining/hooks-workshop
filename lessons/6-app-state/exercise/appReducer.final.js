const initialState = { authAttempted: false, auth: null, user: null }

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_CHANGE": {
      return { ...state, auth: action.auth, authAttempted: true }
    }
    case "LOAD_USER": {
      return { ...state, user: action.user }
    }
    default:
      return state
  }
}

export { initialState }
export default appStateReducer
