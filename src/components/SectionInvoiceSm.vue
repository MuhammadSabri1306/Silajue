<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";

defineEmits(["verify"]);
const productStore = useProductStore();

const invoices = computed(() => {
	return productStore.invoiceUser.map(item => {
		const date = new Date(item.created_at);
		const dateTime = `${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() } ${ toTimeStr(date, ":").time }`;

		return {
			dateTime,
			id: item.id,
			status: item.status,
			productName: item.produk.name,
			typeName: item.produk.category.type,
			categoryName: item.produk.category.name,
			itemCount: item.item_count,
			productPrice: item.produk.category.price,
			totalPrice: item.total_price,
		};
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
								<h6 class="text-gray-900 text-2xl font-bold mb-4 mr-auto">{{ item.noInvoice }}</h6>
								<p class="text-gray-700 mb-8">Total: <span class="font-semibold text-lg text-gray-800">{{ formatIdr(item.totalPrice) }}</span></p>
								<h6 class="text-gray-900 text-2xl font-bold mb-4 mr-auto">Produk</h6>
								<ol class="text-xs list-decimal mb-8">
									<li v-for="productItem in item.product" class="capitalize mb-2"><b>{{ productItem.name }}</b>({{ productItem.category.type }}-{{ productItem.category.name }}) <b> X {{ productItem.itemCount }}</b></li>
								</ol>
								<div v-if="item.status == 'verifikasi'" class="flex justify-end">
									<button type="button" @click="$emit('verify', item.id)" class="text-white bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded">Verifikasi</button>
								</div>
							</div>
							<div class="absolute top-0 right-0">
								<span :class="{ 'bg-yellow-200': item.status == 'verifikasi', 'bg-gray-300': item.status == 'pengiriman', 'bg-green-300': item.status == 'selesai' }" class="text-gray-900 text-sm font-medium px-2 capitalize">{{ item.status }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>