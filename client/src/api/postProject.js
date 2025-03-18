import translateServerErrors from "../services/translateServerErrors"
const postProject = async (newProjectData) => {
  const response = await fetch("/api/v1/projects/new-project", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(newProjectData),
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
}

export default postProject
