
export const buildCardProps = data => {
	return {
		id: data.id,
		title: data.name || "",
		price: data.price || "",
		img: data.img || "",
		category: data.category || "",
		description: data.description || "",
		type: data.type || "",
		available: data.stock && data.stock > 0
	};
};