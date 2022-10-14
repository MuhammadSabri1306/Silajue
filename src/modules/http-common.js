import axios from "axios";

export default axios.create({
	baseURL: "http://silajue.taekwondosulsel.info/api",
	headers: {
		"Content-type": "application/json",
		"Accept": "application/json"
	}
});