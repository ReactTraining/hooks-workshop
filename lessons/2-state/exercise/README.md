# State

## "Show Password" Checkbox

We want to make the checkbox show or hide the password.

1. Open up `LoginForm.js`.
2. Add some state to track if the checkbox is checked or not.
3. Use your state for the `defaultChecked` prop on the checkbox.
4. Add an `onChange` handler to the checkbox.
5. In the `onChange` handler, toggle the state.

## Logging In

We want to be able to actually log in to the app and render some sort of loading state while we wait.

1. Add some state for `loading`.
2. Add some UI for the loading state (maybe just change the text in the button to "loading", but do whatever you'd like!).
3. Add `onSubmit` to the form. Don't forget to `event.preventDefault()`.
4. In `onSubmit` set the loading state to true.
5. Use the `event.target.elements` array to get the values from the email/password fields:

```jsx
// This is "destructuring" the value from event.target.elements
const [emailNode, passwordNode] = event.target.elements
emailNode.value
passwordNode.value
```

6. Login with `login(email, pass)`, it returns a promise so you can await it or use `then`.

```jsx
login(email, pass)
  .then(() => {
    // all done
  })
  .catch(() => {
    // error
  })

// or

try {
  await login(email, pass)
} catch (error) {
  // error
}
```

Try to log in with a non-existing username and password to purposely trigger an invalid request so we can test for a user the error message. Log the error message to the console and see what you get.

Now you decide what you'd like to do with that error message, how can you display it to the user?

After you've got a proper error message showing up, use your real email and password.

If login is successful, the app will automatically change the screens.

Alternatively, you can `useRef` instead of `event.target.elements`.

```
// create it
const userRef = useRef()

// assign it
<input ref={userRef} />

// read it
const handleLogin = () => {
  const node = userRef.current
  console.log(node.value)
}
```
