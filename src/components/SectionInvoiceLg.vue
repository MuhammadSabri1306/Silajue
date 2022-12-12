<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";
import CardTable from "@/components/ui/CardTable.vue";

defineEmits(["verify", "showQrCode"]);
const productStore = useProductStore();

const invoices = computed(() => {
	return productStore.invoiceUserFormat;
});

const statusBgClass = {
	"selesai": "bg-gray-300",
	"aktif": "bg-green-300",
	"pengajuan verifikasi": "bg-yellow-200",
	"belum verifikasi": "bg-red-200"
};
</script>
<template>
	<section class="container py-16">
		<h6 class="text-4xl font-bold text-gray-900 mb-4">Invoice</h6>
		<CardTable class="mt-4">
			<template #thead>
				<tr>
					<th>Waktu</th>
					<th>Invoice</th>
					<th>Tagihan</th>
				</tr>
			</template>
			<template #tbody>
				<tr v-for="item in invoices">
					<td>{{ item.dateTime }}</td>
					<td>
						<p class=" mb-2">No. Invoice:<br><b class="text-lg">{{ item.noInvoice }}</b></p>
						<div class="flex items-center mb-6">
							<span class="mr-2">Status:</span>
							<span v-if="item.status != 'belum verifikasi'" :class="statusBgClass[item.status]" class="cursor-default capitalize">{{ item.status }}</span>
							<button v-else type="button" @click="$emit('verify', item.id)" class="bg-red-200 hover-margin capitalize">{{ item.status }}</button>
						</div>
						<div v-if="item.status == 'aktif'" class="flex">
							<button type="button" @click="$emit('showQrCode', item.noInvoice)" class="btn flex flex-col justify-center items-center gap-2 border border-green-200 transition-colors text-gray-500 bg-transparent hover:bg-green-200">
								<span>Tiket Pesanan: </span>
								<span class="text-4xl mb-2"><font-awesome-icon icon="fa-solid fa-qrcode" /></span>
							</button>
						</div>
					</td>
					<td>
						<ol class="text-xs list-decimal mb-4">
							<li v-for="productItem in item.product" class="capitalize mb-2"><b>{{ productItem.name }}</b>({{ productItem.category.type }}-{{ productItem.category.name }}) <b> X {{ productItem.itemCount }}</b></li>
						</ol>
						<p class="text-xs flex items-center gap-2">Total: <b class="text-lg font-bold text-gray-800">{{ formatIdr(item.totalPrice) }}</b></p>
					</td>
				</tr>
			</template>
		</CardTable>
	</section>
</template>
<style scoped>
	
.card-table td, .card-table th {
	@apply text-sm;
}

</style>