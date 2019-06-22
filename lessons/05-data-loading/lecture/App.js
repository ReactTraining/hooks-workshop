import React from "react"

function App() {
  return <UserProfile uid={5} />
}

// function withFetch(path, Component) {
//   return class WithToggle extends React.Component {
//     state = {
//       results: null
//     }

//     componentDidMount() {
//       fetch(path).then(results => {
//         this.setState({ results })
//       })
//     }

//     render() {
//       return (
//         <Component
//           {...this.props}
//           results={this.state.results}
//         />
//       )
//     }
//   }
// }

// class Fetch extends React.Component {
//   state = {
//     results: null
//   }

//   componentDidMount() {
//     this.refresh()
//   }

//   refresh = () => {
//     fetch(path).then(results => {
//       this.setState({ results })
//     })
//   }

//   render() {
//     return this.props.render(this.state.results, this.refresh)
//   }
// }

const UserProfile = ({ id }) => {
  const user = useUser(id)

  return (
    <div>
      <div>
        <h1>{results.name}</h1>
      </div>
    </div>
  )
}

export default App
