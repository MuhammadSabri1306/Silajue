import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
	state: () => ({
		showSidebar: false,
		sidebarWidth: "70vw"
	}),
	getters: {},
	actions: {
		toggleShowSidebar(show = null){
			if(show === null)
				this.showSidebar = !this.showSidebar;
			else
				this.showSidebar = show;
		}
	}
});