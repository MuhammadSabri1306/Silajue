import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		role: 2
	}),
	getters: {
		isRoleAdmin: (state) => state.role === 2,
		isRoleUser: (state) => state.role === 1,
		isRolePublic: (state) => state.role === 0
	},
	actions: {
		setRole(role) {
			this.role = role;
		}
	}
});