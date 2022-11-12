<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const carts = computed(() => productStore.carts);

const numberWithDot = n => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

defineEmits(["hide"]);

const router = useRouter();
const toLoginPage = () => {
	router.push("/login");
};

/*
id, name, price, itemCount
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
			<h3 class="text-2xl text-black/80 font-bold mb-4">Keranjang Belanja</h3>
			<div class="grid grid-cols-1 gap-4">
				<div v-for="item in carts" class="border rounded-xl p-4 bg-white">
					<h6 class="text-center text-black/90 text-xl font-bold mb-8">{{ item.name }}</h6>
					<p class="text-black/70 mb-2 text-sm font-medium">Harga: <span class="font-semibold">Rp {{ numberWithDot(item.price) }}</span></p>
					<p class="text-black/70 mb-4 text-sm font-medium">Jumlah: <span class="font-semibold">{{ item.itemCount }}</span></p>
					<p class="text-black/70 mb-8 text-sm font-medium">Total: <span class="font-semibold text-lg text-black/90">Rp {{ numberWithDot(item.price * item.itemCount) }}</span></p>
					<div>
						<button type="button" class="rounded-lg text-lg text-black px-4 py-2 block w-full hover-margin bg-green-500 hover:bg-green-400" @click="toLoginPage">Lanjutkan</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>