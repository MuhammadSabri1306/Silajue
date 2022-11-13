import Cookies from "js-cookie";

const config = {
	name: '_silajue_dpkh_cookie',
	expires: 2 // days
};

const get = () => {
	const dataJson = Cookies.get(config.name);
	if(!dataJson)
		return;
	return JSON.parse(dataJson);
};

const set = data => {
	const dataJson = JSON.stringify(data);
	Cookies.set(config.name, dataJson, { expires: config.expires });
};

export const setCookie = (key, val) => {
	let data = get();
	if(!data)
		data = {};

	data[key] = val;
	set(data);
};

export const getCookie = (key = null) => {
	const data = get();
	if(!key)
		return data[keys];
	return data;
};

export const deleteCookie = key => {};

export const resetCookie = () => {
	Cookies.remove(config.name);
};