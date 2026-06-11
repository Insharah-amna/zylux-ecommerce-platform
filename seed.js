require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./model/users.model");
const Category = require("./model/categories.model");
const Product = require("./model/products.model");
const Order = require("./model/orders.model");
const Review = require("./model/review.model");

const DB_URL = process.env.DB_URL;

// ─── Seed Data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
	{ name: "Electronics" },
	{ name: "Clothing" },
	{ name: "Home & Kitchen" },
	{ name: "Sports & Outdoors" },
	{ name: "Beauty & Care" },
];

const USERS = [
	{
		firstName: "Admin",
		lastName: "User",
		email: "admin@shopzone.com",
		password: "Admin@123",
		role: "admin",
		isUserVerified: true,
	},
	{
		firstName: "Alice",
		lastName: "Johnson",
		email: "alice@example.com",
		password: "Alice@123",
		role: "buyer",
		isUserVerified: true,
	},
	{
		firstName: "Bob",
		lastName: "Williams",
		email: "bob@example.com",
		password: "Bob@123",
		role: "buyer",
		isUserVerified: true,
	},
	{
		firstName: "Carol",
		lastName: "Smith",
		email: "carol@example.com",
		password: "Carol@123",
		role: "buyer",
		isUserVerified: true,
	},
	{
		firstName: "David",
		lastName: "Brown",
		email: "david@example.com",
		password: "David@123",
		role: "buyer",
		isUserVerified: true,
	},
];

