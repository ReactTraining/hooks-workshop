# State

## Password Field

We want to make the checkbox show or hide the password.

Open up `LoginForm.js`.

Add some state to track if the checkbox is checked or not.

Use your state for the `defaultChecked` prop on the checkbox.

Add an onChange handler to the checkbox.

In the onChange handler, toggle the state.

## Logging In

We want to be able to actually log in to the app and render some sort of loading state while we wait.

We're still in `LoginForm.js`

Add some state for loading.

Add some UI for the loading state (maybe just change the text in the button to "loading", but do whatever you'd like!).

Add `onSubmit` to the form. Don't forget to `event.preventDefault()`.

In `onSubmit` set the loading state to true.

Use the `event.target.elements` array to get the values from the email/password fields:

```jsx
const [emailNode, passwordNode] = event.target.elements
emailNode.value
passwordNode.value
```

Login with `login(email, pass)`, it returns a promise so you can await it or use `then`.

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

Try to log in, but use gibberish for your username / password.

We want to indicate to the user the error message. Log the error message to the console and see what you get.

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
