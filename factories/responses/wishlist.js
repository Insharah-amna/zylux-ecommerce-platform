const WishlistResponses = {
	addedToWishlist: ({ res, wishlist }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product added to wishlist",
			body: { wishlist },
		});
	},

	wishlistFetchedSuccessfully: ({ res, wishlist }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Wishlist fetched successfully",
			body: { wishlist },
		});
	},

	productRemovedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product removed from wishlist",
		});
	},
};

module.exports = WishlistResponses;
