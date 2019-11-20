import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Mario Kart" },
  { id: 2, name: "Donkey Kong" },
  { id: 3, name: "Nintendo NES" }
]

function getProducts() {
  return Promise.resolve(DB)
}

//////

const ShoppingCartContext = React.createContext()

function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(id) {
    console.log(id)
    setCart(cart.concat([id]))
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}

///////////

function App() {
  return (
    <ShoppingCartProvider>
      <BrowseProducts />
    </ShoppingCartProvider>
  )
}

export default App

/////////

function BrowseProducts() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <div>
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <BrowseProductItem
              key={product.id}
              id={product.id}
              name={product.name}
            />
          )
        })}
    </div>
  )
}

///////

function BrowseProductItem({ id, name }) {
  const { addToCart } = useShoppingCartContext()

  return (
    <div>
      {name} <Button onClick={() => addToCart(id)}>Add to cart</Button>
    </div>
  )
}

///////

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
