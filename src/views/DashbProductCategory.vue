<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import { formatIdr } from "@/modules/currency-format";
import { useConfirm } from "primevue/useconfirm";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import CardTable from "@/components/ui/CardTable.vue";
import ModalProductCategory from "@/components/ModalProductCategory.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const userStore = useUserStore();
const viewStore = useViewStore();
const productStore = useProductStore();
productStore.fetchCategories();

const isSexing = ref(true);
const categories = computed(() => productStore.categories);

const data = computed(() => {
	return categories.value
		.filter(item => {
			if(isSexing.value)
				return item.type == "sexing";
			return item.type == "unsexing";
		})
		.map((item, index) => {
			const no = index + 1;
			
			let priceText = item.price || 0;
			priceText = formatIdr(priceText);

			return { no, priceText, ...item };
		});
});

const newCategoryForm = reactive({
	show: false,
	type: null
});

const showNewCategoryForm = () => {
	newCategoryForm.type = isSexing.value ? "sexing" : "unsexing";
	newCategoryForm.show = true;
};

const newCategory = ({ name, type, price }) => {
	const body = { name, type, price };
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.post("/category", body, { headers })
		.then(() => {
			productStore.fetchCategories(true);
			newCategoryForm.show = false;
			viewStore.showToast("saveCategory", true);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("saveCategory", false);
		});
};

const editCategoryForm = reactive({
	show: false,
	id: null,
	name: null,
	type: null,
	price: null
});

const showCategoryForm = categoryId => {
	const currCategory = productStore.categories.find(item => item.id == categoryId);
	if(!currCategory)
		return;

	editCategoryForm.id = categoryId;
	editCategoryForm.name = currCategory.name;
	editCategoryForm.type = currCategory.type;
	editCategoryForm.price = Number(currCategory.price);
	editCategoryForm.show = true;
};

const editCategory = ({ name, type, price }) => {
	const url = "/category/" + editCategoryForm.id;
	const body = { name, type, price };
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.put(url, body, { headers })
		.then(() => {
			productStore.fetchCategories(true);
			editCategoryForm.show = false;
			viewStore.showToast("saveCategory", true);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("saveCategory", false);
		});
};

const deleteCategory = productId => {
	const url = "/category/" + productId;
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.delete(url, { headers })
		.then(() => {
			productStore.fetchCategories(true);
			viewStore.showToast("deleteCategory", true);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("deleteCategory", false);
		});
};

const confirmDialog = ref(null);
const deleteConfirm = async (productId) => {
	try {
		const confirm = await confirmDialog.value.confirm();
		confirm && deleteCategory(productId);
	} catch(err) {
		console.log(err);
	}
};
</script>
<template>
	<DashbLayout :activeNav="2">
		<template #main>
			<div>
				<h3 class="page-title">Data Produk</h3>
				<section>
					<div class="flex items-center gap-4 mb-8">
						<div class="input-group table-filter">
							<label class="mr-2 mb-0">Sexing</label>
							<SwitchToggle :value="isSexing" @toggle="val => isSexing = val" />
						</div>
						<button type="button" @click="showNewCategoryForm" class="ml-auto px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">Buat Kategori</button>
					</div>
					<CardTable :hoverable="true">
						<template #thead>
							<tr>
								<th>No</th>
								<th>Kategori</th>
								<th>Tipe</th>
								<th>Harga</th>
								<th></th>
							</tr>
						</template>
						<template #tbody>
							<tr v-for="item in data" @click="showCategoryForm(item.id)" class="cursor-pointer">
								<td>{{ item.no }}</td>
								<td class="capitalize">{{ item.name }}</td>
								<td class="capitalize">{{ item.type }}</td>
								<td>{{ item.priceText }}</td>
								<td>
									<button type="button" @click.stop="deleteConfirm(item.id)" class="pl-2 pr-3 py-1 rounded text-red-100 border flex items-center justify-center transition-colors bg-red-500 hover:bg-red-600">
										<span class="text-lg"><font-awesome-icon icon="fa-solid fa-xmark" fixed-width /></span>
										<span class="text-xs font-semibold">Hapus</span>
									</button>
								</td>
							</tr>
						</template>
					</CardTable>
				</section>
				<ModalProductCategory v-if="newCategoryForm.show" @close="newCategoryForm.show = false" title="Kategori Baru" submitTitle="Buat" :type="newCategoryForm.type" @save="newCategory" />
				<ModalProductCategory v-if="editCategoryForm.show" @close="editCategoryForm.show = false" title="Ubah Kategori" submitTitle="Ubah" :name="editCategoryForm.name" :type="editCategoryForm.type" :price="editCategoryForm.price" @save="editCategory" />
				<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
					<template #text>
						<p class="text-sm font-medium text-gray-700">Anda akan menghapus Kategori. Lanjutkan?</p>
					</template>
					<template #btnConfirm="{ clicked }">
						<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Kategori</button>
					</template>
				</ConfirmDialog>
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

</style>