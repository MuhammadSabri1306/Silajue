export const data = [
	{
		id: 0,
		name: "Sapi 1",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-1.webp"
	}, {
		id: 1,
		name: "Sapi 2",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-2.webp"
	}, {
		id: 2,
		name: "Sapi 3",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-3.webp"
	}, {
		id: 3,
		name: "Sapi 4",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-1.webp"
	}, {
		id: 4,
		name: "Sapi 5",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-2.webp"
	}, {
		id: 5,
		name: "Sapi 6",
		price: "Rp. 123.000.000",
		img: "/assets/img/produk-3.webp"
	}
];

export const getSampleProduct = (productId = null) => {
	if(!productId)
		return new Promise((resolve, reject) => setTimeout(() => resolve(data), 500));

	return new Promise((resolve, reject) => {
		const dataById = data.find(({ id }) => id == productId);
		setTimeout(() => resolve(dataById), 500);
	});
};

export const getSuggestions = (currentId) => {
	return new Promise((resolve, reject) => {
		const suggestions = [];
		let i = data.findIndex(({ id }) => id == currentId);
		console.log(currentId);

		for(let j=0; j<3; j++) {
			suggestions.push(data[i]);
			i++;

			if(i === data.length)
				i = 0;
		}

		setTimeout(() => resolve(suggestions), 500);
	});
};