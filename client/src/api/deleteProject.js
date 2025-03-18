const deleteProject = async (id) => {
  const response = await fetch(`/api/v1/projects/${id}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
}
export default deleteProject
