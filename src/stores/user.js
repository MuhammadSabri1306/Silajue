import { defineStore } from "pinia";
import http from "@/modules/http-common";

export const useUserStore = defineStore("user", {
	state: () => ({
		profile: {},
		role: 0,
		token: ""
	}),
	getters: {
		isRoleAdmin: (state) => state.token.length > 0 && state.role === 2,
		isRoleUser: (state) => state.token.length > 0 && state.role === 1,
		isRolePublic: (state) => state.token.length < 1 && state.role < 1
	},
	actions: {
		setRole(role) {
			this.role = role;
		},
		async login(email, password, callback = null) {
			try {

				const response = await http.post('/login', { email, password, role: "user" });
				
				this.token = response.data.success.token;
				this.role = (response.data.success.role === "admin") 2 : 1;
				this.profile.id = response.data.success.id;
				this.profile.name = response.data.success.name;

				callback && callback({ success: true });
			
			} catch(err) {

				console.error(err);
				callback && callback({ success: false, message: err.response.data.error });
			
			}
		},
		async register(name, email, password, address, callback = null) {
			const params = { name, email, password };
			if(address)
				params.address = address;
			
			try {

				const response = await http.post("/register", params);
				console.log(response);
				callback && callback({ success: true });
			
			} catch(err) {

				console.error(err);
				callback && callback({ success: false, message: err.response.data.error });

			}
		}
	}
});