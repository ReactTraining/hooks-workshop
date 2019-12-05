import React, { useState, useEffect, useContext } from "react"

const DB = [
  { id: 1, name: "Mario Kart" },
  { id: 2, name: "Donkey Kong" },
  { id: 3, name: "Nintendo NES" }
]

function getProducts() {
  return Promise.resolve(DB)
}

///////

function useUser(uid) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (uid) {
      fetchUser(uid).then(setuser)
    } 
  }, [uid])
  return user
}


/////////

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [auth, authAttempted] = useAuth()
  const user = useUser(auth.uid)

  return (
    <AuthContext.Provider value={{
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}


//////////


function App() {
  return (
    <AuthProvider>
      <BrowseProducts />
    </AuthProvider>
  )
}

export default App

/////////

const ShoppingCartContext = React.createContext()

export default function ShoppingCartProvider({ children }) {

  function addToCart(id) {
    console.log(id)
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

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}




//////////

function BrowseProducts() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <ShoppingCartProvider stuff>
      <div>
        {Array.isArray(products) &&
          products.map(product => {
            return <BrowseProductItem key={product.id} {...product} />
          })}
      </div>
    </ShoppingCartProvider>
  )
}

function BrowseProductItem({ id, name }) {
  const { addToCart } = useShoppingCart()

  return (
    <div>
      {name} <AddToCart onAdd={() => addToCart(id)} />
    </div>
  )
}

function AddToCart({ onAdd }) {
  return <button onClick={onAdd}>Add To Cart</button>
}



function Sidebar() {
  const { user } = useAuth()
  return (
    <div>
      {user && (
        <WelcomeMessage user={user}></WelcomeMessage>
      )}
    </div>
  )
}