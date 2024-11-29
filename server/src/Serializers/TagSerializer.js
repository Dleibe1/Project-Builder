class TagSerializer {
	static getTagDetails(tag) {
	  const allowedAttributes = ["tagName"]
	  let serializedTag = {}
	  for (const attribute of allowedAttributes) {
		serializedTag[attribute] = tag[attribute]
	  }
	  return serializedTag
	}
  }
  
  export default TagSerializer
  