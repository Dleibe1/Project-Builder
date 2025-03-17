const getUserProject = async (projectId) => {
  const response = await fetch(`/api/v1/my-builds/${projectId}`)
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
  const body = await response.json()
  const userProject = body.userBuild
  return userProject
}

export default getUserProject
