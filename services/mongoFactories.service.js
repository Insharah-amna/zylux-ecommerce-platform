const MongoFactoryService = {
	find: async ({ model }) => {
		return await model.find();
	},
	findOne: async ({ model, query }) => {
		return await model.findOne(query);
	},
	findById: async ({ model, id }) => {
		return await model.findById(id);
	},
	create: async ({ model, data }) => {
		return await model.create(data);
	},
	findByIdAndUpdate: async ({ model, id, data }) => {
		return await model.findByIdAndUpdate(id, data);
	},
	findByIdAndDelete: async ({ model, id }) => {
		return await model.findByIdAndDelete(id);
	},
};

module.exports = MongoFactoryService;
