import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { pushCart, getCart, setCart } from "@/modules/cart-cookie";
import { useUserStore } from "@/stores/user";
import { getSampleProduct, getSampleCategories } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		products: [],
		categories: [],
		carts: [],
		isSexing: true,
		currProduct: {},
		invoice: []
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
				this.carts = cartData;
		},

		addToCart({ itemCount, product }) {
			const data = { itemCount, ...product };
			pushCart(data);
			this.carts.push(data);
			return true;
		},

		deleteCartItem(itemsId) {
			const cartData = this.carts.filter(item => itemsId.indexOf(item.id) < 0);
			setCart(cartData);
			this.carts = cartData;
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

		async fetchInvoice(force = false, callback = null) {
			if(this.invoice.length > 0 && !force)
				return;

			const userStore = useUserStore();
			try {

				const headers = { "Authorization": "Bearer " + userStore.token };
				const response = await http.get("/invoice", { headers });
				const data = response.data.data;
				callback && callback();

				if(!data)
					return console.warn(response);
				this.invoice = data;

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