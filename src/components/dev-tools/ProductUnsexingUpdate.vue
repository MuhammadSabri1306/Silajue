<script setup>
import { ref, reactive, computed } from "vue";
import http from "@/modules/http-common";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const userStore = useUserStore();
const productStore = useProductStore();
productStore.fetchProducts();

const products = computed(() => productStore.products);
const sexingProducts = computed(() => products.value.filter(item => item.category.type == "sexing"));
const unsexingProducts = computed(() => products.value.filter(item => item.category.type == "unsexing"));

const updateProduct = async (id, body) => {
	console.log(id, body)
	if(!userStore.token) {
		console.warn("Undefined token:" + userStore.token);
		return;
	}

	const headers = { "Authorization": "Bearer " + userStore.token };
	const formData = new FormData();

	for(let key in body) {
		formData.append(key, body[key]);
	}

	try {
		const response = await http.post("/produk/" + id, formData, { headers });
		const isSuccess = response.data.success;

		if(!isSuccess || isSuccess === undefined) {
			console.warn(response.data);
			return;
		}

		alert("BERHASIL DIUPDATE");
		productStore.fetchProducts(true);
	}
	catch(err) {
		console.error(err);
	}
};

const getSexingIdByName = name => {
	const index = sexingProducts.value.findIndex(item => item.name == name);
	if(index < 0) {
		console.log(name, sexingProducts.value);
		return null;
	}

	return sexingProducts.value[index];
};

const confirmDialog = ref(null);
const updateTarget = reactive({
	source: null,
	target: null
});

const onUpdateClick = item => {
	const dest = JSON.parse(JSON.stringify(item));
	delete dest.image;

	const matchSexing = getSexingIdByName(dest.name);
	if(!matchSexing) {
		console.log("MATCHED SEXING NOT FOUND");
		return;
	}

	updateTarget.source = matchSexing.name;
	updateTarget.target = dest.name;

	confirmDialog.value.confirm()
		.then(confirm => {
			if(!confirm)
				return;

			dest.description = matchSexing.description;
			dest.code = matchSexing.code;
			dest.date_birth = matchSexing.date_birth;
			dest.sire = matchSexing.sire;
			dest.dam = matchSexing.dam;
			dest.straw_color = matchSexing.straw_color;
			console.log("TEST");
			updateProduct(dest.id, dest);
		})
		.catch(err => null);
};
</script>
<template>
	<div>
		<ul v-if="unsexingProducts.length > 0" class="fixed top-36 z-[2] gap-2 right-8 bg-white/80 flex flex-col max-h-[60vh] overflow-y-scroll">
			<li v-for="item in unsexingProducts">
				<button type="button" @click="onUpdateClick(item)" class="btn bg-gray-100 hover:bg-gray-300 border">{{ item.name }}</button>
			</li>
		</ul>
		<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
			<template #text>
				<p class="text-sm font-medium text-gray-700">Anda akan mengupdate Produk {{ updateTarget.target }} dari data {{ updateTarget.source }}. Lanjutkan?</p>
			</template>
			<template #btnConfirm="{ clicked }">
				<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Update Produk</button>
			</template>
		</ConfirmDialog>
	</div>
</template>