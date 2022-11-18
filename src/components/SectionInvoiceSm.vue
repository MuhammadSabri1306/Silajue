<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";

defineEmits(["verify"]);

const productStore = useProductStore();
const invoices = computed(() => {
	return productStore.invoiceByTimeAsc.map(item => {
		const date = new Date(item.timestamp);
		const dateTime = `${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() } ${ toTimeStr(date, ":").time }`;

		const total = item.price * item.itemCount;
		return { ...item, dateTime, total };
	});
});
</script>
<template>
	<section class="py-16">
		<div class="container">
			<h6 class="text-4xl font-bold mb-8">Invoice</h6>
		</div>
		<div class="bg-gray-100 py-8">
			<div class="w-full overflow-x-auto">
				<div class="flex pl-8">
					<div v-for="(item, index) in invoices" class="flex-[0_0_18rem]">
						<div class="bg-white relative rounded-2xl border shadow-sm mr-8">
							<div class="p-4 mb-2">
								<p class="text-gray-700 font-semibold text-sm">{{ item.dateTime }}</p>
							</div>
							<div class="px-8 pb-8">
								<h6 class="text-gray-900 text-2xl font-bold mb-4 mr-auto">{{ item.name }}</h6>
								<p class="text-gray-700 mb-2 text-sm">Tipe: <span class="font-semibold text-gray-900">{{ item.type }}</span></p>
								<p class="text-gray-700 mb-2 text-sm">Kategori: <span class="font-semibold text-gray-900">{{ item.category }}</span></p>
								<p class="text-gray-700 mb-2 text-sm">Harga: <span class="font-semibold text-gray-800">{{ formatIdr(item.price) }}</span></p>
								<p class="text-gray-700 mb-4">Jumlah: <span class="font-semibold text-gray-800">{{ item.itemCount }}</span></p>
								<p class="text-gray-700 mb-8">Total: <span class="font-semibold text-lg text-gray-800">{{ formatIdr(item.total) }}</span></p>
								<div v-if="item.status == 'Verifikasi'" class="flex justify-end">
									<button type="button" @click="$emit('verify', item.id)" class="text-white bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded">Verifikasi</button>
								</div>
							</div>
							<div class="absolute top-0 right-0">
								<span :class="{ 'bg-yellow-200': item.status == 'Verifikasi', 'bg-gray-300': item.status == 'Pengiriman', 'bg-green-300': item.status == 'Selesai' }" class="text-gray-900 text-sm font-medium px-2">{{ item.status }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>