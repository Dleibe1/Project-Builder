import { User } from "../../models/index.js"
import bcrypt from "bcrypt"

class UserSeeder {
  static async seed() {

    const hashedPasswords = await Promise.all([
      bcrypt.hash('examplePassword1', 10),
      bcrypt.hash('examplePassword2', 10),
      bcrypt.hash('examplePassword3', 10),
      bcrypt.hash('cat', 10), //Seeded example user
      bcrypt.hash('examplePassword4', 10),
      bcrypt.hash('examplePassword5', 10),
      bcrypt.hash('examplePassword6', 10),
      bcrypt.hash('examplePassword7', 10),
    ])

    await User.query().insert([
      { email: "Charles@google.com", cryptedPassword: hashedPasswords[0], userName: "CharlieDelta", loginMethod: "standard" },
      { email: "lukeM2@hotmail.com", cryptedPassword: hashedPasswords[1], userName: "lukeTheMan", loginMethod: "standard" },
      { email: "chrisC@google.com", cryptedPassword: hashedPasswords[2], userName: "BigChris", loginMethod: "standard" },
      //Seeded example user is example@example.com password: cat
      { email: "example@example.com", cryptedPassword: hashedPasswords[3], userName: "Example", loginMethod: "standard" }, 
      { email: "Bartsampzon@yahoo.com", cryptedPassword: hashedPasswords[4], userName: "Bartman", loginMethod: "standard" },
      { email: "Hedgbets44@yahoo.com", cryptedPassword: hashedPasswords[5], userName: "Hedgehog33", loginMethod: "standard" },
      { email: "johncc44@aol.com", cryptedPassword: hashedPasswords[6], userName: "2xDeveloper", loginMethod: "standard" },
      { email: "ArduinoMadman@aol.com.com", cryptedPassword: hashedPasswords[5], userName: "ArduinoMozart", loginMethod: "standard" },
    ])
  }
}

export default UserSeeder