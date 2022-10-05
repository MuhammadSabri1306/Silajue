import { defineStore } from "pinia";
import { getSampleProduct } from "@/modules/sampleProduct";

export const useProductStore = defineStore("product", {
	state: () => ({
		product: []
	}),
	getters: {
		productById: (state) => {
			return (productId) => {
				// console.log(state.product);
				const result = (state.product.length < 1) ? {} : state.product.find(({ id }) => productId == id);
				return (!result) ? {} : result;
			}; 
		}
	},
	actions: {
		async fetchProduct() {
			const product = await getSampleProduct();
			product.forEach(item => {
				if(this.product.findIndex(({ id }) => id == item.id) < 0)
					this.product.push(item);
			});
		},

		async fetchProductById(productId) {
			const product = await getSampleProduct(productId);
			if(this.product.findIndex(({ id }) => id == item.id) < 0)
				this.product.push(product);
		}
	}
});