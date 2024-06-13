/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt")
const unique = require("objection-unique")
const Model = require("./Model")

const saltRounds = 10

const uniqueFunc = unique({
  fields: ["email", "userName"],
  identifiers: ["id"],
})

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users"
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userName"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        userName: { type: "string" },
        loginMethod: {
          type: "string",
          default: "standard",
          enum: ["standard", "github"]
        }
      },
      if: {
        properties:{
          loginMethod: {const: "standard"}
        }
      },
      then: {
        required: ["userName", "email"]
      }
    }
  }
  
  static get relationMappings() {
    const { Project } = require("./index.js")
    return {
      projects: {
        relation: Model.HasManyRelation,
        modelClass: Project,
        join: {
          from: "users.id",
          to: "projects.userId"
        }
      }
    }
  }

  $beforeInsert() {
    return Promise.all([this.$checkUniqueness("email"), this.$checkUniqueness("userName")])
  }

  $beforeUpdate() {
    return Promise.all([this.$checkUniqueness("email"), this.$checkUniqueness("userName")])
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json)

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword
    }

    return serializedJson
  }
}

module.exports = User