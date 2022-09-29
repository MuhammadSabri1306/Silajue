import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
	state: () => ({
		showBackdrop: false
	}),
	getters: {},
	actions: {
		toggleShowBackdrop(show = null){
			if(show === null)
				this.showBackdrop = !this.showBackdrop;
			else
				this.showBackdrop = show;
		}
	}
});