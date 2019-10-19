# Build the Feed

There are a few features on the Feed that you're going to implement. You can uncomment out lines 4 and 5 (and comment out line 6) to run the final version to see how it behaves to help you along the way.

## Requirements

1. Load the posts with `loadFeedPosts(createdBefore, limit)`. It returns a promise so you can either `await` it or use `then`. `createdBefore` will query for only posts created before the unix timestamp you provide (the thing `Date.now()` returns). `limit` will limit the number of results. You can set the limit to whatever you want, but 3 seems like a good limit for this exercise. When you have your posts, render them each with `<FeedPost/>`.

2. When the user clicks the `View More` button, load more posts (ofc!). What controls how many posts are fetched? Change that and you're ready to go.

3. Subscribe to new posts with `subscribeToNewFeedPosts(createdAfter, posts => {})`. This will callback whenever new posts come in that were created _after_ `createdAfter`.

4. Don't show the "View [x] New Posts" button unless there are new posts to show.

5. When the user clicks the "View [x] New Posts" button, show the new posts and don't render the button. This can get a little tricky, you'll likely need to make multiple state changes. Your goal is to get the list of posts to show exactly what it had before + the new posts. Since your effects are reacting to state changes, they will refetch, make sure you refetch with the right arguments to get what you want.

6. Extra Credit: When the user leaves and returns to the Feed, can you figure out how to render the page in the state that they left it to avoid flicker and enhance usability?

7. Extra Extra Credit: don't show the `View More` button when you reach the end. This might be hard to do depending on how many records we've got in the database. You can go edit `modules/app/utils.js` and import the fake database instead of the real one to try this out. Our data store doesn't have the ability to tell us how many records are in a given query, so we have to derive it. In the solution we keep track of the id of the last record, then when new records are loaded (happens after the user clicks "View More") we compare the ID of the new last record. If they are the same that means there is nothing left to fetch. Hint: what hook allows you to keep track of something between renders?

Good luck!

We'll be popping up front every few minutes to help get everybody to the next step. Feel free to work ahead, or once you finish a step, help the people around you until we move on to the next one together.

## Additional thoughts

Sometimes it makes sense to build up a client side cache of our server side data tables. Like our posts. Anytime a post of any sort is fetched from any user, you can put it into your app state.

Had we taken this approach, then all of the logged in user's posts would show up in the feed initially, and then we'd go fetch the rest and shove them in. This might sound nice but in practice you end up with lots of flickering and what appears to reordering.

As usual, there is no one-size-fits all. That's why we've shown multiple caching approaches. Sometimes you want to treat a page's data separately from the rest of the app, like we do here in the feed.

We could still have used the global app state reducer with our own state keys for the feed, and that would have been fine. We just like to keep things encapsulated. If the rest of the app doesn't need the feed's state, then we don't want to spread the feed code farther out than it needs to go.

Also, these "module caches" are kinda hard to clear. For example, if we log out, we're still going to have them. In this case we can just reload the page when they log out and we're good, but other times it can involve more work.
