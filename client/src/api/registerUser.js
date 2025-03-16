import translateServerErrors from "../services/translateServerErrors"

const registerUser = async (userPayload) => {
  const response = await fetch("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(userPayload),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const body = await response.json()
      const translatedErrors = translateServerErrors(body.errors)
      const error = new Error("Validation Error")
      error.serverErrors = translatedErrors
      throw error
    }
    const errorMessage = `${response.status} (${response.statusText})`
    throw new Error(errorMessage)
  }
}

export default registerUser
