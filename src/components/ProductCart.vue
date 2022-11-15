<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { formatIdr } from "@/modules/currency-format";

const productStore = useProductStore();
const carts = computed(() => productStore.carts);

defineEmits(["hide"]);
const data = ref([]);
const disableSubmit = computed(() => data.value.length < 1);

const userStore = useUserStore();
const isRolePublic = computed(() => userStore.isRolePublic);

const router = useRouter();
const submitInvoice = () => {
	if(isRolePublic.value)
		return router.push("/login");

	data.value.forEach(productId => {
		const index = carts.value.findIndex(cartItem => cartItem.id === productId);
		if(index < 0)
			return;

		const { id, name, price, type, category, itemCount } = carts.value[index];
		productStore.addToInvoice({ id, name, price, type, category, itemCount });
	});

	router.push("/invoice");
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
			<div class="grid grid-cols-1 gap-4 mb-8">
				<div v-for="item in carts" class="border rounded-xl p-4 bg-white flex gap-2">
					<div class="pt-1">
						<input type="checkbox" v-model="data" :value="item.id" :id="'product'+item.id">
					</div>
					<div class="grow">
						<label :for="'product'+item.id" class="text-center block text-gray-900 text-lg font-bold mb-8">{{ item.name }}</label>
						<p class="text-gray-700 mb-2 text-xs font-medium">Tipe/Jenis: <span class="font-semibold text-gray-900">{{ item.type }} / {{ item.category }}</span></p>
						<p class="text-gray-700 mb-2 text-xs font-medium">Harga: <span class="font-semibold text-gray-800">{{ formatIdr(item.price) }}</span></p>
						<p class="text-gray-700 mb-4 text-xs font-medium">Jumlah: <span class="font-semibold text-gray-800">{{ item.itemCount }}</span></p>
						<p class="text-gray-700 text-xs font-medium">Total: <span class="font-semibold text-lg text-gray-800">{{ formatIdr(item.price * item.itemCount) }}</span></p>
					</div>
				</div>
			</div>
			<div>
				<button type="button" :disabled="disableSubmit" class="rounded-lg text-lg text-black px-4 py-2 block w-full hover-margin bg-green-500 hover:bg-green-400" @click="submitInvoice">Proses Pesanan</button>
			</div>
		</div>
	</div>
</template>