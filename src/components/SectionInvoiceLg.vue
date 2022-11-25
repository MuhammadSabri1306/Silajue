<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";
import CardTable from "@/components/ui/CardTable.vue";

defineEmits(["verify"]);
const productStore = useProductStore();

const invoices = computed(() => {
	return productStore.invoice.map(item => {
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
						<span v-if="item.status == 'selesai'" class="bg-green-300 cursor-default capitalize">{{ item.status }}</span>
						<span v-if="item.status == 'pengiriman'" class="bg-gray-300 cursor-default capitalize">{{ item.status }}</span>
						<button v-if="item.status == 'verifikasi'" type="button" @click="$emit('verify', item.id)" class="bg-yellow-200 hover-margin capitalize">{{ item.status }}</button>
					</td>
					<td>
						<p class="text-xs mb-2">Produk: <b>{{ item.productName }}</b></p>
						<p class="text-xs mb-2 capitalize">Tipe: <b>{{ item.typeName }}</b></p>
						<p class="text-xs capitalize">Kategori: <b>{{ item.categoryName }}</b></p>
					</td>
					<td>
						<p class="text-xs mb-2">Jumlah: <b>{{ item.itemCount }}</b></p>
						<p class="text-xs mb-4">Harga: <b>{{ formatIdr(item.productPrice) }}</b></p>
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