exports.calculateAverageRating = ({ product, data }) => {
	const oldRating = product.averageRating;
	const oldCount = product.reviewCount;

	const newRating = (oldRating * oldCount + data.rating) / (oldCount + 1);

	return { newRating, oldCount };
};
