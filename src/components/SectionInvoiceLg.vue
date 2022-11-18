<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";
import CardTable from "@/components/ui/CardTable.vue";

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
	<section class="container py-16">
		<h6 class="text-4xl font-bold text-gray-900 mb-4">Invoice</h6>
		<CardTable class="mt-4">
			<template #thead>
				<tr>
					<th>Waktu</th>
					<th>Status</th>
					<th>Produk</th>
					<th>Tagihan</th>
					<th></th>
				</tr>
			</template>
			<template #tbody>
				<tr v-for="item in invoices">
					<td>{{ item.dateTime }}</td>
					<td>
						<span v-if="item.status == 'Selesai'" class="bg-green-300 cursor-default">{{ item.status }}</span>
						<span v-if="item.status == 'Pengiriman'" class="bg-gray-300 cursor-default">{{ item.status }}</span>
						<button v-if="item.status == 'Verifikasi'" type="button" @click="$emit('verify', item.id)" class="bg-yellow-200 hover-margin">{{ item.status }}</button>
					</td>
					<td>
						<p class="text-xs mb-2">Nama: <b>{{ item.name }}</b></p>
						<p class="text-xs mb-2">Tipe: <b>{{ item.type }}</b></p>
						<p class="text-xs">Kategori: <b>{{ item.category }}</b></p>
					</td>
					<td>
						<p class="text-xs mb-2">Jumlah: <b>{{ item.itemCount }}</b></p>
						<p class="text-xs mb-4">Harga: <b>{{ formatIdr(item.price) }}</b></p>
						<p class="text-xs flex items-center gap-2">Total: <b class="text-lg font-bold text-gray-800">{{ formatIdr(item.total) }}</b></p>
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