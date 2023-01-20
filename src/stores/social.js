import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import http from "@/modules/http-common";

export const useSocialStore = defineStore("social", {
	state: () => ({
		social: null
	}),
	actions: {
		async fetchSocial(force = false, callback = null) {
			if(!force && this.social) {
				callback && callback(true);
				return;
			}
			try {
				const response = await http.get("/sosialmedia");
				let data = response.data.data;
				if(Array.isArray(data))
					data = data[0];

				if(!data) {
					console.warn(response.data);
					callback && callback(false);
					return;
				}

				this.social = {
					facebook: data.fb,
					instagram: data.inst,
					twitter: data.tw,
					whatsapp: data.wa,
					phoneNumber: data.no_hp
				};
				callback && callback(true);
			} catch(err) {
				console.error(err);
				callback && callback(false);
			}

			callback && callback();
		},

		async updateSocial(body, callback = null) {
			const userStore = useUserStore();
			const headers = { "Authorization": "Bearer " + userStore.token };
			try {
				const response = await http.put("/sosialmedia/1", body, { headers });
				if(response.data.success) {
					callback && callback(true);
					return;
				}
				console.warn(response.data);
				callback && callback(false);
			} catch(err) {
				console.error(err);
				callback && callback(false);
			}
		}
	}
});