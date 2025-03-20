const getProjectsToCompare = async (parentProjectId, forkedProjectId) => {
  const response = await fetch(
    `/api/v1/projects/${parentProjectId}/forks/diff-view/${forkedProjectId}`,
  )
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
  const responseBody = await response.json()
  const { parentProjectData, forkedProjectData } = responseBody
  return [parentProjectData, forkedProjectData]
}

export default getProjectsToCompare
