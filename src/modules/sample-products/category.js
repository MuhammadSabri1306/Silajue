const data = ["Limousin", "Simental", "Bali", "Kerbau Belang"];

export default data.map((item, index) => {
	const id = index + 1;
	const name = item;
	return { id, name };
});