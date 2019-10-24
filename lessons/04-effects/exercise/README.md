# Effects

## Save state to local storage

Save the message value into localStorage so that if the user accidentally closes the dialog or navigates away from the page, we can bring it back!

There are a few helper functions to work with localStorage that we've added:

`makeNewPostKey(date)` - Pass it the date and it will return a key for use with localStorage unique to that date.

`getLocalStorageValue(key)` - Returns the value from localStorage for the given `key`.

`setLocalStorage(key, value)` - Sets the value.

- add an effect that depends on the `message`.
- in the effect, save the message into local storage
- click on a calendar button and type in a message
- reload the page w/o submitting, then click the same calendar button as before.
  - the value is not pre-populated, why not?
- get the value from local storage and set it as your initial state for `message`.
- reload the page and click the button again
  - alright!
- remove `message` from the dependencies array, but leave it there blank like `[]`, and try again
  - what happens and why?
  - now remove the `[]` altogether, now what happens and why?
  - if we use the array, did we have all the values we should have?
  - what's the difference between having the array and not having it?

## Move focus if the `takeFocus` prop comes in `true`

`NewPost` is used in two contexts, the dialog we've been working in, and then as another entry on a day with 1 or more entries already.

- Click on a calendar with a post
- Click the "add another" button

What we'd like is to move focus to the input automatically. The component that rendered `NewPost` has passed you a prop called `takeFocus`. If it's true, you should focus the message textarea.

You'll need to `useRef` for the textarea and the following DOM api to focus it. If you named your ref `messageRef`, it looks like this:

```
messageRef.current.focus()
```

To validate if you did it right, click "add another" and the focus should move to the textarea.

You're on your own for this one!
