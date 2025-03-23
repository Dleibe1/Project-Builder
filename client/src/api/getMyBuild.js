const getMyBuild = async (id) => {
  try {
    const response = await fetch(`/api/v1/my-builds/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    const userProject = responseBody.userBuild
    return userProject
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
  }
}

export default getMyBuild
