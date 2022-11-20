import product from "./product";
import post from "./post";
import category from "./category";
import feedback from "./feedback";

const buildResponse = responseData => {
	const response = { success: true, ...responseData };
	return new Promise((resolve, reject) => setTimeout(() => resolve(response), 500));
};

export const getSampleProduct = (productId = null) => {
	if(!productId)
		return buildResponse({ products: product });

	const dataById = product.find(({ id }) => id == productId);
	return buildResponse({ product: dataById });
};

export const getProductByCategory = categoryName => {
	const dataByCategory = product.find(({ category }) => category == categoryName);
	return buildResponse({ product: dataByCategory });
};

export const getProductSuggestions = (currentId, maxLength = 3) => {
	const suggestions = [];
	let index = product.findIndex(({ id }) => id == currentId);
	
	for(let i=0; i<maxLength; i++) {
		suggestions.push(product[index]);
		index++;

		if(index === product.length)
			index = 0;
	}

	return buildResponse({ products: suggestions });
};

export const getSamplePost = (postId = null) => {
	if(!postId)
		return buildResponse({ blog: post });

	const dataById = post.find(({ id }) => id == postId);
	return buildResponse({ blog: dataById });
};

export const getPostSuggestions = (currentId = 1, maxLength = 4) => {
	const suggestions = [];
	let index = post.findIndex(({ id }) => id == currentId);

	for(let i=0; i<maxLength; i++) {
		suggestions.push(post[index]);
		index++;

		if(index === post.length) {
			index = 0;
		}
	}

	return buildResponse({ blog: suggestions });
};

export const getSampleCategories = () => {
	return buildResponse({ categories: category });
};

export const getFeedbackOnProduct = productId => {
	const data = feedback.filter(item => item.productId === productId);
	return buildResponse({ feedback: data });
};