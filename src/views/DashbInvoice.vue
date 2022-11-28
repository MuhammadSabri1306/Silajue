<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";

const productStore = useProductStore();
productStore.fetchInvoice();

const invoices = computed(() => productStore.invoiceFormat);

const statusBgClass = {
	"selesai": "bg-green-300",
	"pengiriman": "bg-gray-300",
	"pengajuan verifikasi": "bg-yellow-200",
	"belum verifikasi": "bg-red-200"
};

const router = useRouter();
const toEditPage = id => router.push("/app/invoice/" + id);
</script>
<template>
	<DashbLayout :activeNav="3">
		<template #main>
			<div>
				<h3 class="page-title">Invoice</h3>
				<p v-if="invoices.length < 1" class="text-xl font-semibold text-gray-600 text-center">Belum ada invoice.</p>
				<CardTable v-else :hoverable="true">
					<template #thead>
						<tr>
							<th>Waktu</th>
							<th>Invoice</th>
							<th>Customer</th>
						</tr>
					</template>
					<template #tbody>
						<tr v-for="item in invoices" @click="toEditPage(item.id)">
							<td>{{ item.dateTime }}</td>
							<td>
								<p class="mb-6">No. Invoice<br><b class="text-lg">{{ item.noInvoice }}</b></p>
								<p>Status: <span :class="statusBgClass[item.status]" class="cursor-default capitalize">{{ item.status }}</span>
								</p>
							</td>
							<td>
								<p class="font-bold">{{ item.userName }}</p>
								<p class="mb-6">{{ item.userAddress.full }}</p>
								<p>{{ item.userPhoneNumber }}</p>
								<p>{{ item.userEmail }}</p>
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

.card-table td {
	@apply cursor-pointer;
}

</style>