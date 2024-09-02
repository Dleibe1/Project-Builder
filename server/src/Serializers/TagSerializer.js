class TagSerializer {
	static getTagDetails(tag) {
	  const allowedAttributes = ["tagName"]
	  let serializedPart = {}
	  for (const attribute of allowedAttributes) {
		serializedPart[attribute] = part[attribute]
	  }
	  return serializedPart
	}
  }
  
  export default TagSerializer
  