// Products keyed by category name
const PRODUCTS_BY_CATEGORY = {
	Electronics: [
		{
			name: "Sony WH-1000XM5 Wireless Headphones",
			price: 299.99,
			colorVariants: ["Black", "Silver", "Midnight Blue"],
			discount: 10,
			description:
				"Industry-leading noise cancellation with 30-hour battery life. Crystal clear calls with precise voice pickup. Multipoint connection for two devices simultaneously. Optimized for Alexa and Google Assistant.",
			imageUrls: [
				"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
				"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
				"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
			],
			averageRating: 4.8,
			reviewCount: 0,
		},
		{
			name: "Apple Watch Series 9 Smart Watch",
			price: 399.99,
			colorVariants: ["Midnight", "Starlight", "Red", "Blue"],
			discount: 5,
			description:
				"Advanced health features including blood oxygen monitoring, ECG app, and sleep tracking. Powerful S9 chip for fast performance. Always-On Retina display. Water resistant to 50 meters.",
			imageUrls: [
				"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
				"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
				"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
			],
			averageRating: 4.7,
			reviewCount: 0,
		},
		{
			name: "Logitech MX Master 3 Wireless Mouse",
			price: 89.99,
			colorVariants: ["Graphite", "Pale Grey", "Rose"],
			discount: 0,
			description:
				"Ultra-fast MagSpeed electromagnetic scrolling. Works on any surface, even glass. Ergonomic comfort for all-day use. Up to 70 days on a full charge. Connect up to 3 devices.",
			imageUrls: [
				"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
				"https://images.unsplash.com/photo-1615750173545-cd0f3afd22e1?w=800&q=80",
			],
			averageRating: 4.6,
			reviewCount: 0,
		},
		{
			name: "JBL Flip 6 Portable Bluetooth Speaker",
			price: 129.99,
			colorVariants: ["Black", "Teal", "Squad", "Red", "Blue"],
			discount: 15,
			description:
				"Bold JBL Original Pro Sound with separate tweeter and woofer. IP67 waterproof and dustproof. 12 hours of playtime. PartyBoost to link multiple JBL speakers. USB-C charging.",
			imageUrls: [
				"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
				"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
			],
			averageRating: 4.5,
			reviewCount: 0,
		},
	],
	Clothing: [
		{
			name: "Classic Fit Cotton T-Shirt",
			price: 29.99,
			colorVariants: ["White", "Black", "Navy", "Grey", "Olive"],
			discount: 0,
			description:
				"Made from 100% premium combed cotton for ultimate softness. Relaxed classic fit suitable for everyday wear. Pre-shrunk fabric to maintain shape after washing. Reinforced collar and double-stitched hems for durability.",
			imageUrls: [
				"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
				"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
			],
			averageRating: 4.3,
			reviewCount: 0,
		},
		{
			name: "Women's Floral Wrap Dress",
			price: 64.99,
			colorVariants: ["Blue Floral", "Pink Floral", "Green Floral"],
			discount: 20,
			description:
				"Elegant wrap-style dress with adjustable tie waist for a flattering silhouette. Lightweight chiffon fabric with beautiful floral print. Perfect for brunch, parties, or casual outings. Available in regular and plus sizes.",
			imageUrls: [
				"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
				"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
			],
			averageRating: 4.4,
			reviewCount: 0,
		},
		{
			name: "Slim Fit Stretch Denim Jeans",
			price: 79.99,
			colorVariants: ["Dark Blue", "Light Blue", "Black", "Grey"],
			discount: 10,
			description:
				"Modern slim fit with stretch denim for all-day comfort. Five-pocket styling with YKK zip fly. Made with sustainable stretch denim — 98% cotton, 2% elastane. Machine washable and colourfast.",
			imageUrls: [
				"https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
				"https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=80",
			],
			averageRating: 4.2,
			reviewCount: 0,
		},
		{
			name: "Nike Air Zoom Running Shoes",
			price: 119.99,
			colorVariants: ["White/Black", "Black/Red", "Blue/White", "Grey/Orange"],
			discount: 0,
			description:
				"Responsive cushioning in the heel and forefoot for smooth, fast transitions. Lightweight, breathable mesh upper keeps your foot cool. Wide forefoot allows toes to spread naturally during pushoff. Durable rubber outsole with flex grooves.",
			imageUrls: [
				"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
				"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
				"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
			],
			averageRating: 4.7,
			reviewCount: 0,
		},
	],
	"Home & Kitchen": [
		{
			name: "Nespresso Vertuo Next Coffee Maker",
			price: 149.99,
			colorVariants: ["Black", "White", "Red", "Grey"],
			discount: 0,
			description:
				"Brews five cup sizes from Espresso to Alto XL with the touch of a button. Unique Centrifusion technology extracts the full flavor of each blend. Connected via Bluetooth and Wi-Fi for easy descaling alerts. Energy-saving: auto switch-off after 2 minutes.",
			imageUrls: [
				"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
				"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
			],
			averageRating: 4.6,
			reviewCount: 0,
		},
		{
			name: "T-fal 12-Piece Non-Stick Cookware Set",
			price: 129.99,
			colorVariants: ["Red", "Black", "Charcoal"],
			discount: 25,
			description:
				"Unique Thermo-Spot heat indicator shows when the pan is perfectly preheated. Hard titanium non-stick interior — scratch-resistant and PFOA-free. Works on all stovetops except induction. Oven safe up to 350°F. Dishwasher-safe.",
			imageUrls: [
				"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
				"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
			],
			averageRating: 4.4,
			reviewCount: 0,
		},
		{
			name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
			price: 89.99,
			colorVariants: ["Stainless Steel"],
			discount: 15,
			isOutOfStock: false,
			description:
				"7 cooking functions: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. Up to 70% faster than traditional cooking. 13 one-touch smart programs. Fingerprint-resistant, easy-clean stainless steel exterior.",
			imageUrls: [
				"https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
				"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
			],
			averageRating: 4.8,
			reviewCount: 0,
		},
	],
	"Sports & Outdoors": [
		{
			name: "Manduka PRO Yoga Mat",
			price: 99.99,
			colorVariants: ["Black", "Purple", "Teal", "Blue"],
			discount: 0,
			description:
				"Superior 6mm cushioning provides joint protection and support. Closed-cell surface prevents moisture from entering the mat. Lifetime guarantee — built to last. Eco-certified free of harmful plastics, chemicals, and dyes. Non-slip texture.",
			imageUrls: [
				"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
				"https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
			],
			averageRating: 4.7,
			reviewCount: 0,
		},
		{
			name: "Resistance Bands Set (11 Piece)",
			price: 34.99,
			colorVariants: ["Multicolor"],
			discount: 0,
			description:
				"Complete set with 5 resistance levels from 10 to 50 lbs. Made from premium natural latex — odorless and skin-friendly. Includes door anchor, ankle straps, handles, and carrying bag. Suitable for strength training, physical therapy, and stretching.",
			imageUrls: [
				"https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
				"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
			],
			averageRating: 4.3,
			reviewCount: 0,
		},
		{
			name: "Hydro Flask 32 oz Water Bottle",
			price: 44.99,
			colorVariants: ["Black", "White", "Pacific", "Olive", "Flamingo"],
			discount: 0,
			description:
				"Double-wall vacuum insulation keeps drinks cold up to 24 hours and hot up to 12 hours. Made with professional-grade stainless steel — no flavor transfer. Dishwasher safe. BPA-free and phthalate-free. Flex Cap creates a leak-proof seal.",
			imageUrls: [
				"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
				"https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80",
			],
			averageRating: 4.9,
			reviewCount: 0,
		},
	],
	"Beauty & Care": [
		{
			name: "CeraVe Moisturizing Skincare Set",
			price: 49.99,
			colorVariants: ["Default"],
			discount: 10,
			description:
				"Complete 3-piece skincare routine: gentle foaming cleanser, moisturizing cream, and eye repair cream. Developed with dermatologists. Contains essential ceramides and hyaluronic acid to restore and maintain the skin's natural barrier. Fragrance-free, non-comedogenic.",
			imageUrls: [
				"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
				"https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
			],
			averageRating: 4.6,
			reviewCount: 0,
		},
		{
			name: "Oral-B iO Series 9 Electric Toothbrush",
			price: 199.99,
			colorVariants: ["Black Onyx", "Rose Quartz", "Stardust White"],
			discount: 20,
			description:
				"Revolutionary magnetic drive system delivers micro-vibrations for a dentist-clean feeling every day. AI-powered personalized coaching via the iO app. 7 smart brushing modes. 3D teeth tracking. Pressure sensor with light guide. 3-week battery life.",
			imageUrls: [
				"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
				"https://images.unsplash.com/photo-1559303787-3f6b5e5d9b88?w=800&q=80",
			],
			averageRating: 4.5,
			reviewCount: 0,
		},
		{
			name: "Dyson Supersonic Hair Dryer",
			price: 429.99,
			colorVariants: ["Black/Nickel", "Fuchsia/Iron", "White/Silver"],
			discount: 0,
			description:
				"Measures air temperature 40 times per second to prevent extreme heat damage. Lightweight with balanced design for effortless styling. Includes styling concentrator, diffuser, and flyaway attachment. Fast drying with Air Multiplier technology. Magnetic attachments.",
			imageUrls: [
				"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
				"https://images.unsplash.com/photo-1560066984-138daaa14742?w=800&q=80",
			],
			averageRating: 4.8,
			reviewCount: 0,
		},
	],
};

