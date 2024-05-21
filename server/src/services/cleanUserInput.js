const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
      formInput.userId = parseInt(formInput.userId)
      formInput.id = parseInt(formInput.id)
  })
  return formInput
}

export default cleanUserInput
