import Cookies from "js-cookie";

export const cookieName = "silajue_cart";

export const getCart = () => {
	const cardData = Cookies.get(cookieName);
	if(cardData === undefined)
		return null;
	return JSON.parse(cardData);
};

export const setCart = data => {
	Cookies.remove(cookieName);

	if(Array.isArray(data))
		Cookies.set(cookieName, JSON.stringify(data), { expires: 7 });
	else
		console.warn("cart data must be array.", data);
};

export const pushCart = item => {
	const data = getCart() || [];
	data.push(item);
	setCart(data);
};