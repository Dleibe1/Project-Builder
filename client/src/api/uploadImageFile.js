const uploadImageFile = async (acceptedFiles) => {
  const imageFileData = acceptedFiles[0]
  const formData = new FormData()
  formData.append("image", imageFileData)
  const response = await fetch("/api/v1/image-upload", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`)
  }
  const responseBody = await response.json()
  const imageURL = responseBody.imageURL
  return imageURL
}

export default uploadImageFile
