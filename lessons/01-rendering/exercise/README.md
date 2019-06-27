# Rendering

## "About" and "Tabs"

1. In `LoggedOut.js`, render `<About />` inside the `<div className="LoggedOut"></div>`
2. Then as a sibling to the About element, render `<Tabs></Tabs>`
3. Tabs will have an opening and closing tag because we'll also need to render `<TabList>` and `<TabPanel>`
4. Then add tabs and panels in those components
5. Last, add the `<LoginForm>` and `<SignupForm>` to the respective panels.

You should be able to switch between tabs now, but the signup form doesn't show anything because we haven't worked on it yet

## Signup Form

1. In `SignupForm.js`, create four text fields for:

- Display Name
- Photo URL
- Email
- Password (make as password field)

2. Create a `DateFields` element with three children:

- `<MonthField>`
- `<DayField>`
- `<YearField>` (takes `start` and `end` props for year)

3. Create a submit button

- use classNames "TabsButton icon_button cta" to make
  it ~look so nice~.
- toss the `FaDumbbell` in for some fun
- Abstract the button into a `TabsButton` component
  that wraps up the classNames so that it could be
  reused in other places
  - Use the `children` prop to allow any content inside

Bonus:

1. Abstract each text field into a `<TextInput>` component that takes these props:

- id
- label
- type (defaults to "text")
