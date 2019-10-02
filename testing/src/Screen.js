import React from "react"

export function Screen({ children, onSubmit = undefined }) {
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className="ui-screen">
        {children}
      </form>
    )
  }
  return <section className="ui-screen">{children}</section>
}
