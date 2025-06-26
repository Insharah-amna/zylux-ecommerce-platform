const { asyncTryCatch } = require("../utils/tryCatchUtils");
const MongoFactoryService = require("./mongoFactories.service");

const GeneralServices = {
	findOne: async ({ model, query }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.findOne({ model, query })
		);

		return { success, error, response };
	},

	create: async ({ model, data }) => {
		const {
			success,
			error,
			response: doc,
		} = await asyncTryCatch(
			async () => await MongoFactoryService.create({ model, data })
		);

		return { success, error, doc };
	},
};

module.exports = GeneralServices;
