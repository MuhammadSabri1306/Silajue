import { defineStore } from "pinia";
import toastContent from "@/modules/toast-content";

export const useViewStore = defineStore("view", {
	state: () => ({
		showSidebar: false,
		sidebarWidth: "70vw",
		toastContent: null
	}),
	getters: {},
	actions: {
		toggleShowSidebar(show = null){
			if(show === null)
				this.showSidebar = !this.showSidebar;
			else
				this.showSidebar = show;
		},

		showToast(type, success) {
			if(!toastContent[type])
				return console.warn("modules/toast: unknown type of toast.", type, toastContent);
			
			const status = success ? "success" : "error";
			if(!toastContent[type][status])
				return console.warn("modules/toast: unknown status of toast.");

			this.toastContent = toastContent[type][status];
		}
	}
});