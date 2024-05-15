const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
      formInput.userId = parseInt(formInput.userId)
  })
  return formInput
}

export default cleanUserInput
