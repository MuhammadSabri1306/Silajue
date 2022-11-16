import { defineStore } from "pinia";
import http from "@/modules/http-common";
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
	
		async fetchBlog() {
			try {

				const response = await getSamplePost();
				if(response.blog && response.blog.length > 0) {
					this.blogs = response.blog;
					return true;
				}
				return false;

			} catch(err) {
				console.error(err);
				return false;
			}
		},

		fetchBlogById: id => getSamplePost(id)
	
	}
});