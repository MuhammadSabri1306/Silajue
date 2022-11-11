import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSampleProduct } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		categories: ["sapi", "kambing", "domba", "bebek", "ayam", "ikan"],
		carts: [
			{
				id: 0,
				name: "Sapi 1",
				price: 123000000,
				itemCount: 3
			}
		],
		currProduct: {}
	}),
	actions: {
		addToCart(id, name, price, itemCount) {
			this.carts.push({ id, name, price, itemCount });
			return true;
		},

		fetchProducts(callback = null) {
			return getSampleProduct();
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