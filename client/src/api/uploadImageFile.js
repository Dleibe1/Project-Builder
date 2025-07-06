const uploadImageFile = async (acceptedFiles) => {
  try {
    const imageFileData = acceptedFiles[0]
    const maxFileSize = 10 * 1024 * 1024
    if (imageFileData.size > maxFileSize) {
      throw new Error(
        `File size exceeds the maximum allowed (10MB). Your file is ${(imageFileData.size / (1024 * 1024)).toFixed(2)}MB.`,
      )
    }
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
      if (response.status === 403) {
        throw new Error(
          "Upload limit reached: The maximum number of images has been uploaded to this application.",
        )
      }
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const responseBody = await response.json()
    const imageURL = responseBody.imageURL
    return imageURL
  } catch (error) {
    console.error(`Error in Upload Image Fetch: ${error.message}`)
    throw error
  }
}

export default uploadImageFile
