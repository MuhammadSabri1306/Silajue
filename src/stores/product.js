import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { pushCart, getCart } from "@/modules/cart-cookie";
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
		},

		sexingCategories: state => {
			if(!state.categories)
				return [];
			return state.categories.filter(item => item.type == "sexing");
		},

		unsexingCategories: state => {
			if(!state.categories)
				return [];
			return state.categories.filter(item => item.type == "unsexing");
		}
	
	},
	actions: {
		readCartCookie() {
			const cartData = getCart();
			if(cartData)
				this.carts = cardData;
		},

		addToCart(data) {
			pushCart(data);
			this.carts.push(data);
			return true;
		},

		addToInvoice({ id, name, price, type, category, itemCount }) {
			const status = "Verifikasi";
			const timestamp = Date.now();
			this.invoice.push({ id, name, price, type, category, itemCount, timestamp, status });
		},

		async fetchProducts(force = false, callback = null) {
			if(this.products.length > 0 && !force)
				return;

			try {

				const response = await http.get("/produk");
				const data = response.data.data;

				if(!data)
					return console.warn(response);
				this.products = data;
				callback && callback();

			} catch(err) {
				console.error(err);
				callback && callback()
			}
		},

		async fetchCategories(force = false) {
			if(this.categories.length > 0 && !force)
				return;

			try {

				const response = await http.get("/category");
				const data = response.data.data;

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