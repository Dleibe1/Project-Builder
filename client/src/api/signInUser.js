const signInUser = async (userPayload) => {
  const response = await fetch("/api/v1/user-sessions", {
    method: "POST",
    body: JSON.stringify(userPayload),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  if (!response.ok) {
    if (response.status === 401) {
      const body = await response.json()
      const error = new Error("Credentials Error")
      error.credentialsErrors = body.message
      throw error
    }
    const errorMessage = `${response.status} (${response.statusText})`
    throw new Error(errorMessage)
  }
  return await response.json()
}

export default signInUser
