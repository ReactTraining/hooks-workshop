import { useState, useEffect } from "react"
import { fetchDoc } from "app/utils"

const cache = {}
const pendingCache = {}

export default function useDocWithCache(path, useCache = true) {
  const [doc, setDoc] = useState(cache[path])

  useEffect(() => {
    if (doc) return

    let isCurrent = true
    const pending = pendingCache[path]
    const promise = pending || (pendingCache[path] = fetchDoc(path))

    promise.then(doc => {
      if (isCurrent) {
        cache[path] = doc
        setDoc(doc)
      }
    })

    return () => (isCurrent = false)
  }, [doc, path])

  return doc
}
