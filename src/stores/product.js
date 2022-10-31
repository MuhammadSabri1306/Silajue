import { defineStore } from "pinia";

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
		]
	}),
	actions: {
		addToCart(id, name, price, itemCount) {
			this.carts.push({ id, name, price, itemCount });
			return true;
		}
	}
});