# Data Loading, Authentication

We're going to be working in `App.js` to set up the login flow. The UI will render three states: loading, logged in, logged out.

This app does client-side authentication with an auth listener called `onAuthStateChanged(auth => {})`. Whenever the user logs in, or out, this listener will callback with the auth state, including when its first created.

```jsx
onAuthStateChanged(auth => {
  if (auth) {
    // logged in
  } else {
    // logged out
  }
})
```

`onAuthStateChanged` returns an unsubscribe function to stop listening to auth state changes.

```jsx
const unsubscribe = onAuthStateChanged(cb)

// later
unsubscribe()
```

When displaying the logged in/out/loading UI there are two states of concern: if we have attempted to log in, and if we are logged in.

The reason we want both states is so that we can render a "loading" indicator (or nothing) until we've at least attempted to log in, otherwise we'd end up flashing the logged out screen, which is kinda not awesome.

## Instructions

- add an effect that calls `onAuthStateChanged`
- make sure it doesn't add a new handler every render
- make sure to clean up the subscription

Once that's working, refactor to a custom hook called `useAuth` that looks something like this when you use it.

```
const { auth, authAttempted } = useAuth()
```
