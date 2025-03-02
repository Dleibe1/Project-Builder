class PartsSerializer {
  static getPartDetails(part) {
    const allowedAttributes = ["id", "partName", "partPurchaseURL"]
    let serializedPart = {}
    for (const attribute of allowedAttributes) {
      serializedPart[attribute] = part[attribute]
    }
    return serializedPart
  }
}

export default PartsSerializer
