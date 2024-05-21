class ImageSerializer {
  static getImageDetails(image) {
    const allowedAttributes = ["id", "imageURL"]
    let serializedImage = {}
    for (const attribute of allowedAttributes){
      serializedImage[attribute] = image[attribute]
    }
    return serializedImage
  }
}

export default ImageSerializer