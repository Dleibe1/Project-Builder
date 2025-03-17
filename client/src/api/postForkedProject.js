import translateServerErrors from "../services/translateServerErrors"

const postForkedProject = async (forkedProjectData, parentProjectId) => {
  const response = await fetch(`/api/v1/projects/${parentProjectId}/forks`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(forkedProjectData),
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

export default postForkedProject
