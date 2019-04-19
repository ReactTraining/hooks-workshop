# Data Flow

This one is pretty quick. If you can't figure it out in a minute or two, we probably explained it horribly 😂

Right now in `NewPost.js`, `<RecentPostsDropdown onSelect/>` has an `onSelect` prop but it never gets called.

Go edit `RecentPostsDropdown.js` and call `onSelect` when the user makes a selection. Note that `<MenuItem/>` has an `onSelect` prop itself.

You'll know it works when you select an item from the list and it populates the textarea.

For more info on Menu Button, check out the docs: https://ui.reach.tech/menu-button
