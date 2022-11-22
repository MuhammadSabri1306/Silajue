const data = [
	{
		name: "Arjuna",
		stock: 10,
		category: 3,
		img: "/uploads/bali-arjuna.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Bima",
		stock: 10,
		category: 3,
		img: "/uploads/bali-bima.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Celebes",
		stock: 10,
		category: 3,
		img: "/uploads/bali-celebes.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Dewa",
		stock: 10,
		category: 3,
		img: "/uploads/bali-dewa.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Hercules",
		stock: 10,
		category: 3,
		img: "/uploads/bali-hercules.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Kajuara",
		stock: 10,
		category: 3,
		img: "/uploads/bali-kajuara.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Kampus",
		stock: 10,
		category: 3,
		img: "/uploads/bali-kampus.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Lewa",
		stock: 10,
		category: 3,
		img: "/uploads/bali-lewa.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Maiwa",
		stock: 10,
		category: 3,
		img: "/uploads/bali-maiwa.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Rewa",
		stock: 10,
		category: 3,
		img: "/uploads/bali-rewa.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Rowa",
		stock: 10,
		category: 3,
		img: "/uploads/bali-rowa.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Singo",
		stock: 10,
		category: 3,
		img: "/uploads/bali-singo.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Sinyo",
		stock: 10,
		category: 3,
		img: "/uploads/bali-sinyo.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Sadoko",
		stock: 10,
		category: 4,
		img: "/uploads/kerbau belang-sadoko.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Sopai",
		stock: 10,
		category: 4,
		img: "/uploads/kerbau belang-sopai.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Abang",
		stock: 10,
		category: 1,
		img: "/uploads/limousin-abang.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Buyung",
		stock: 10,
		category: 2,
		img: "/uploads/simental-buyung.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	},
	{
		name: "Arjuna",
		stock: 10,
		category: 2,
		img: "/uploads/simental-udha.webp",
		description: "Umur 5 tahun, bobot 655 Kg, tinggi 141 cm, lingkar dada 193 cm, panjang badan 150 cm."
	}
];

const product = [];
let productId = 1;
data.forEach(item => {

	const sexingProduct = {
		id: productId,
		...item,
		price: [1, 2, 3].indexOf(item.category) >= 0 ? 36000 : 75000,
		type: "sexing"
	};
	product.push(sexingProduct);
	productId++;

	const unsexingProduct = {
		id: productId,
		...item,
		price: [1, 2, 3].indexOf(item.category) >= 0 ? 7500 : 45000,
		type: "unsexing"
	};
	product.push(unsexingProduct);
	productId++;

});

export default product;