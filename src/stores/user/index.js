import { defineStore } from "pinia";
import { getCookie, setCookie, resetCookie } from "@/modules/apps-cookie";

export const useUserStore = defineStore("user", {
	state: () => ({
		profile: {},
		role: "admin",
		token: "sada"
	}),
	getters: {
		isRoleAdmin: (state) => state.token.length > 0 && state.role === "admin",
		isRoleUser: (state) => state.token.length > 0 && state.role === "user",
		isRolePublic() {
			return !this.isRoleAdmin && !this.isRoleUser
		}
	},
	actions: {

		logout() {
			this.token = "";
			this.role = "public";
			this.profile = {};
		},

		/*
		* @params Object params
		*/
		updateUser(params) {
			if(params.id)
				this.profile.id = params.id;
			if(params.name)
				this.profile.name = params.name;
			if(params.token)
				this.token = params.token;
			if(params.role)
				this.role = params.role;
		}
	}
});