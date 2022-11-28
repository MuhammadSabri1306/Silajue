<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";
import CardTable from "@/components/ui/CardTable.vue";

defineEmits(["verify"]);
const productStore = useProductStore();

const invoices = computed(() => {
	console.log(productStore.invoiceUserFormat)
	return productStore.invoiceUserFormat;
});
</script>
<template>
	<section class="container py-16">
		<h6 class="text-4xl font-bold text-gray-900 mb-4">Invoice</h6>
		<CardTable class="mt-4">
			<template #thead>
				<tr>
					<th>Waktu</th>
					<th>Status</th>
					<th>No. Invoice</th>
					<th>Tagihan</th>
					<th></th>
				</tr>
			</template>
			<template #tbody>
				<tr v-for="item in invoices">
					<td>{{ item.dateTime }}</td>
					<td>
						<span v-if="item.status == 'selesai'" class="bg-green-300 cursor-default capitalize">{{ item.status }}</span>
						<span v-if="item.status == 'pengiriman'" class="bg-gray-300 cursor-default capitalize">{{ item.status }}</span>
						<button v-if="item.status == 'verifikasi'" type="button" @click="$emit('verify', item.id)" class="bg-yellow-200 hover-margin capitalize">{{ item.status }}</button>
					</td>
					<td>
						<p>{{ item.noInvoice }}</p>
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