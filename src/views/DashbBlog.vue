<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBlogStore } from "@/stores/blog";
import { useDateId } from "@/modules/date-id";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";

const blogStore = useBlogStore();
blogStore.fetchBlog();

const blog = computed(() => blogStore.blogs);
const dataBlog = computed(() => {
	if(!Array.isArray(blog.value))
		return [];

	return blog.value.map((item, index) => {
		const date = new Date(item.created_at);
		const dateTime = `${ date.getFullYear() }/${ date.getMonth() }/${ date.getDate() }`;
		const no = index + 1;

		return { no, dateTime, ...item };
	});
});

const router = useRouter();
const toEditPage = id => router.push("/app/blog/edit/" + id);
</script>
<template>
	<DashbLayout :activeNav="4">
		<template #main>
			<div>
				<h3 class="page-title">Halaman Blog</h3>
				<div class="flex justify-end mb-8">
					<router-link to="/app/blog/new" class="ml-auto px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">Artikel Baru</router-link>
				</div>
				<CardTable :hoverable="true">
					<template #thead>
						<tr>
							<th>No</th>
							<th>Judul</th>
							<th>Tanggal</th>
						</tr>
					</template>
					<template #tbody>
						<tr v-for="item in dataBlog" @click="toEditPage(item.id)">
							<td>{{ item.no }}</td>
							<td>{{ item.title }}</td>
							<td>{{ item.dateTime }}</td>
						</tr>
					</template>
				</CardTable>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.card-table td {
	@apply cursor-pointer;
}

</style>