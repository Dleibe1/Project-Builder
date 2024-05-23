const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
      formInput.userId = parseInt(formInput.userId)
      formInput.id = parseInt(formInput.id)
      formInput.parentProjectId = parseInt(formInput.parentProjectId)
      formInput.code = formInput.code ? formInput.code : "No code provided"
  })
  return formInput
}

export default cleanUserInput
