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
     properties: {
       email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
       cryptedPassword: { type: "string" },
       userName: { type: "string" },
       githubUsername: {type: "string"},
       loginMethod: {
         type: "string",
         default: "standard",
         enum: ["standard", "github"],
       },
     },
     allOf: [
       {
         if: {
           properties: {
             loginMethod: { const: "standard" },
           },
         },
         then: {
           required: ["userName", "email"],
         },
       },
       {
         if: {
           properties: {
             loginMethod: { const: "github" },
           },
         },
         then: {
           required: ["githubUserName"],
         },
       },
     ],
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
         to: "projects.userId",
       },
     },
   }
 }

 $beforeInsert() {
  if(this.loginMethod === "standard"){
    return Promise.all([this.$checkUniqueness("email"), this.$checkUniqueness("userName")])
  }
 }

 $beforeUpdate() {
  if(this.loginMethod === "standard"){
    return Promise.all([this.$checkUniqueness("email"), this.$checkUniqueness("userName")])
  }
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



