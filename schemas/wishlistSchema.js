const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonWishlistSchema = {
	productId: Yup.string().required("Product id is required"),
};

module.exports.validateWishlistRequest = ({ data: wishlist }) => {
	const schema = Yup.object().shape({
		...commonWishlistSchema,
	});

	return validate(schema, wishlist);
};
