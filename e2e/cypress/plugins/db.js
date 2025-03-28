const truncateModel = require("../../../server/test/utils/truncateModel.cjs")
const connection = require("../../../server/src/boot/model.cjs")
const modelList = require("../../../server/src/models")

class ModelTasks {
  static async truncate(models) {
    let modelsToTruncate = models
    if (!Array.isArray(modelsToTruncate)) {
      modelsToTruncate = [modelsToTruncate]
    }
    for (const model of modelsToTruncate) {
      await truncateModel(modelList[model])
    }
    await connection.client.pool.release()
    return 1
  }

  static async insert({ modelName, json }) {
    const result = await modelList[modelName].query().insertGraph(json)
    await connection.client.pool.release()
    return result
  }

  static async update({ modelName, conditions = {}, json }) {
    const result = await modelList[modelName].query().patch(json).where(conditions)
    await connection.client.pool.release()
    return result
  }

  static async find({ modelName, conditions = {} }) {
    const result = await modelList[modelName].query().where(conditions)
    await connection.client.pool.release()
    return result
  }

  static async delete({ modelName, conditions = {} }) {
    const result = await modelList[modelName].query().delete().where(conditions)
    await connection.client.pool.release()
    return result
  }
}

module.exports = { ModelTasks }
