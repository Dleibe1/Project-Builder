class InstructionSerializer {
	static getInstructionDetails(instruction) {
	  const allowedAttributes = ["id", "instructionHTML"]
	  let serializedInstruction = {}
	  for (const attribute of allowedAttributes){
		serializedInstruction[attribute] = instruction[attribute]
	  }
	  return serializedInstruction
	}
  }
  
  export default InstructionSerializer