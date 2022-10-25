import axios from "axios";

export default axios.create({
	baseURL: "https://silajue.taekwondosulsel.info/api",
	headers: {
		"Content-type": "application/json",
		"Accept": "application/json"
	}
});