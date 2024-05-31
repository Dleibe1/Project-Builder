const prepForFrontEnd = (project) => {
  for (let [key, value] of Object.entries(project)) {
    if (value === null) {
      project[key] = ""
    }
  }
}

export default prepForFrontEnd