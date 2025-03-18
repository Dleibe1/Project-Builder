const getParentProject = async (id) => {
  const response = await fetch(`api/v1/projects/${id}`)
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
  const responseBody = await response.json()
  const parentProject = responseBody.project
  return parentProject
}

export default getParentProject
