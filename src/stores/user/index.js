import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSession, setSession, deleteSession } from "@/modules/session";

export const useUserStore = defineStore("user", {
	state: () => ({
		profile: {},
		role: "",
		token: ""
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
			this.role = "";
			this.profile = {};
			deleteSession("user");
		},

		/*
		* @params Object params
		*/
		updateUser(params, saveLocally = true) {
			if(params.id)
				this.profile.id = params.id;
			if(params.name)
				this.profile.name = params.name;
			if(params.avatar)
				this.profile.avatar = params.avatar;
			if(params.token)
				this.token = params.token;
			if(params.role)
				this.role = params.role;

			if(saveLocally)
				setSession("user", params);
		},

		checkUserCookie() {
			const dataUser = getSession("user");
			dataUser && this.updateUser(dataUser, false);
		}
	}
});