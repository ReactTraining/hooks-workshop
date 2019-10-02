import React from "react"

export function Screen({ children, onSubmit = undefined, ...other }) {
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className="ui-screen" {...other}>
        {children}
      </form>
    )
  }
  return (
    <section className="ui-screen" {...other}>
      {children}
    </section>
  )
}
