import { defineStore } from "pinia";
import http from "@/modules/http-common";

export const useFeedbackStore = defineStore("feedback", {
	state: () => ({
		appExp: null
	}),
	getters: {},
	actions: {
		fetchAppExp(force = false, callback = null){
			if(!force && this.appExp.length > 0) {
				callback && callback();
				return;
			}

			http.get("/feedback")
				.then(response => {
					const data = response.data.data;
					if(!data) {
						console.log(response.data);
						callback && callback(false);
					}

					this.appExp = data;
					callback && callback(true);
				})
				.catch(err => {
					console.error(err);
					callback && callback(false);
				});
		}
	}
});