<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";

const userStore = useUserStore();
const viewStore = useViewStore();

const data = ref(null);
const dataUser = computed(() => {
	if(!Array.isArray(data.value))
		return [];
	return data.value.map((item, index) => {
		const no = index + 1;
		const status = !item.identity_card ? "Belum Verifikasi" : "Terverifikasi";
		return { no, status, ...item };
	})
})

const fetchDataUser = () => {
	const headers = { "Authorization": "Bearer " + userStore.token };
	http.get("/user/all", { headers })
		.then(response => {
			if(!response.data.data) {
				viewStore.showToast("fetchData", false);
				console.log(response.data);
				return;
			}

			data.value = response.data.data;
			console.log(data.value);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("fetchData", false);
		});
};

fetchDataUser();
</script>
<template>
	<DashbLayout :activeNav="5">
		<template #main>
			<div>
				<h3 class="page-title">Data Pengguna</h3>
				<CardTable v-if="dataUser.length > 0" :hoverable="true">
					<template #thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Email</th>
							<th>Status</th>
						</tr>
					</template>
					<template #tbody>
						<tr v-for="item in dataUser">
							<td>{{ item.no }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ item.status }}</td>
						</tr>
					</template>
				</CardTable>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.card-table td {
	@apply text-sm font-normal;
}

</style>