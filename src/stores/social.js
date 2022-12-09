import { defineStore } from "pinia";
import http from "@/modules/http-common";

export const useSocialStore = defineStore("social", {
	state: () => ({
		social: null
	}),
	actions: {
		fetchSocial(force = false, callback = null) {
			this.social = {
				facebook: null,
				instagram: "https://www.instagram.com/disnakkeswan.sulsel/",
				twitter: null,
				whatsapp: "6282193142389",
				phoneNumber: "+6282193142389"
			};

			callback && callback();
		}
	}
});