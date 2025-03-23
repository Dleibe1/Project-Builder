import translateServerErrors from "../services/translateServerErrors"

const postProjectFork = async (forkedProjectData, parentProjectId) => {
  try {
    const response = await fetch(`/api/v1/projects/${parentProjectId}/forks`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(forkedProjectData),
    })
    if (!response.ok) {
      if (response.status === 422) {
        const responseBody = await response.json()
        const translatedErrors = translateServerErrors(responseBody.errors)
        const error = new Error("Validation Error")
        error.serverErrors = translatedErrors
        throw error
      }
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
  }
}

export default postProjectFork
