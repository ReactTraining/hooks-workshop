import "./styles.css"
import React, { Fragment } from "react"
import ReactDOM from "react-dom"

const AustinDef = props => {
  return (
    <>
      <dt onClick={event => props.onClick(event)}>Austin</dt>
      <dd>{props.description}</dd>
    </>
  )
}

const OrlandoDef = () => {
  return (
    <>
      <dt>Orlando</dt>
      <dd>City with Disney I guess</dd>
    </>
  )
}

const Button = () => {
  const handleClick = event => {
    event.persist()
    console.log(event)
    alert("Austin ")
  }
  return (
    <dl>
      <AustinDef description="Amazing 🌮" onClick={handleClick} />
      <OrlandoDef />
    </dl>
  )
}

ReactDOM.render(<Button />, document.getElementById("root"))
