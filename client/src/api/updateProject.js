import translateServerErrors from "../services/translateServerErrors"
const updateProject = async (projectData, projectId) => {
  try {
    const response = await fetch(`/api/v1/my-builds/${projectId}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(projectData),
    })
    if (!response.ok) {
      if (response.status === 422) {
        const responseBody = await response.json()
        const translatedErrors = translateServerErrors(responseBody.errors)
        const error = new Error("Validation Error")
        error.serverErrors = translatedErrors
        throw error
      }
    }
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
    throw error
  }
}

export default updateProject
