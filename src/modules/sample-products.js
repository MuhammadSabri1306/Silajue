export const data = [
	{
		id: 0,
		name: "Sapi 1",
		price: 123000000,
		stock: 10,
		category: "sapi",
		img: "/assets/img/produk-1.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 1,
		name: "Sapi 2",
		price: 123000000,
		stock: 9,
		category: "sapi",
		img: "/assets/img/produk-2.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 2,
		name: "Sapi 3",
		price: 123000000,
		stock: 5,
		category: "sapi",
		img: "/assets/img/produk-3.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 3,
		name: "Sapi 4",
		price: 123000000,
		stock: 3,
		category: "sapi",
		img: "/assets/img/produk-1.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 4,
		name: "Sapi 5",
		price: 123000000,
		stock: 10,
		category: "sapi",
		img: "/assets/img/produk-2.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}, {
		id: 5,
		name: "Sapi 6",
		price: 123000000,
		stock: 5,
		category: "sapi",
		img: "/assets/img/produk-3.webp",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta."
	}
];

export const post = [
	{
		id: 1,
		title: "Heading 1",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.",
		img: "/assets/img/produk-1.webp"
	}, {
		id: 2,
		title: "Heading 2",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.",
		img: "/assets/img/produk-1.webp"
	}, {
		id: 3,
		title: "Heading 3",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.",
		img: "/assets/img/produk-1.webp"
	}, {
		id: 4,
		title: "Heading 4",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.",
		img: "/assets/img/produk-1.webp"
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

export const getSamplePost = (postId = null) => {
	if(!postId)
		return new Promise((resolve, reject) => setTimeout(() => resolve(post), 500));

	return new Promise((resolve, reject) => {
		const postById = post.find(({ id }) => id == postId);
		setTimeout(() => resolve(postById), 500);
	});
};

export const getPostSuggestions = (currentId) => {
	return new Promise((resolve, reject) => {
		const suggestions = [];
		let i = post.findIndex(({ id }) => id == currentId);

		for(let j=0; j<3; j++) {
			suggestions.push(post[i]);
			i++;

			if(i === post.length)
				i = 0;
		}

		setTimeout(() => resolve(suggestions), 500);
	});
};