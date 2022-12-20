import { defineStore } from "pinia";
import { useProductStore } from "@/stores/product";
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
		isRoleOperator: (state) => state.token.length > 0 && state.role === "operator",
		isRoleUser: (state) => state.token.length > 0 && state.role === "user",
		isRolePublic(state) {
			return !this.isRoleAdmin && !this.isRoleOperator && !this.isRoleUser;
		}
	},
	actions: {

		logout() {
			deleteSession("user");
			this.$reset();

			const productStore = useProductStore();
			productStore.$reset();
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

			if(saveLocally) {
				setSession("user", {
					id: this.profile.id,
					name: this.profile.name,
					avatar: this.profile.avatar,
					token: this.token,
					role: this.role
				});
			}
		},

		checkUserCookie() {
			const dataUser = getSession("user");
			dataUser && this.updateUser(dataUser, false);
		}
	}
});