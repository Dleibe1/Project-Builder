const { modelTasks } = require("./db")
const { tableTasks } = require("./dbTableOps")

/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on("task", {
    "db:truncate"(models) {
      return modelTasks.truncate(models)
    },
    "db:insert"({ modelName, json }) {
      return modelTasks.insert({ modelName, json })
    },
    "db:find"({ modelName, conditions }) {
      return modelTasks.find({ modelName, conditions })
    },
    "db:delete"({ modelName, conditions }) {
      return modelTasks.deleteRecords({ modelName, conditions })
    },
    "db:update"({ modelName, conditions, json }) {
      return modelTasks.update({ modelName, conditions, json })
    },
    //The following were added to truncate tables if no Objection model exists
    "dbTable:truncate"(tables) {
      return tableTasks.truncate(tables)
    },
    "dbTable:insert"({ tableName, json }) {
      return tableTasks.insert({ tableName, json })
    },
    "dbTable:find"({ tableName, conditions }) {
      return tableTasks.find({ tableName, conditions })
    },
    "dbTable:delete"({ tableName, conditions }) {
      return tableTasks.deleteRecords({ tableName, conditions })
    },
    "dbTable:update"({ tableName, conditions, json }) {
      return tableTasks.update({ tableName, conditions, json })
    },
  })
  return config
}
