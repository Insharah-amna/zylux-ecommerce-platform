const MongoFactoryService = {
	findOne: async ({ model, query }) => {
		return await model.findOne(query);
	},
	create: async ({ model, data }) => {
		return await model.create(data);
	},
	findByIdAndUpdate: async ({ model, id, data }) => {
		return await model.findByIdAndUpdate(id, data);
	},
};

module.exports = MongoFactoryService;
