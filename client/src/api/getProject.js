const getProject = async (id) => {
  try {
    const response = await fetch(`/api/v1/projects/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    const project = responseBody.project
    return project
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
    throw error
  }
}

export default getProject
