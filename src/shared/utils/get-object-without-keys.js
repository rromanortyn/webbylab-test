const getObjectWithoutKeys = (object, keys) => {
  const entries = Object.entries(object)
  const filteredEntries = entries.filter(
    ([key]) => !keys.includes(key),
  )
  
  return Object.fromEntries(filteredEntries)
}

export default getObjectWithoutKeys
