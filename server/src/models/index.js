// include all of your models here using CommonJS requires
const User = require("./User.js")
const Project = require("./Project.js")
const Part = require("./Part.js")
const Instruction = require("./Instruction.js")
const Tag = require("./Tag.js")

module.exports = { User, Project, Part, Instruction, Tag }
