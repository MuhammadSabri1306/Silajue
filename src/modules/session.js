const prefix = "_silajue_dpkh_";

export const setSession = (key, val) => {
	window.sessionStorage.setItem(prefix + key, JSON.stringify(val));
};

export const setSessionObject = valuesObj => {
	for(let key in valuesObj) {
		setSession(key, valuesObj[key]);
	}
};

export const getSession = key => JSON.parse(window.sessionStorage.getItem(prefix + key));

export const getSessionObject = keysArr => {
	const data = {};
	for(let key in keysArr) {
		data[key] = getSession(key);
	}

	return data;
};

export const deleteSession = key => window.sessionStorage.removeItem(prefix + key);

export const deleteSessionLoop = keysArr => {
	for(let key in keysArr) {
		deleteSession(key);
	}
};