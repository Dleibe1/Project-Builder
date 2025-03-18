const signOutUser = async () => {
  const response = await fetch("/api/v1/user-sessions", {
    method: "delete",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
  return await response.json()
}

export default signOutUser