<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/product";
import { toTimeStr } from "@/modules/date-id";
import { formatIdr } from "@/modules/currency-format";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";

const productStore = useProductStore();
productStore.fetchInvoice();

const invoices = computed(() => {
	return productStore.invoice.map(item => {
		const date = new Date(item.created_at);
		const dateTime = `${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() } ${ toTimeStr(date, ":").time }`;

		return {
			dateTime,
			id: item.id,
			status: item.status,
			transferNote: item.proof_payment,
			userName: item.user.name,
			userAddress: item.user.address,
			userVillageId: item.user.village_id,
			userPhoneNumber: item.user.phone_number,
			userEmail: item.user.email,
			userIdCard: item.user.identity_card,
			productName: item.produk.name,
			typeName: item.produk.category.type,
			categoryName: item.produk.category.name,
			itemCount: item.item_count,
			productPrice: item.produk.category.price,
			totalPrice: item.total_price,
		};
	});
});

const statusBgClass = {
	"selesai": "bg-green-300",
	"pengiriman": "bg-gray-300",
	"verifikasi": "bg-yellow-200"
};
</script>
<template>
	<DashbLayout :activeNav="3">
		<template #main>
			<div>
				<h3 class="page-title">Invoice</h3>
				<CardTable v-if="invoices.length > 0">
					<template #thead>
						<tr>
							<th>Waktu</th>
							<th>Status</th>
							<th>Customer</th>
							<th>Produk</th>
							<th>Tagihan</th>
							<th></th>
						</tr>
					</template>
					<template #tbody>
						<tr v-for="item in invoices">
							<td>{{ item.dateTime }}</td>
							<td>
								<p>
									<span :class="statusBgClass[item.status]" class="cursor-default capitalize">{{ item.status }}</span>
								</p>
							</td>
							<td>
								<p class="font-bold mb-2">{{ item.userName }}</p>
								<p class="mb-6">{{ item.userAddress }}</p>
								<p class="mb-2">{{ item.userPhoneNumber }}</p>
								<p class="mb-2">{{ item.userEmail }}</p>
							</td>
							<td>
								<p class="text-xs mb-2">Produk: <b>{{ item.productName }}</b></p>
								<p class="text-xs mb-2 capitalize">Tipe: <b>{{ item.typeName }}</b></p>
								<p class="text-xs capitalize">Kategori: <b>{{ item.categoryName }}</b></p>
							</td>
							<td>
								<p class="text-xs mb-2">Jumlah: <b>{{ item.itemCount }}</b></p>
								<p class="text-xs mb-4">Harga: <b>{{ formatIdr(item.productPrice) }}</b></p>
								<p class="text-xs flex items-center gap-2">Total: <b class="text-base font-bold text-gray-800">{{ formatIdr(item.totalPrice) }}</b></p>
							</td>
						</tr>
					</template>
				</CardTable>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.card-table {
	@apply text-xs;
}

</style>