import { Instruction } from "../../models/index.js"
import newInstructionsTableData from "../InstructionsSeederData/instructionsMigrationService.js"

class InstructionSeeder {
  static async seed() {
    await Instruction.query().insert(newInstructionsTableData)
  }
}

export default InstructionSeeder
