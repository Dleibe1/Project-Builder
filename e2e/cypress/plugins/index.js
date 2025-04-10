const { ModelTasks } = require("./db")
const { TableTasks } = require("./dbTableOps")

/// <reference types="Cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on("task", {
    "db:truncate"(models) {
      return ModelTasks.truncate(models)
    },
    "db:insert"({ modelName, json }) {
      return ModelTasks.insert({ modelName, json })
    },
    "db:find"({ modelName, conditions }) {
      return ModelTasks.find({ modelName, conditions })
    },
    "db:delete"({ modelName, conditions }) {
      return ModelTasks.deleteRecords({ modelName, conditions })
    },
    "db:update"({ modelName, conditions, json }) {
      return ModelTasks.update({ modelName, conditions, json })
    },
    //The following were added to truncate tables if no Objection model exists
    "dbTable:truncate"(tables) {
      return TableTasks.truncate(tables)
    },
    "dbTable:insert"({ tableName, json }) {
      return TableTasks.insert({ tableName, json })
    },
    "dbTable:find"({ tableName, conditions }) {
      return TableTasks.find({ tableName, conditions })
    },
    "dbTable:delete"({ tableName, conditions }) {
      return TableTasks.deleteRecords({ tableName, conditions })
    },
    "dbTable:update"({ tableName, conditions, json }) {
      return TableTasks.update({ tableName, conditions, json })
    },
  })
  return config
}
