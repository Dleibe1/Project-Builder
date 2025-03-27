const connection = require("../../../server/src/boot/model.cjs")
const truncateTable = require("../../../server/test/utils/truncateTable.cjs")
//These functions are for tables that do not have models associated with them

class tableTasks {
  static async truncate(tables) {
    let tablesToTruncate = tables
    if (!Array.isArray(tablesToTruncate)) {
      tablesToTruncate = [tablesToTruncate]
    }
    for (const table of tablesToTruncate) {
      await truncateTable(table, connection)
    }
    await connection.client.pool.release()
    return 1
  }
  static async insert({ tableName, json }) {
    const result = await connection(tableName).insert(json)
    await connection.client.pool.release()
    return result
  }

  static async update({ tableName, conditions = {}, json }) {
    const result = await connection(tableName).update(json).where(conditions)
    await connection.client.pool.release()
    return result
  }

  static async find({ tableName, conditions = {} }) {
    const result = await connection(tableName).where(conditions)
    await connection.client.pool.release()
    return result
  }

  static async deleteRecords({ tableName, conditions = {} }) {
    const result = await connection(tableName).delete().where(conditions)
    await connection.client.pool.release()
    return result
  }
}

module.exports = { tableTasks }
