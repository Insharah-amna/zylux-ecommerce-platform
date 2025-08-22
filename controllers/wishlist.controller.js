const WishlistModel = require("../model/wishlist.model");
const GeneralServices = require("../services/general.service");
const WishlistErrors = require("../factories/errors/wishlist");
const WishlistResponses = require("../factories/responses/wishlist");

const WishlistController = {
	addToWishlist: async (req, res) => {
		const productId = req.params;
		const userId = req.user._id;

		const { response: existedProduct } = await GeneralServices.findById({
			model: WishlistModel,
			id: productId,
		});

		if (existedProduct) return WishlistErrors.productAlreadyExists({ res });

		const { error, doc: wishlistItem } = await GeneralServices.create({
			model: WishlistModel,
			data: { productId, userId },
		});

		if (error) return WishlistErrors.productNotAddedToWishlist({ res });

		return WishlistResponses.addedToWishlist({ res, wishlist: wishlistItem });
	},

	getWishlist: async (req, res) => {
		const userId = req.user._id;

		const { error, response: wishlist } = await GeneralServices.find({
			model: WishlistModel,
			query: { userId },
			options: {
				populatedFields: ["productId"],
				queryProperties: {
					sort: { createdAt: -1 },
				},
			},
		});

		return WishlistResponses.wishlistFetchedSuccessfully({
			res,
			wishlist,
		});
	},

	removeFromWishlist: async (req, res) => {
		const { id } = req.params;

		const { error } = await GeneralServices.findByIdAndDelete({
			model: WishlistModel,
			id,
		});

		if (error) return WishlistErrors.deletionFailedErr({ res });

		return WishlistResponses.productRemovedSuccessfully({ res });
	},
};

module.exports = WishlistController;
