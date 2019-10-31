# Student Learning Notes

The workshop has lectures followed by exercises. The Exercises are your chance to write code, so we hope you're able to sit back and enjoy the lectures without feeling like you have to code-along at our fast pace. You're encouraged to take notes, but we don't want that to get in the way of listening to the lecture. So we made notes for you. This is your repo so feel free to make edits.

---

## Lesson 1: Rendering

- We like React because it's Composable and Declarative
  - Composable: You can build small re-usable parts which can be used to build bigger, more complex things
  - Declarative: We write in a style where we say "what" we want. In other words `<Tabs>` is declarative because we said we want tabs, but we didn't have to program "how" they work. Whoever did program the internals of <Tabs> programmed "how" they work. All declarative code that we write has imperative code somewhere else that someone else wrote.
- JSX is a syntax for easily creating nested elements. Babel is a Webpack plugin that converts each JSX "tag" into `React.createElement`
- The return value of a component (JSX turned into `React.createElement`) is like an "instruction manual" for how to create DOM.
- In a typical React application, `ReactDOM.render()` is only used once. As React changes our JSX responses from our components, React will also take care of updating the DOM to reflect those JSX changes.
- A function that returns JSX is a "component" in React. There are also older ways of creating components with classes. Function-based and class-based components can intermingle in the same app.

Docs: https://reactjs.org/docs/introducing-jsx.html

JSX Confusing Parts: https://reacttraining.com/blog/jsx-the-confusing-parts/

---

## Lesson 2: State

- `useState` Format: `const [value, setValue] = useState(defaultValue)`.
- State are the variables that change over time in the component.
- The entire component re-renders (the component function gets called again) each time state changes.
- Multiple state values are done with multiple `useState`.
- The order matters to React, so we can't "conditionalize" calls to `useState`
- A good mental model for React is that UI is a function of state, in other words:
  - The component renders for the first time and JSX is created from initial props and state.
  - When state changes (often times through events like clicks), React calls our component function again and ensures the state variables reflect what was changed.
  - This re-render will mean new JSX is returned that reflects the new state. It's like a new instruction manual for what do change in the DOM.
  - React takes the previously returned JSX and the new JSX and finds the differences (called a diff). Only the things that are different are used to change the real DOM. This makes React very fast.

Docs: https://reactjs.org/docs/hooks-state.html

---

## Lesson 3: Controlled Components

- Form fields in React are either "controlled" or "uncontrolled"
- By default, fields are "uncontrolled". This means that React is not controlling the value of the field. The user types into the field and whatever they type is the value (just like any HTML form made in the last 25 years). It's "uncontrolled" because React is not controlling the value.
- By contrast, if we do a `onChange` event for the field and take what the user types and turn that into state, then we take the state and put that back into the field's value prop, then you can say React is controlling the value. Now it's a "controlled" field. Even though it might seem as though the user is still controlling the value, React _could_ adjust, format, or change the value if we program it to do so. So it's really React that's controlling the value the user sees.
- Pros and Cons:

  - Uncontrolled fields are easier to setup because you just type `<input />` and you're done. Whereas with controlled you have to setup the `onChange` and `value` props for the field so that state orchestrates the value of the field.
  - Uncontrolled fields give you less abilities. If you need something else to set the value of the field (like the Recent Posts Dropdown menu in our case), then we can't use uncontrolled. Also, if we want to read the value of an uncontrolled field (for form submissions), then we have to figure out a way to read the DOM (probably with refs) whereas controlled fields already have their stateful values ready for us.

- Docs: https://reactjs.org/docs/uncontrolled-components.html

---

## Lesson 4: Effects

