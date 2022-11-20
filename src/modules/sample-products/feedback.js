const data = [
	{ name: "Gibran Giffar", avatar: "/assets/img/person_2.jpg", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ad." },
	{ name: "Ali Sadikin", avatar: "/assets/img/person_3.jpg", comment: "Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, debitis! Nisi, facilis." }
];

export default data.map(item => ({ productId: 1, ...item }));