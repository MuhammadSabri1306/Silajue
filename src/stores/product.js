import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { getSampleProduct, getSampleCategories } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		products: [],
		categories: [],
		carts: [],
		isSexing: true,
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
			    "status": "Pengiriman"
			},
			{
			    "id": 3,
			    "name": "Buyung",
			    "price": 7500,
			    "type": "Sexing",
			    "category": "Simental",
			    "itemCount": 1,
			    "timestamp": 1668396679741,
			    "status": "Selesai"
			}
		]
	}),
	getters: {

		productById: state => {
			return id => {
				const index = state.products.findIndex(item => item.id == id);
				return index >= 0 ? state.products[index] : {};
			}
		},

		invoiceByTimeAsc: state => {
			if(!state.invoice)
				return [];
			return state.invoice.sort((a, b) => b.timestamp - a.timestamp);
		}
	
	},
	actions: {
		addToCart({ id, name, price, type, category, itemCount }) {
			this.carts.push({ id, name, price, type, category, itemCount });
			return true;
		},

		addToInvoice({ id, name, price, type, category, itemCount }) {
			const status = "Verifikasi";
			const timestamp = Date.now();
			this.invoice.push({ id, name, price, type, category, itemCount, timestamp, status });
		},

		async fetchProducts(force = false) {
			if(this.products.length > 0 && !force)
				return;

			try {

				const response = await getSampleProduct();
				const data = response.products;

				if(!data)
					return console.warn(response);
				this.products = data;

			} catch(err) {
				console.error(err);
			}
		},

		async fetchCategories(force = false) {
			if(this.categories.length > 0 && !force)
				return;

			try {

				const response = await getSampleCategories();
				const data = response.categories;

				if(!data)
					return console.warn(response);
				this.categories = data;

			} catch(err) {
				console.error(err);
			}
		},

		setSexing(isSexing) {
			this.isSexing = isSexing;
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