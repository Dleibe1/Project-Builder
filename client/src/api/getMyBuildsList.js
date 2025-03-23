const getMyBuildsList = async (currentPage, projectsPerPage) => {
  try {
    const response = await fetch(`/api/v1/my-builds?page=${currentPage}&limit=${projectsPerPage}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    const { userBuilds, userBuildsCount } = responseBody
    return [userBuilds, userBuildsCount]
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
  }
}

export default getMyBuildsList
