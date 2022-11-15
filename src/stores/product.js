import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSampleProduct, getSampleCategories } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		categories: [],
		carts: [],
		currProduct: {},
		invoice: [
			{
			    "id": 3,
			    "name": "Buyung",
			    "price": 7500,
			    "type": "Sexing",
			    "category": "Simental",
			    "itemCount": 1,
			    "timestamp": 1668396679741,
			    "status": "Verifikasi"
			},
			{
			    "id": 3,
			    "name": "Buyung",
			    "price": 7500,
			    "type": "Sexing",
			    "category": "Simental",
			    "itemCount": 1,
			    "timestamp": 1668396679741,
			    "status": "Pengiriman"
			}
		]
	}),
	getters: {

		invoiceByTimeAsc: state => {
			if(!state.invoice)
				return [];
			return state.invoice.sort((a, b) => a.timestamp - b.timestamp);
		}
	
	},
	actions: {
		addToCart({ id, name, price, type, category, itemCount }) {
			this.carts.push({ id, name, price, type, category, itemCount });
			return true;
		},

		addToInvoice({ id, name, price, type, category, itemCount }) {
			const timestamp = Date.now();
			this.invoice.push({ id, name, price, type, category, itemCount, timestamp });
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