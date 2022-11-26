import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { useUserStore } from "@/stores/user";
import { getSamplePost } from "@/modules/sample-products";

export const useBlogStore = defineStore("blog", {
	state: () => ({
		blogs: []
	}),
	getters: {

		blogById: state => {
			return id => {
				if(!state.blogs || state.blogs.length < 1)
					return null;
				return state.blogs.find(item => item.id == id);
			};
		}
	
	},
	actions: {

		pushBlog(...blogs) {
			blogs.forEach(item => this.blogs.push(item));
		},
	
		async fetchBlog(force = false, callback = null) {
			if(this.blogs.length > 0 && !force) {
				callback && callback();
				return;
			}

			const userStore = useUserStore();
			const headers = { "Authorization": "Bearer " + userStore.token };

			try {

				const response = await http.get("/blog", { headers });
				const data = response.data.data.data;
				if(!data) {
					console.warn(data);
					return;
				}

				this.blogs = data;
				callback && callback();

			} catch(err) {
				console.error(err);
			}
		},

		fetchBlogById: id => getSamplePost(id)
	
	}
});