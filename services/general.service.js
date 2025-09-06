const { asyncTryCatch } = require("../utils/tryCatchUtils");
const MongoFactoryService = require("./mongoFactories.service");

const GeneralServices = {
	find: async ({ model, query = {}, options = {} }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.find({ model, query, options })
		);

		return { success, error, response };
	},

	findAll: async ({ model, options = {}, filter = {} }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.findAll({ model, options, filter })
		);

		return { success, error, response };
	},

	findOne: async ({ model, query, options = {} }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.findOne({ model, query, options })
		);

		return { success, error, response };
	},

	findById: async ({ model, id, options = {} }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.findById({ model, id, options })
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

	findByIdAndUpdate: async ({ model, data, id }) => {
		const {
			success,
			error,
			response: updatedDoc,
		} = await asyncTryCatch(
			async () =>
				await MongoFactoryService.findByIdAndUpdate({ model, data, id })
		);

		return { success, error, updatedDoc };
	},

	findByIdAndDelete: async ({ model, id }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.findByIdAndDelete({ model, id })
		);

		return { success, error, response };
	},

	countDocuments: async ({ model, query = {} }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.countDocuments({ model, query })
		);

		return { success, error, count: response };
	},

	getDistinctValues: async ({ model, query }) => {
		const { success, error, response } = await asyncTryCatch(
			async () => await MongoFactoryService.getDistinctValues({ model, query })
		);

		return { success, error, response };
	},
};

module.exports = GeneralServices;
