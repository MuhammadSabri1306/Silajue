import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getCookie, setCookie, resetCookie } from "@/modules/apps-cookie";

export const useUserStore = defineStore("user", {
	state: () => ({
		profile: {
			name: "Muhammad Sabri",
			img: null
		},
		role: "user",
		token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWU3MTUwNDU0ZDk5Y2QwNGQwZGI1NzEwNTRiZjMzNGJmNDM4MTBmZTljYTYyY2MyZjY1M2NiOWZiNWRmZWY0YzE5MjZkNjljMTczNzZhNzIiLCJpYXQiOjE2NjY2NjE5ODMuOTEyNzY2LCJuYmYiOjE2NjY2NjE5ODMuOTEyNzY5LCJleHAiOjE2OTgxOTc5ODMuOTEwMDMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MlsQQo4p7MFmqRpv68COzID3TkKhI3tAHblIygvEJI2z_jGaF9NmkLArWHyzF7o2fCnkcM9oR9FwCSQJeSxzmuyb7lBmYNTYkzk4SZ3wgda8gFl3UQzTLHZf9DnlTjyru50KxKcbd0dE9smiSYWE2QQgycZsBVJkEaCgu0XI3HONFLMvJQte2R1rELrgCmUJ_KzvQuFYf2jgbuwQ20ItRP6miFAdbM3SDzZeeWqpl-RACmtxktVtCQco8vAjKgqahKjVaZMbP4mvMjHJ_7lKvKXVnTr7kpXWF33KTLqjv_Haswg6udjqylfpxNskH3OfnDnX9lyL_CXTnt5_GxpIjLdXTECXO2nylJxZ0LKRMDHnjz8vEFGuACagZOLqZbdsMH2qHNxQelSZGk-YUXjdBqct8AdFgJhJqiyUzX4s7ypa5v8vacdxdcF-141bqElHMG0K__uX7WR83gUAG3HwuRJ-MhmM0s_AMUlL1-q_0sCvkpkjVfYXnN8iS83xR-BkGQKUkjfpubZ4puZd8r1cqH54I2QiIeaiQc1x6bhwD2mxKpOLo8B4e9uoHUfctNZj0igSiEM830iQQlHvI_X7QldUhVDI2j429xc_DRfS5cIk1V46Sq6xf-t4fUTcQ7Mqotx6xbsr2K18xTfkx5n5uACdVMFhJaOd5JBVrH7XIqA",
		provinsiList: []
	}),
	getters: {
		isRoleAdmin: (state) => state.token.length > 0 && state.role === "admin",
		isRoleUser: (state) => state.token.length > 0 && state.role === "user",
		isRolePublic() {
			return !this.isRoleAdmin && !this.isRoleUser
		},
		getProvinsiList: state => {
			if(!Array.isArray(state.listProvinsi) || state.listProvinsi.length < 1) {
				return [];
			}

			return state.listProvinsi;
		}
	},
	actions: {
		async fetchProvinsi(force = false) {
			let provinsi = null;
			if(!force)
				provinsi = getCookie("provinsi");

			if(!Array.isArray(provinsi)) {
				try {

					const response = await http.get('/province');
					provinsi = response.data.data;
					setCookie("provinsi", provinsi);

				} catch(err) {
					console.error(err);
				}
			}

			if(Array.isArray(provinsi)) {
				provinsi.forEach(item => this.provinsiList.push(item));
			}
		},

		logout() {
			this.token = "";
			this.role = "";
			this.profile = {};
		},

		async login(email, password, callback = null) {
			try {

				const response = await http.post('/login', { email, password, role: "user" });
				
				this.token = response.data.success.token;
				this.role = (response.data.success.role === "admin") ? 2 : 1;
				this.profile.id = response.data.success.id;
				this.profile.name = response.data.success.name;

				callback && callback({ success: true });
			
			} catch(err) {

				console.error(err);
				callback && callback({ success: false, message: err.response.data.error });
			
			}
		},

		async register(name, email, password, address, callback = null) {
			const params = { name, email, password };
			if(address)
				params.address = address;
			
			try {

				const response = await http.post("/register", params);
				console.log(response);
				callback && callback({ success: true });
			
			} catch(err) {

				console.error(err);
				callback && callback({ success: false, message: err.response.data.error });

			}
		}
	}
});