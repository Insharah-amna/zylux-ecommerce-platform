exports.prepareCheckoutLineItems = ({ products, currency }) => {
	return products.map((product) => ({
		price_data: {
			currency,
			product_data: {
				name: product.name,
				images: product.images,
			},
			unit_amount: product.unitPrice * 100,
		},
		quantity: product.quantity,
	}));
};

exports.prepareCheckoutMetadata = ({ products }) => {
	return products.map((product) => ({
		productId: product.productId,
		discount: product.discount,
		quantity: product.quantity,
		unitPrice: product.unitPrice,
	}));
};
