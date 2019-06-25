const initialState = { authAttempted: false, auth: null, user: null }

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_CHANGE": {
      return { ...state, auth: action.auth, authAttempted: true }
    }
    case "LOAD_USER": {
      const { user } = action
      return { ...state, user }
    }
    default:
      return state
  }
}

export { initialState }
export default appStateReducer
