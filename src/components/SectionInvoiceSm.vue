<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";

defineEmits(["verify"]);
const productStore = useProductStore();

const invoices = computed(() => {
	return productStore.invoiceUserFormat;
});

const statusBgClass = {
	"selesai": "bg-green-300",
	"pengiriman": "bg-gray-300",
	"pengajuan verifikasi": "bg-yellow-200",
	"belum verifikasi": "bg-red-200"
};
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
							<div class="flex justify-end">
								<span :class="statusBgClass[item.status]" class="text-gray-900 text-sm font-medium px-2 capitalize">{{ item.status }}</span>
							</div>
							<div class="p-4 mb-2">
								<p class="text-gray-500 font-semibold text-xs text-right">{{ item.dateTime }}</p>
							</div>
							<div class="px-8 pb-8">
								<p class="text-gray-700 font-bold text-xs text-center">NO. INVOICE</p>
								<h6 class="text-gray-700 font-bold mb-8 text-center">{{ item.noInvoice }}</h6>
								<h6 class="text-gray-700 text-lg font-bold mb-4">Produk</h6>
								<ol class="text-xs text-gray-600 list-decimal mb-4 ml-4">
									<li v-for="productItem in item.product" class="capitalize mb-2"><b>{{ productItem.name }}</b>({{ productItem.category.type }}-{{ productItem.category.name }}) <b> X {{ productItem.itemCount }}</b></li>
								</ol>
								<p class="text-gray-700 mb-8">Total: <span class="font-semibold text-lg text-gray-800">{{ formatIdr(item.totalPrice) }}</span></p>
								<div v-if="item.status == 'belum verifikasi'" class="flex justify-end">
									<button type="button" @click="$emit('verify', item.id)" class="text-white bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded">Verifikasi</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>