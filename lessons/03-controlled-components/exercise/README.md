# Controlled inputs

Add a feature that indicates how many characters the user has typed. When they type more than MAX_MESSAGE_LENGTH, change the styles, maybe have the background of the textarea turn red with the `NewPost_error` class on the top level div (you'll still need the `NewPost` className).

- add some state for the value that's in the textarea
- put some default state in it
- add a defaultValue prop to the textarea with the state
- render the 10/200 text from your new state
- pick a smaller number (like 3) for your default state to get it to trigger the error state and make sure your rendering logic is sound.
- add an onChange handler to the textarea
- put the value from the textarea into state

This is an uncontrolled input at this point. Even though we are synchronizing it's state into our state, we aren't *controlling* it because nothing else is changing it.

Check out `RecentPostsDropdown`. That lists the user's recent posts to make it easy to auto fill with previous workouts' descriptions.

Can you figure out how to put a recent post's message into your state and get the textarea to update?

Now that something besides the user typing is changing the state of the textarea, it's a controlled component.

- set state when recent posts `onSelect` is called.
  - doesn't work yet, why not?

- switch `defaultValue` to `value`, alright!
