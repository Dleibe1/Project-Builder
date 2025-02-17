import { Instruction } from "../../models/index.js"
import newInstructionsTableData from "../InstructionsSeederData/instructions.js"

class InstructionSeeder {
  static async seed() {
    await Instruction.query().insert(newInstructionsTableData)
  }
}

export default InstructionSeeder
