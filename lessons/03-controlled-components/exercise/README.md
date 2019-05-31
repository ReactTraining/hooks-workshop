# Controlled inputs

Add a feature that indicates how many characters the user has typed. When they type more than `MAX_MESSAGE_LENGTH`, change the styles, maybe have the background of the textarea turn red with the `NewPost_error` class on the top level div (you'll still need the `NewPost` className).

1. Add some state for the value that's in the textarea
2. Put some default state in it
3. Add a defaultValue prop to the textarea with the state
4. Render the 10/200 text from your new state
5. Pick a smaller number (like 3) for your default state to get it to trigger the error state.
6. Add an `onChange` handler to the textarea
7. Put the value from the textarea into state

This is an uncontrolled input at this point. Even though we are synchronizing it's state into our state, we aren't _controlling_ it because nothing else is changing it.

Check out `<RecentPostsDropdown />`. That lists the user's recent posts to make it easy to auto fill with previous workouts' descriptions.

Can you figure out how to put a recent post's message into your state and get the textarea to update?

Now that we have more than one source (not just the user typing) setting state of the textarea, it's a controlled component.

1. Set state when recent posts `onSelect` is called.

- doesn't work yet, why not?
- Hint: switch `defaultValue` to `value`, alright!
