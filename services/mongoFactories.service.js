const MongoFactoryService = {
	findOne: async ({ model, query }) => {
		return await model.findOne(query);
	},
	create: async ({ model, data }) => {
		return await model.create(data);
	},
};

module.exports = MongoFactoryService;
