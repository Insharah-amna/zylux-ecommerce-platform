const MongoFactoryService = {
	create: async ({ model, data }) => {
		return await model.create(data);
	},

	find: async ({ model, query, options = {} }) => {
		const populatedFields = options?.populatedFields;

		const queryProperties = options?.queryProperties || {};

		if (options.skip !== undefined) {
			queryProperties.skip = options.skip;
		}

		if (options.limit !== undefined) {
			queryProperties.limit = options.limit;
		}

		return await model
			.find(query, null, queryProperties)
			.populate(populatedFields || "");
	},

	findOne: async ({ model, query, options = {} }) => {
		const populatedFields = options?.populatedFields;

		return await model.findOne(query).populate(populatedFields || "");
	},

	findAll: async ({ model, options = {} }) => {
		const populatedFields = options?.populatedFields;

		const queryProperties = options?.queryProperties || {};

		return await model
			.find({}, null, queryProperties)
			.populate(populatedFields || "");
	},

	findById: async ({ model, id, options = {} }) => {
		const populatedFields = options?.populatedFields;

		return await model.findById(id).populate(populatedFields || "");
	},

	findByIdAndUpdate: async ({ model, id, data }) => {
		return await model.findByIdAndUpdate(id, data);
	},

	findByIdAndDelete: async ({ model, id }) => {
		return await model.findByIdAndDelete(id);
	},
	countDocuments: async ({ model, query }) => {
		return await model.countDocuments(query);
	},
};

module.exports = MongoFactoryService;
