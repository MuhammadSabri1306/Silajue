import http from "@/modules/http-common";

export default {
	logout() {
		this.token = "";
		this.role = "";
		this.profile = {};
	},

	async login(email, password, callback = null) {
		try {

			const response = await http.post('/login', { email, password, role: "user" });
			
			this.token = response.data.success.token;
			this.role = (response.data.success.role === "admin") ? 2 : 1;
			this.profile.id = response.data.success.id;
			this.profile.name = response.data.success.name;

			callback && callback({ success: true });
		
		} catch(err) {

			console.error(err);
			callback && callback({ success: false, message: err.response.data.error });
		
		}
	},

	async register(data, callback = null) {
		try {

			const response = await http.post('/register', { ...data, role: "user" });
			const success = !response.data.error;
			callback && callback({ success });
		
		} catch(err) {

			console.error(err);
			callback && callback({ success: false, message: err.response.data.error });
		
		}
	}
};