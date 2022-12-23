import { defineStore } from "pinia";
import http from "@/modules/http-common";
import { pushCart, getCart, setCart } from "@/modules/cart-cookie";
import { useUserStore } from "@/stores/user";
import { formatInvoice } from "@/modules/invoice";
import { getSampleProduct, getSampleCategories } from "@/modules/sample-products";

export const useProductStore = defineStore("product", {
	state: () => ({
		products: [],
		categories: [],
		carts: [],
		isSexing: true,
		currProduct: {},
		invoice: [],
		invoiceUser: [],
		colors: {
			red: { bg: "bg-red-500", title: "Merah" },
			white: { bg: "bg-white", title: "Putih" },
			purple: { bg: "bg-purple-700", title: "Ungu" },
			pink: { bg: "bg-pink-500", title: "Merah Muda" }
		}
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
		},

		invoiceFormat: state => {
			if(!state.invoice)
				return [];
			return formatInvoice(state.invoice);
		},

		invoiceById(state) {
			const dataInvoices = this.invoiceFormat;

			return id => {
				if(!state.invoice)
					return [];
				const invoice = dataInvoices.find(item => item.id == id);
				return invoice === undefined ? null : invoice;
			};
		},

		invoiceUserFormat: state => {
			if(!state.invoiceUser)
				return [];
			return formatInvoice(state.invoiceUser);
		},

		invoiceUserById(state) {
			const dataInvoices = this.invoiceUserFormat;

			return id => {
				if(!state.invoice)
					return [];
				const invoice = dataInvoices.find(item => item.id == id);
				return invoice === undefined ? null : invoice;
			};
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

		deleteCartItem(itemId) {
			const cartData = this.carts.filter(item => item.id !== itemId);
			setCart(cartData);
			this.carts = cartData;
		},

		async fetchProducts(force = false, callback = null) {
			if(this.products.length > 0 && !force) {
				callback && callback();
				return;
			}

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

		async fetchCategories(force = false, callback = null) {
			if(this.categories.length > 0 && !force) {
				callback && callback();
				return;
			}

			try {

				const response = await http.get("/category");
				const data = response.data.data;

				if(!data)
					return console.warn(response);
				this.categories = data;
				callback && callback();

			} catch(err) {
				console.error(err);
			}
		},

		async fetchInvoice(force = false, callback = null) {
			if(this.invoice.length > 0 && !force) {
				callback && callback();
				return;
			}

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

		async fetchInvoiceUser(force = false, callback = null) {
			if(this.invoice.length > 0 && !force) {
				callback && callback();
				return;
			}

			const userStore = useUserStore();
			try {

				const headers = { "Authorization": "Bearer " + userStore.token };
				const response = await http.get("/invoice/user", { headers });
				const data = response.data.data;
				callback && callback();

				if(!data)
					return console.warn(response);
				this.invoiceUser = data;

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