const DB = [
  { id: 1, name: "Brad" },
  { id: 2, name: "Ryan" },
  { id: 6, name: "Nathan" },
  { id: 8, name: "Ethan" }
]

const getUsers = () => {
  return Promise.resolve(DB)
}

export default getUsers
