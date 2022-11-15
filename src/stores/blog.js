import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSamplePost } from "@/modules/sample-products";

export const useBlogStore = defineStore("blog", {
	state: () => ({
		blogs: []
	}),
	actions: {
		async fetchBlog() {
			try {

				const response = await getSamplePost();
				if(response.blog && response.blog.length > 0)
					this.blogs = response.blog;

			} catch(err) {
				console.error(err);
			}
		}
	}
});