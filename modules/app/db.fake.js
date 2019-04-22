// faking the firebase API to get as much as we need
import localforage from "localforage"
import { format } from "date-fns"
window.lf = localforage
window.clearFakeData = () => localforage.clear()

fakeStreamedData()

export const mode = "fake"

const FAKE_LATENCY = true
// const FAKE_LATENCY = false

const LF_KEY = "data"

const OPERATORS = {
  "==": (field, value) => field === value,
  "<": (field, value) => field < value,
  ">": (field, value) => field > value,
  "<=": (field, value) => field <= value,
  ">=": (field, value) => field >= value
}

const subscriptions = {
  doc: {}, // { [path]: [callback] }
  collection: {}
}

function addSubscription(type, path, callback) {
  const subs = subscriptions[type]
  ;(subs[path] || (subs[path] = [])).push(callback)
}

function removeSubscription(type, path, callback) {
  const subs = subscriptions[type][path]
  subs.splice(subs.indexOf(callback), 1)
}

function notify(type, path, action) {
  const subs = subscriptions[type][path]
  if (subs) {
    subs.forEach(callback => callback(action))
  }
}

////////////////////////////////////////////////////////////////////////////////

export function collection(path) {
  const methods = {
    onSnapshot,
    where,
    limit,
    orderBy,
    add,
    get
  }

  let queries = []
  let _limit = null
  let _orderBy = null
  let orderByDirection = "asc"

  const makeWeirdSnapshot = values => {
    const keys = Object.keys(values)

    function forEach(iterator) {
      keys.forEach(id => {
        const value = values[id]
        const data = () => value
        const doc = { data, id }
        iterator(doc)
      })
    }

    return { forEach, size: keys.length }
  }

  const matchesQueries = record =>
    queries.every(([field, operator, test]) =>
      OPERATORS[operator](record[field], test)
    )

  const getPathRecords = lfData => {
    const all = getObjValue(path, lfData)
    let ids = []
    ids = Object.keys(all).filter(key => matchesQueries(all[key]))

    if (_orderBy) {
      ids = ids.sort((a, b) => {
        const x = all[a][_orderBy]
        const y = all[b][_orderBy]
        const one = orderByDirection === "desc" ? -1 : 1
        return x < y ? -one : x > y ? one : 0
      })
    }

    if (_limit) {
      ids = ids.slice(0, _limit)
    }

    const records = ids.reduce((obj, id) => {
      obj[id] = all[id]
      return obj
    }, {})
    return records
  }

  async function get() {
    const lfData = await localforage.getItem(LF_KEY)
    const records = getPathRecords(lfData)
    const snapshot = makeWeirdSnapshot(records)
    await fakeLatency()
    return snapshot
  }

  function where(...query) {
    queries.push(query)
    return methods
  }

  function limit(n) {
    _limit = n
    return methods
  }

  function orderBy(field, direction = "asc") {
    _orderBy = field
    orderByDirection = direction
    return methods
  }

  async function add(record) {
    const lfData = await localforage.getItem(LF_KEY)
    const values = getObjValue(path, lfData)
    const id = genId()
    values[id] = record
    await localforage.setItem(LF_KEY, lfData)
    notify("collection", path, {
      type: "ADD",
      lfData,
      record
    })
    return doc(`${path}/${id}`)
  }

  function onSnapshot(callback) {
    const subscription = async action => {
      switch (action.type) {
        case "INIT": {
          const lfData = await localforage.getItem(LF_KEY)
          const records = getPathRecords(lfData)
          const snapshot = makeWeirdSnapshot(records)
          await fakeLatency()
          callback(snapshot)
          break
        }
        case "ADD":
        case "UPDATE":
        case "DELETE": {
          if (!matchesQueries(action.record)) return
          const records = getPathRecords(action.lfData)
          const snapshot = makeWeirdSnapshot(records)
          await fakeLatency()
          callback(snapshot)
          break
        }
        default: {
        }
      }
    }
    addSubscription("collection", path, subscription)
    subscription({ type: "INIT" })
    return () => {
      callback = noop
      removeSubscription("collection", path, subscription)
    }
  }

  return methods
}

export function doc(path) {
  function onSnapshot(callback) {
    // don't want to return a promise to useEffect, so weird IIFE
    ;(async () => {
      const doc = await getRecordAsWeirdDoc()
      await fakeLatency()
      callback(doc)
    })()
    return () => {
      callback = noop
    }
  }

  async function get() {
    await fakeLatency()
    return getRecordAsWeirdDoc()
  }

  async function set(updates) {
    const segments = path.split("/")
    const lfData = await localforage.getItem(LF_KEY)
    const id = segments[segments.length - 1]
    const collectionSegments = segments.slice(0, segments.length - 1)
    const collectionPath = collectionSegments.join("")
    const collection = getObjValue(collectionPath, lfData)
    const record = collection[id]
    collection[id] = { ...record, ...updates }
    await localforage.setItem(LF_KEY, lfData)
    await fakeLatency()
    notify("collection", collectionPath, {
      type: "UPDATE",
      lfData,
      record
    })
  }

  async function _delete() {
    const segments = path.split("/")
    const lfData = await localforage.getItem(LF_KEY)
    const id = segments[segments.length - 1]
    const collectionSegments = segments.slice(0, segments.length - 1)
    const collectionPath = collectionSegments.join("")
    const collection = getObjValue(collectionPath, lfData)
    const record = collection[id]
    delete collection[id]
    await localforage.setItem(LF_KEY, lfData)
    await fakeLatency()
    notify("collection", collectionPath, {
      type: "DELETE",
      lfData,
      record
    })
  }

  const getRecordAsWeirdDoc = async () => {
    const lfData = await localforage.getItem(LF_KEY)
    const record = getObjValue(path, lfData)
    const id = getPathId(path)
    return makeWeirdDoc(record, id)
  }

  return { get, set, onSnapshot, delete: _delete }
}

