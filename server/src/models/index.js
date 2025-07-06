// include all of your models here using CommonJS requires
const User = require("./User.js")
const Project = require("./Project.js")
const Part = require("./Part.js")
const Tag = require("./Tag.js")
const ImageCounter = require("./ImageCounter.js")

module.exports = { User, Project, Part, Tag, ImageCounter }
