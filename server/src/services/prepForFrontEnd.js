const prepForFrontEnd = (object) => {
  for (let [key, value] of Object.entries(object)) {
    if (value === null) {
      object[key] = ""
    }
  }
}

export default prepForFrontEnd