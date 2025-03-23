const doesProjectHaveForks = async (id) => {
  try {
    const response = await fetch(`/api/v1/projects/check-for-forks/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
    const responseBody = await response.json()
    const forkExists = responseBody.forkExists
    return forkExists
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
    throw error
  }
}
export default doesProjectHaveForks