- `useEffect` Format: `useEffect(callbackFunction, [dependencyArray])`
- `useEffect` is used for side effects. Typically this means we want to do something outside of our component, like a network request or perhaps with cookies/localstorage, and we want to do that side effect any time state changes.
- The effect callback runs when the component first mounts and then anytime the values in the dependency array change. Having an empty dependency array is a way to ensure the effect only runs once.
- However, be careful, any variables that your effect uses (depends on) need to be stated in your dependency array. With the older mental model of time and `componentDidMount`, we thought in terms of "this just needs to happen once when we mount". But now with `useEffect` we need to think in terms of "anytime state changes, what do I need to do". Therefore you'll probably need to put values in your dependency array often.

```js
useEffect(fn) // runs when any state changes
useEffect(fn, []) // runs when no state changes
useEffect(fn, [some, state]) // runs when some state changes
```

- For people who have some React experience, it's easy to compare `useEffect` to things like `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. However, this older mental model where "time" is considered will not be a good mental model for hooks and `useEffect`. Instead we think in terms of state and changes to that state and how that needs to synchronize to DOM and what effects may need to be ran again when state changes.

- Docs: "Using the Effect Hook": https://reactjs.org/docs/hooks-effect.html
- A very long but complete guide to useEffect: https://overreacted.io/a-complete-guide-to-useeffect/

---

## Lesson 5: Data Loading

- Network requests and subscriptions are side effects and need to go in `useEffect`.
- Avoid infinite loops: If an effect has no dependency array and also sets state, this will cause an infinite loop. Imagine that the component mounts which calls the effect. Then state is changed which leads to a re-render which means the effect will be called again because there was no dependency array telling react not to run the effect again. Then since the effect runs again and sets state, this creates an infinite loop.
- In the callback for the effect, you can either return no value or return a function. If a function is returned, it's said to be the "cleanup function". This function is called when the component unmounts or when the dependency array changes.
- When setting state asynchronously in an effect, there's always a chance the component will become unmounted or the dependency array might change before the set state is called. For both cases, we need to use a cleanup function to ensure we're not setting state on the unmounted component or setting state that was based on the previous values of the dependency array. This is how we might prevent this problem with a `isCurrent` variable:

```js
useEffect(() => {
  // 1. The effect first runs so we'll say it's "current"
  let isCurrent = true
  // 2. Go out and get a user on the network
  fetchUser(uid).then(user => {
    // 5. A moment later, the promise does resolve (the component
    // is no longer mounted though). This condition will prevent us
    // from setting state on an unmounted component.
    if (isCurrent) {
      setUser(user)
    }
  })
  // 3. Here is a function that can be called if we need to
  // cleanup the effect
  return () => {
    // 4. Lets imagine the user leaves the page before the fetchUser
    // promise resolves. This cleanup will be called and set isCurrent
    // to be false.
    isCurrent = false
  }
}, [uid])
```

- Here is how a cleanup might look for a subscription if the API for the subscription were to return an unsubscribe function for itself:

```js
useEffect(() => {
  const unsubscribe = subscribeToPosts(uid, setPosts)
  return () => {
    unsubscribe()
  }
}, [uid])
```

---

## Lesson 6: Data Flow

- Parent components send variables (data) down to their child components via props. Remember, even though props look like "attributes" of HTML, we call them props because they are going to turn into properties of the second argument to `React.createElement(MyButton, { hereAreTheProps: true })`
- A component can be a "child component" in respect to its parent, but could also be a parent component because it further has child components.
- This relationship between components builds a tree structure that will probably resemble the DOM tree structure that React is building for you.
- Data flows down: React's data model is said to be "uni-directional", meaning data flows from parent components down through the tree to child components. However, if a prop is passed down from parent to child and the prop is a callback function, then we might say that child components can communicate back up to their parents by calling the function.
- This makes passing data back and forth through parent/child hierarchies pretty easy. However, when components need to communicate with other components far away in this tree structure, the conventional solution has been to "lift state". In other words, if two components need to communicate we need to put state in one of their common ancestor (parent) components. Then one of the child components can communicate to the parent (through callback function props), which might lead to a state change and then the parent component can propagate that change down the tree to the other child component(s).
- Context is another React feature that is an alternative way to pass information around our React tree structure that doesn't involve deep prop drilling.

