export const toString = n => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const toNumber = str => {
	return Number(str.replaceAll(".", ""));
};

export const formatIdr = numb => "IDR " + toString(numb);