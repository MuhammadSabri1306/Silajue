<script setup>
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import { formatIdr } from "@/modules/currency-format";
import http from "@/modules/http-common";
import { createInvoiceCode } from "@/modules/invoice";

const productStore = useProductStore();
productStore.readCartCookie();
const carts = computed(() => productStore.carts);

defineEmits(["hide"]);
const data = reactive([]);
const disableSubmit = computed(() => data.length < 1);

const userStore = useUserStore();
const isRolePublic = computed(() => userStore.isRolePublic);
const router = useRouter();
const route = useRoute();
const viewStore = useViewStore();

const removeItem = itemId => {
	productStore.deleteCartItem(itemId);
};

const newInvoice = (dataInvoice, totalPrice) => {
	const headers = { "Authorization": "Bearer " + userStore.token };
	const body = {
		"no_invoice": createInvoiceCode(userStore.profile.id),
		"total_price": totalPrice,
		"produk": dataInvoice
	};

	http.post("/invoice", body, { headers })
		.then(() => {
			viewStore.showToast("addInvoice", true);
			router.push("/invoice");
			data.forEach(itemId => removeItem(itemId));
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("addInvoice", false);
		});
};

const submitInvoice = () => {
	if(isRolePublic.value) {
		const currPath = route.fullPath;
		return router.push({ path: "/login", query: { redirect: currPath } });
	}

	let totalPrice = 0;
	const productInvoice = data
		.map(productId => {
			const index = carts.value.findIndex(cartItem => cartItem.id === productId);
			if(index < 0)
				return null;

			const { id, itemCount, category } = carts.value[index];
			totalPrice += (category.price * itemCount);
			return {
				item_count: itemCount,
				produk_id: id
			};
		})
		.filter(item => item !== null);
	// console.log(dataInvoice);
	newInvoice(productInvoice, totalPrice);
};

const toggleData = productId => {
	const index = data.indexOf(productId);
	if(index < 0)
		data.push(productId);
	else
		data.splice(index, 1);
};

const formatPrice = item => {
	if(!item.category)
		return formatIdr(0);
	return formatIdr(item.category.price);
};

const formatTotalPrice = item => {
	if(!item.category || !item.itemCount)
		return formatIdr(0);
	return formatIdr(item.itemCount * item.category.price);
};


/*
 * { id, name, price, type, category, itemCount }
*/
</script>
<template>
	<div class="p-8">
		<div class="mb-8">
			<button type="button" @click="$emit('hide')" class="flex justify-center items-center rounded px-3 py-2 bg-white text-black/80 hover:text-black -ml-3">
				<font-awesome-icon icon="fa-solid fa-angle-left" />
				<span class="ml-2 text-xs">Kembali</span>
			</button>
		</div>
		<div class="overflow-y-auto">
			<h3 class="text-2xl text-gray-900 font-bold mb-4">Keranjang Belanja</h3>
			<p v-if="carts.length < 1" class="font-semibold text-gray-500 text-center my-16">Belum ada produk yang ditambahkan.</p>
			<div v-else class="grid grid-cols-1 gap-4 mb-8">
				<div v-for="item in carts" class="border rounded-xl p-4 bg-white flex gap-2 relative">
					<div class="pt-1">
						<input type="checkbox" v-model="data" :value="item.id" :id="'product'+item.id">
					</div>
					<div class="grow">
						<label :for="'product'+item.id" class="text-center block text-gray-900 text-lg font-bold mb-8">{{ item.name }}</label>
						<p class="text-gray-700 mb-2 text-xs font-medium">Tipe/Jenis: <span class="font-semibold text-gray-900 capitalize">{{ item.category.type }} / {{ item.category.name }}</span></p>
						<p class="text-gray-700 mb-2 text-xs font-medium">Harga: <span class="font-semibold text-gray-800">{{ formatPrice(item) }}</span></p>
						<p class="text-gray-700 mb-4 text-xs font-medium">Jumlah: <span class="font-semibold text-gray-800">{{ item.itemCount }}</span></p>
						<p class="text-gray-700 text-xs font-medium">Total: <span class="font-semibold text-lg text-gray-800">{{ formatTotalPrice(item) }}</span></p>
					</div>
					<a role="button" @click="toggleData(item.id)" class="absolute left-0 top-0 w-full h-full"></a>
					<a role="button" @click="removeItem(item.id)" class="absolute right-0 top-0 p-4 text-xs transition-colors text-gray-500 hover:text-red-700">
						<font-awesome-icon icon="fa-solid fa-x" fixed-width />
					</a>
				</div>
			</div>
			<div>
				<button type="button" :disabled="disableSubmit" class="rounded-lg text-lg text-black px-4 py-2 block w-full enabled:hover-margin bg-green-500 enabled:hover:bg-green-400" @click="submitInvoice">Proses Pesanan</button>
			</div>
		</div>
	</div>
</template>