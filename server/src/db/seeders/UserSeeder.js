import { User } from "../../models/index.js"
import bcrypt from "bcrypt"

class UserSeeder {
  static async seed() {

    const hashedPasswords = await Promise.all([
      bcrypt.hash('examplePassword1', 10),
      bcrypt.hash('examplePassword2', 10),
      bcrypt.hash('examplePassword3', 10),
      bcrypt.hash('cat', 10)
    ])

    await User.query().insert([
      { email: "dleibe1@google.com", cryptedPassword: hashedPasswords[0], userName: "dleibe1", loginMethod: "standard" },
      { email: "lukeM2@hotmail.com", cryptedPassword: hashedPasswords[1], userName: "lukeTheMan", loginMethod: "standard" },
      { email: "chrisC@google.com", cryptedPassword: hashedPasswords[2], userName: "BigChris", loginMethod: "standard" },
      { email: "example@example.com", cryptedPassword: hashedPasswords[3], userName: "Example", loginMethod: "standard", githubAvatarURL: 'https://us.123rf.com/450wm/davids47/davids472308/davids47230801943/212002604-isolated-cute-female-hipster-character-avatar-vector.jpg?ver=6' },
    ])
  }
}

export default UserSeeder