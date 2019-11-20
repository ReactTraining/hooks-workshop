# Compound Components

We want to give rendering control to the owner of `<Datefields/>`. Maybe we're in the United Kingdom and we need to put the day, not the month, first. And what if we wanted to add additional props to the `<select>` elements, like aria-labels, or classNames?

We can either make a bunch of weird props:

```jsx
<DateFields
  fieldOrder={["day", "month", "year"]}
  monthSelectProps={{
    className: "month-select",
    "aria-label": "start month"
  }}
  yikes-no-thanks
/>
```

Or we can create a composable solution with compound components.

Open up `SignupForm.js` and find where we're rendering `<DateFields/>`.

Your task is to use context to give rendering control back to the consumer. So instead of this:

```jsx
<DateFields
  value={...}
  start={...}
  end={...}
  onChange={...}
/>
```

We want this:

```jsx
<DateFields value={startDate} onChange={setStartDate}>
  <MonthField aria-label="Start Month" />
  <DayField aria-label="Start Day" />
  <YearField start={2018} end={2019} aria-label="Start year" />
</DateFields>
```

1. Change `SignupForm.js` to render the new `DateFields` API with compound components as shown above.

2. Edit `DateFields.js` to stop rendering the individual components in `DateFields`, but instead just rendering `props.children`.

3. Provide context in `DateFields` for the other components to use.

4. Use context in `MonthField`, `DayField`, and `YearField`.

5. Go back to `SignupForm.js` and you can tweak the order of the fields, put other values around them, do whatever you want!
