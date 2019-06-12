1. Create four text fields for:

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
