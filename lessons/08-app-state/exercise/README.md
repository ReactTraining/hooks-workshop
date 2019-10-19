# useReducer and App State

The "auth" object is not the same as the "user". After the user has logged in, we need to fetch their user data.

Open up `LoggedIn.js` and notice there's a null user object. You can fetch a user with `fetchUser(uid)`, which has already been imported for you.

- Access the `auth` object from `useAppState`
- Fetch the user with `auth.uid`
- Dispatch an action when you have the user
- Edit `appReducer.js` to handle the action you just dispatched
- Now access the user from `useAppState`

You can review modules/app/app-state.js to see how we created `useAppState`. Remember that `useAppState` this gives you the result of a `useReducer` call.