const REVIEWS = [
	{ rating: 5, subject: "Absolutely love it!", comment: "Best purchase I've made this year. Exceeded all my expectations. Highly recommend to everyone!" },
	{ rating: 5, subject: "Perfect product", comment: "Exactly as described. Fast shipping, great packaging, and the quality is outstanding." },
	{ rating: 4, subject: "Very good, minor issues", comment: "Really happy with this purchase. Works great, only minor issue is the setup took a bit longer than expected." },
	{ rating: 4, subject: "Great value for money", comment: "Solid product at a fair price. Does exactly what it says on the tin. Would buy again." },
	{ rating: 5, subject: "Exceeded my expectations", comment: "I was skeptical at first but this blew me away. The quality is top-notch and it arrived quickly." },
	{ rating: 3, subject: "Good but not perfect", comment: "Decent product overall. A few things could be improved but for the price it does the job well." },
	{ rating: 5, subject: "Fantastic quality!", comment: "The build quality is amazing. You can tell a lot of care went into making this. Worth every penny." },
	{ rating: 4, subject: "Happy with my purchase", comment: "Ordered this for a gift and the recipient absolutely loved it. Would definitely recommend." },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

async function seed() {
	try {
		console.log("Connecting to database...");
		await mongoose.connect(DB_URL);
		console.log("Connected.\n");

		// Clear existing data
		console.log("Clearing existing data...");
		await Promise.all([
			User.deleteMany({}),
			Category.deleteMany({}),
			Product.deleteMany({}),
			Order.deleteMany({}),
			Review.deleteMany({}),
		]);
		console.log("Cleared.\n");

		// Seed categories
		console.log("Seeding categories...");
		const categories = await Category.insertMany(CATEGORIES);
		const catMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));
		console.log(`  Created ${categories.length} categories.\n`);

		// Seed users
		console.log("Seeding users...");
		const hashedUsers = await Promise.all(
			USERS.map(async (u) => ({
				...u,
				password: await bcrypt.hash(u.password, 10),
			}))
		);
		const users = await User.insertMany(hashedUsers);
		const buyerUsers = users.filter((u) => u.role === "buyer");
		console.log(`  Created ${users.length} users.\n`);

		// Seed products
		console.log("Seeding products...");
		const allProductDocs = [];
		for (const [catName, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
			for (const p of products) {
				allProductDocs.push({ ...p, categoryId: catMap[catName] });
			}
		}
		const createdProducts = await Product.insertMany(allProductDocs);
		console.log(`  Created ${createdProducts.length} products.\n`);

		// Seed reviews — 2 reviews per product from different buyers
		console.log("Seeding reviews...");
		const reviewDocs = [];
		for (let i = 0; i < createdProducts.length; i++) {
			const product = createdProducts[i];
			const r1 = REVIEWS[i % REVIEWS.length];
			const r2 = REVIEWS[(i + 1) % REVIEWS.length];
			const u1 = buyerUsers[i % buyerUsers.length];
			const u2 = buyerUsers[(i + 1) % buyerUsers.length];

			reviewDocs.push({ userId: u1._id, productId: product._id, ...r1 });
			reviewDocs.push({ userId: u2._id, productId: product._id, ...r2 });
		}
		await Review.insertMany(reviewDocs);

		// Update averageRating and reviewCount on each product
		await Promise.all(
			createdProducts.map(async (product) => {
				const productReviews = reviewDocs.filter(
					(r) => r.productId.toString() === product._id.toString()
				);
				const avg =
					productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
				await Product.findByIdAndUpdate(product._id, {
					averageRating: Math.round(avg * 10) / 10,
					reviewCount: productReviews.length,
				});
			})
		);
		console.log(`  Created ${reviewDocs.length} reviews.\n`);

		// Seed orders
		console.log("Seeding orders...");
		const statuses = ["paid", "paid", "processing", "shipped", "delivered"];
		const orderDocs = [];

		buyerUsers.forEach((user, userIdx) => {
			// Each buyer gets 2 orders
			for (let o = 0; o < 2; o++) {
				const pickedProducts = [
					createdProducts[(userIdx * 2 + o) % createdProducts.length],
					createdProducts[(userIdx * 2 + o + 1) % createdProducts.length],
				];

				const details = pickedProducts.map((p) => ({
					productId: p._id,
					name: p.name,
					images: p.imageUrls.slice(0, 1),
					unitPrice: p.price,
					quantity: 1,
					discount: p.discount,
				}));

				const totalPrice = details.reduce((sum, d) => {
					const discounted = d.unitPrice * (1 - d.discount / 100);
					return sum + discounted * d.quantity;
				}, 0);

				orderDocs.push({
					userId: user._id,
					address: ["123 Maple Street", "456 Oak Avenue", "789 Pine Road", "321 Elm Blvd"][userIdx % 4],
					city: ["New York", "Los Angeles", "Chicago", "Houston"][userIdx % 4],
					country: "United States",
					details,
					totalPrice: Math.round(totalPrice * 100) / 100,
					currency: "usd",
					status: statuses[(userIdx + o) % statuses.length],
				});
			}
		});

		await Order.insertMany(orderDocs);
		console.log(`  Created ${orderDocs.length} orders.\n`);

		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log("Seed completed successfully!");
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log(`  Categories : ${categories.length}`);
		console.log(`  Users      : ${users.length}  (1 admin + ${buyerUsers.length} buyers)`);
		console.log(`  Products   : ${createdProducts.length}`);
		console.log(`  Reviews    : ${reviewDocs.length}`);
		console.log(`  Orders     : ${orderDocs.length}`);
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
		console.log("Demo credentials:");
		console.log("  Admin  — admin@shopzone.com  / Admin@123");
		console.log("  Buyer  — alice@example.com   / Alice@123");
		console.log("  Buyer  — bob@example.com     / Bob@123");
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
	} catch (err) {
		console.error("Seed failed:", err.message);
		process.exit(1);
	} finally {
		await mongoose.disconnect();
	}
}

seed();
