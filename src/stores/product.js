import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSampleProduct, getSampleCategories } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		categories: [],
		carts: [],
		currProduct: {}
	}),
	actions: {
		addToCart(id, name, price, itemCount) {
			this.carts.push({ id, name, price, itemCount });
			return true;
		},

		fetchProducts() {
			return getSampleProduct();
		},

		async fetchCategories() {
			try {

				// const response = await http.post('/login', { email, password, role: "user" });
				const response = await getSampleCategories();
				this.categories = response.categories;

			} catch(err) {
				console.error(err);
			}
		},

		async fetchCurrProduct(id) {
			try {

				// const response = await http.post('/login', { email, password, role: "user" });
				const response = await getSampleProduct(id);
				this.currProduct = response.product;

			} catch(err) {
				console.error(err);
			}
		}
	}
});