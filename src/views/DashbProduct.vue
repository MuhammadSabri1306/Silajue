<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { getSampleCategories } from "@/modules/sample-products";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import CardTable from "@/components/ui/CardTable.vue";
import SectionProductEdit from "@/components/SectionProductEdit.vue";

const productStore = useProductStore();
productStore.fetchCategories();
productStore.fetchProducts();

const categoryId = ref(null);
const isSexing = computed(() => productStore.isSexing);
const toggleSexing = () => productStore.setSexing(!isSexing.value);

const sexingCategories = computed(() => productStore.sexingCategories);
const unsexingCategories = computed(() => productStore.unsexingCategories);

const categories = computed(() => {
	const data = isSexing.value ? sexingCategories.value : unsexingCategories.value;
	const all = { id: -1, name: "semua" };
	return [ all, ...data ];
});

const products = computed(() => {
	return productStore.products
		.filter(item => {

			const typeFilter = isSexing.value && item.category.type == "sexing" || !isSexing.value && item.category.type == "unsexing";
			const categoryFilter = categoryId.value < 1 ? true : (item.category.id === categoryId.value);
			return typeFilter && categoryFilter;

		})
		.map((item, index) => {

			const no = index + 1;
			const cIndex = categories.value.findIndex(cItem => cItem.id == item.category);
			const categoryName = cIndex >= 0 ? categories.value[cIndex].name : null;

			return { no, categoryName, ...item };

		});
});

const router = useRouter();
const toEditPage = productId => router.push("/app/product/edit/" + productId);
</script>
<template>
	<DashbLayout :activeNav="1">
		<template #main>
			<div>
				<h3 class="page-title">Data Produk</h3>
				<section>
					<div class="flex gap-4 mb-8">
						<div class="input-group table-filter">
							<label class="mr-2 mb-0">Sexing</label>
							<SwitchToggle :value="isSexing" @toggle="toggleSexing" />
						</div>
						<div class="input-group table-filter">
							<label class="mr-2 mb-0">Kategori</label>
							<Dropdown v-if="categories.length > 0" :options="categories" :value="-1" labelKey="name" valueKey="id" @change="val => categoryId = val" />
						</div>
						<router-link to="/app/product/new" class="ml-auto px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">Tambah Produk</router-link>
					</div>
					<h6 v-if="products.length < 1" class="text-xl font-semibold text-gray-600 text-center">Belum ada produk.</h6>
					<CardTable v-else :hoverable="true">
						<template #thead>
							<tr>
								<th>No</th>
								<th>Produk</th>
								<th>Kategori</th>
								<th>Tipe</th>
								<th>Stok</th>
							</tr>
						</template>
						<template #tbody>
							<tr v-for="item in products" @click="toEditPage(item.id)">
								<td>{{ item.no }}</td>
								<td>{{ item.name }}</td>
								<td class="capitalize">{{ item.category.name }}</td>
								<td class="capitalize">{{ item.category.type }}</td>
								<td>{{ item.stock }}</td>
							</tr>
						</template>
					</CardTable>
				</section>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.table-filter {
	@apply flex items-center;
}

.table-filter label {
	@apply mb-0;
}

.section-edit {
	@apply overflow-y-hidden max-h-full border-b pb-8 mb-8;
}

.fade-enter-active,
.fade-leave-active {
	transition: max-height 0.3s, margin-bottom 0.3s, opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply max-h-0 mb-0 opacity-0;
}

.card-table td {
	@apply cursor-pointer;
}

.table-filter :deep(.dropdown-toggler),
.table-filter :deep(.dropdown-item) {
	@apply capitalize;
}

</style>