const MongoFactoryService = {
	create: async ({ model, data }) => {
		return await model.create(data);
	},
	find: async ({ model, query }) => {
		return await model.find(query);
	},
	findOne: async ({ model, query }) => {
		return await model.findOne(query);
	},
	findAll: async ({ model }) => {
		return await model.find();
	},
	findById: async ({ model, id }) => {
		return await model.findById(id);
	},
	findByIdAndUpdate: async ({ model, id, data }) => {
		return await model.findByIdAndUpdate(id, data);
	},
	findByIdAndDelete: async ({ model, id }) => {
		return await model.findByIdAndDelete(id);
	},
};

module.exports = MongoFactoryService;
