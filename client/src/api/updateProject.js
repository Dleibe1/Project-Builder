import translateServerErrors from "../services/translateServerErrors"
const updateProject = async (projectData, projectId) => {
  const response = await fetch(`/api/v1/my-builds/${projectId}`, {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(projectData),
  })
  if (!response.ok) {
    const body = await response.json()
    const translatedErrors = translateServerErrors(body.errors)
    const error = new Error("Validation Error")
    error.serverErrors = translatedErrors
    throw error
  }
}

export default updateProject
