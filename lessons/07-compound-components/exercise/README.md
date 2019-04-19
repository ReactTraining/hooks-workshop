# Compound Components

We want to give rendering control to the owner of `<Datefields/>`. Maybe we're in the United Kingdom and we need to put the day, not the month, first. And what if we wanted to add additionaly props to the `<select>` elements, like aria-labels, or classNames?

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

Your task is to use context or cloneElement to give rendering control back to the consumer. So instead of this:

```jsx
<DateFields
  value={...}
  start={...}
  end={...}
  onSelect={...}
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

To help you decide between cloneElement or context, think, does the parent need to know anything from the children? Does it need a prop from a child in order to render itself? If the answer is yes, use cloneElement, if no, use context.
