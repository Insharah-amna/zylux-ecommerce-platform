const WishlistResponses = {
	addedToWishlist: ({ res, wishlist }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product added to wishlist successfully",
			body: { wishlist },
		});
	},

	wishlistFetchedSuccessfully: ({ res, wishlist, page, limit, totalPages }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Wishlist fetched successfully",
			body: { wishlist, pagination: { page, limit, totalPages } },
		});
	},

	productRemovedSuccesfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product removed from wishlist",
		});
	},
};

module.exports = WishlistResponses;
