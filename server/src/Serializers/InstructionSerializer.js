class InstructionSerializer {
  static getInstructionDetails(instruction) {
    const allowedAttributes = ["id", "imageURL", "instruction"]
    let serializedInstruction = {}
    for (const attribute of allowedAttributes){
      serializedInstruction[attribute] = instruction[attribute]
    }
    return serializedInstruction
  }
}

export default InstructionSerializer