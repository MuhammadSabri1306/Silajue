export const data = [
	{
		id: 0,
		name: "Sapi 1",
		price: "Rp. 123.000.000",
		stock: 10,
		img: "/assets/img/produk-1.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 1,
		name: "Sapi 2",
		price: "Rp. 123.000.000",
		stock: 9,
		img: "/assets/img/produk-2.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 2,
		name: "Sapi 3",
		price: "Rp. 123.000.000",
		stock: 5,
		img: "/assets/img/produk-3.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 3,
		name: "Sapi 4",
		price: "Rp. 123.000.000",
		stock: 3,
		img: "/assets/img/produk-1.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 4,
		name: "Sapi 5",
		price: "Rp. 123.000.000",
		stock: 10,
		img: "/assets/img/produk-2.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 5,
		name: "Sapi 6",
		price: "Rp. 123.000.000",
		stock: 5,
		img: "/assets/img/produk-3.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
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

		for(let j=0; j<3; j++) {
			suggestions.push(data[i]);
			i++;

			if(i === data.length)
				i = 0;
		}

		setTimeout(() => resolve(suggestions), 500);
	});
};