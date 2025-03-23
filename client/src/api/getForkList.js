const getForkList = async (parentProjectId, currentPage, projectsPerPage) => {
  try {
    const response = await fetch(
      `/api/v1/projects/${parentProjectId}/forks/fork-list?page=${currentPage}&limit=${projectsPerPage}`,
    )
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
    const responseBody = await response.json()
    const { forkList, forkedProjectsCount } = responseBody
    return [forkList, forkedProjectsCount]
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
    throw error
  }
}

export default getForkList
