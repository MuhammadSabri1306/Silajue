import Cookies from "js-cookie";

export const cookieName = "silajue_cart";

export const getCart = () => {
	return Cookies.get(cookieName);
};

export const setCart = data => {
	if(Array.isArray(data))
		Cookies.set(cookieName, data, { expires: 7 });
	else
		console.warn("cart data must be array.", data);
};

export const pushCart = item => {
	const data = getCart() || [];
	data.push(item);
	setCart(data);
};