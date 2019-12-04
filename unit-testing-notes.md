# Unit Testing

## Setup

```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Package.json

```json
"scripts": {
  "test": "jest"
}
```

## React Testing Library

Gives you helper methods to query your components and test them the way users use them.

React Testing Library re-exports everything from DOM Testing Library as well as these methods:

- render()
- cleanup()
- act()
