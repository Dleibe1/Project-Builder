import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    await User.query().insert([
      { email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1", loginMethod: "standard" },
      { email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan", loginMethod: "standard" },
      { email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris", loginMethod: "standard" },
    ])
  }
}

export default UserSeeder