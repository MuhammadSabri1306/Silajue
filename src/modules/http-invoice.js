import axios from "axios";

export default axios.create({
	baseURL: "https://silajue.taekwondosulsel.info",
	headers: { "Accept": "application/json" }
});