const makeWeirdDoc = (record, id) => {
  const data = () => record
  return { id, data, exists: !!record }
}

const noop = () => {}
let onAuthChangeHandler = noop

export function auth() {
  function onAuthStateChanged(handler) {
    onAuthChangeHandler = handler
    localforage.getItem("auth").then(auth => {
      if (auth) {
        handler(auth)
      } else {
        localforage.removeItem("auth")
        handler(null)
      }
    })
    return () => (onAuthChangeHandler = noop)
  }

  async function createUserWithEmailAndPassword(email, password) {
    const auth = { uid: "attendee" }
    await populateLocalForage(auth)
    await localforage.setItem("auth", auth)
    await localforage.setItem("server:auth", auth)
    onAuthChangeHandler(auth)
    const user = { ...auth }
    user.updateProfile = async updates => {
      const auth = await localforage.getItem("auth")
      const newAuth = { ...auth, ...updates }
      await localforage.setItem("auth", newAuth)
      await localforage.setItem("server:auth", auth)
      return newAuth
    }
    return { user: user }
  }

  async function signInWithEmailAndPassword() {
    const auth = await localforage.getItem("server:auth")
    await localforage.setItem("auth", auth)
    onAuthChangeHandler(auth)
  }

  async function signOut() {
    await localforage.removeItem("auth")
    onAuthChangeHandler(null)
  }

  return {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
  }
}

////////////////////////////////////////////////////////////////////////////////
async function populateLocalForage(user) {
  const now = Date.now()
  const hour = 3600000
  const day = hour * 24

  // users
  const users = {
    [user.uid]: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: "/flex.jpg",
      goal: 8000,
      started: "2019-01-01"
    },
    ryan: {
      uid: "ryan",
      displayName: "Ryan Florence",
      photoURL: "/ryan.jpg",
      goal: 8000,
      started: "2019-01-01"
    },
    michael: {
      uid: "michael",
      displayName: "Michael Jackson",
      photoURL: "/michael.jpg",
      goal: 8000,
      started: "2019-01-01"
    }
  }

  const userIds = Object.keys(users)
  const posts = userIds
    .map(uid => {
      return Array.from({ length: 90 })
        .map((_, index) => {
          const timestamp = now - day * index
          return {
            createdAt: timestamp,
            uid,
            date: format(new Date(timestamp), "YYYY-MM-DD"),
            minutes: Math.floor(Math.random() * 25) + 20,
            message: `X3 Incinerator. Upped my weights on most things, finally made it through the burnout at the end!`
          }
        })
        .reduce((obj, post) => {
          if (Math.random() < 0.25) return obj
          const id = genId()
          obj[id] = post
          return obj
        }, {})
    })
    .reduce((table, posts) => ({ ...table, ...posts }), {})

  await localforage.setItem(LF_KEY, { posts, users })
}

let count = 0
function fakeStreamedData() {
  const userIds = ["ryan", "michael"]
  Array.from({ length: 1000 }).forEach((_, index) => {
    setTimeout(async () => {
      const lfData = await localforage.getItem(LF_KEY)
      if (!lfData) return
      const record = {
        createdAt: Date.now(),
        uid: userIds[Math.floor(Math.random() * userIds.length)],
        date: format(Date.now(), "YYYY-MM-DD"),
        minutes: Math.floor(Math.random() * 25) + 20,
        message: `FAKE DATA! YEAH! ` + ++count
      }
      lfData.posts[genId()] = record
      localforage.setItem(LF_KEY, lfData)
      notify("collection", "posts", {
        type: "ADD",
        lfData,
        record
      })
    }, 10000 * index)
  })
}

const genId = () =>
  Math.random()
    .toString(32)
    .substr(2)

const getObjValue = (path, obj) =>
  path.split("/").reduce((o, segment) => o[segment], obj)

const getPathId = path => path.split("/").reverse()[0]

let nextLatency
const fakeLatency = () => {
  if (FAKE_LATENCY) {
    return (
      nextLatency ||
      (nextLatency = new Promise(resolve => {
        setTimeout(() => {
          nextLatency = null
          resolve()
        }, Math.random() * 1000)
      }))
    )
  } else {
    return Promise.resolve()
  }
}

export const db = { collection, doc }
