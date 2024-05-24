const nullValuesToEmptyString = (object) => {
  for (let [key, value] of Object.entries(object)) {
    if (value === null) {
      object[key] = ""
    }
  }
}

export default nullValuesToEmptyString