- Docs on "Lifting State": https://reactjs.org/docs/lifting-state-up.html
- Docs on "Thinking in React": https://reactjs.org/docs/thinking-in-react.html

---

## Lesson 7: Compound Components

- In good API design, you want to design something that's easy to use, abstracts the difficult parts of programming away, and still gives the API user flexibility and control. This is difficult.
- The original API of `<Tabs data={data} />` is certainly easy to use, but gives us almost no control over things like "can we put the tabs on bottom and the panels on top". It also makes change requests to the API difficult since the abstraction is all self contained within `<Tabs />`
- As an alternative, what if we create several components for `<Tabs />`, `<TabList />`, `<Tab />`, etc. Then the way we arrange the JSX becomes apart of the API itself. We can still choose to pass in props for certain things like `disabled` or `className`, but the API being JSX based makes doing things like "tabs below panels" really easy.
- Unlike before where the entire API was one component, now we have several components that aren't really meant to be on their own but rather they're used together. Even though they're separate, they collectively make one thing - tabs. So we are calling this the "Compound Components" pattern because several components work together to make one thing.
- Context and `React.Children.Map` with `React.cloneElement` are the underlying technologies that allow the various components to communicate with each other.

## Lesson 8: App State

- `useReducer` Format: `const [state, dispatch] = useReducer(reducerFunction, initialState)`.
- `useReducer` is the reducer pattern for local state. It's an alternative to using `useState`. `useReducer` can be good for complex local state.
- Context is a way to pass data around our app without having to do prop drilling.
- Context gives us a `<Provider />` component which broadcasts data to all the sub-nodes and then a hook called `useContext` is used to consume that data. There could be many nodes between the provider and the consumer components and none of these will be aware or involved with passing data down (as would happen with prop drilling). A good mental model is that the provider passes data over many of its children down to a lower level child component. Then the child component consuming the context could communicate back up to the provider via callbacks.
- In Lesson 8, the authentication information is available though a subscription. But instead of creating multiple subscriptions all over our app to know about the login status, we subscribe once and then pass that information to the provider which in turn makes the information available to any component in our app that wants to be a consumer of that information.

## Lesson 12: Optimization

- In a React app where there is a hierarchy of components, if any component re-renders it will cause all of its sub tree components to re-render. This is typically not a performance problem because of the Virtual DOM and the diffing algorithm. However, if you've profiled your app and learned that excessive re-rendering could be optimized by skipping sub-tree renders when the incoming props haven't changed, then you can add additional optimizations:
- In order to prevent a component from re-rendering when its parent re-renders because we can see the props haven't changed, we can do one of two options with class-based components:
  - Make it a "Pure" component: `class MyComponent extends React.PureComponent`
  - Or we can itemize which props changing or not changing should cause the re-render by adding a `componentShouldUpdate` lifecycle method.
- For hooks (on function based components), we can achieve the same thing as a Pure Component by doing: `React.memo(() => {})` where the function passed in _is_ the component.
- While `React.memo()` is for optimizing the component from having too many re-renders, `useMemo` is a hook for memorizing the return of a long-running function call, so don't confuse these two. If we have a function call that's slow and it's being ran with each re-render (and if it's a pure function), then it might make sense to memoize it using `useMemo()`
- While `useMemo()` memoizes a value from a function call, `useCallback()` memoizes a function itself. This is useful when we don't want a function to be re-created on each re-render which would create a new identity in memory.

- Docs on `React.pureComponent`: https://reactjs.org/docs/react-api.html#reactpurecomponent
- Docs on `React.memo`: https://reactjs.org/docs/react-api.html#reactmemo
- Docs on `useMemo`: https://reactjs.org/docs/hooks-reference.html#usememo
- Docs on `useCallback`: https://reactjs.org/docs/hooks-reference.html#usecallback
