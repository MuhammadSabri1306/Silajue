<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import { formatIdr } from "@/modules/currency-format";
import { useDataForm } from "@/modules/data-form";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import ModalUploadProductImg from "@/components/ModalUploadProductImg.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const productStore = useProductStore();
productStore.fetchCategories();

const isLoaded = ref(false);
const showImgModal = ref(false);
const hasSubmitted = ref(false);
const route = useRoute();
const router = useRouter();

const imgSrc = ref(null);
const newImg = ref(null);
const newImgThumb = ref(null);
const showLoadingIcon = ref(false);

const productId = computed(() => route.params.id);
const { data, v$ } = useDataForm({
	name: { value: null, required },
	stock: { value: null, required },
	categoryId: { value: null, required },
	description: { value: null, required }
});

const initData = () => {

	http.get("/produk/" + productId.value)
		.then(response => {
			const dataProduct = response.data.data;

			data.name = dataProduct.name;
			imgSrc.value = dataProduct.image;
			data.stock = dataProduct.stock;
			data.categoryId = dataProduct.category.id;
			data.description = dataProduct.description;
			isLoaded.value = true;

			newImg.value = null;
			newImgThumb.value = null;

		})
		.catch(err => {
			console.error(err)
		});

};

if(!productId.value)
	isLoaded.value = true;
else
	initData();

const categories = computed(() => {
	return productStore.categories
		.map(item => {
			const title = `${ item.type } - ${ item.name }`;
			return { title, ...item };
		})
		.sort((a, b) =>{
			const x = a.type.toLowerCase();
			const y = b.type.toLowerCase();
			return (x < y) ? -1 : (x > y) ? 1 : 0;
		});
});

const textPrice = computed(() => {
	const index = categories.value.findIndex(item => item.id == data.categoryId);
	return index >= 0 ? categories.value[index].price : 0;
});

const changeImg = file => {
	newImg.value = file;
	showImgModal.value = false;

	const reader = new FileReader();
	reader.onload = event => newImgThumb.value = event.target.result;
	reader.readAsDataURL(newImg.value);
};

const getImgThumb = computed(() => newImgThumb.value || imgSrc.value);
const hasImg = computed(() => !imgSrc.value && !newImg.value ? false : true);

const getInvalidClass = key => {
	if(key == "img")
		return { 'invalid-img': hasSubmitted.value && !hasImg.value };
	return { 'invalid': hasSubmitted.value && v$.value[key].$invalid };
};

const userStore = useUserStore();
const viewStore = useViewStore();

const sendRequest = body => {
	const url = productId.value ? "/produk/" + productId.value : "/produk";
	const headers = { "Authorization": "Bearer " + userStore.token };

	const formData = new FormData();
	for(let key in body) {
		formData.append(key, body[key]);
	}

	showLoadingIcon.value = true;
	http.post(url, formData, { headers })
		.then(response => {
			viewStore.showToast("saveProduct", true);
			showLoadingIcon.value = false;

			if(!productId.value) {
				productStore.fetchProducts(true);
				router.push("/app/product");
			}
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("saveProduct", false);
			showLoadingIcon.value = false;
		});
};

const onSubmit = async () => {
	const isValid = await v$.value.$validate();
	hasSubmitted.value = true;

	if(!isValid || !hasImg.value)
		return;

	const reqBody = {
		name: data.name,
		code: "11522",
		stock: data.stock,
		category_id: data.categoryId,
		date_birth: "2022-11-12",
		sire: "10823-Bravo",
		dam: "PC 113",
		straw_color: "Merah",
		description: data.description
	};

	if(newImg.value)
		reqBody.image = newImg.value;
	sendRequest(reqBody);
};

const back = () => router.back();

const deleteProduct = () => {
	const url = "/produk/" + productId.value;
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.delete(url, { headers })
		.then(() => {
			productStore.fetchProducts(true);
			viewStore.showToast("deleteProduct", true);
			router.push("/app/product");
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("deleteProduct", false);
		});
};

const confirmDialog = ref(null);
const deleteConfirm = async () => {
	if(!productId.value)
		return;

	try {
		const confirm = await confirmDialog.value.confirm();
		confirm && deleteProduct();
	} catch(err) {
		console.log(err);
	}
};
</script>
<template>
	<DashbLayout :activeNav="1">
		<template #main>
			<div>
				<h3 class="page-title">Data Produk</h3>
				<div class="flex items-end mb-8">
					<button type="button" @click="back" class="btn-icon text-gray-600 rounded px-3 py-2 mr-auto transition-colors bg-white hover:bg-gray-100">
						<font-awesome-icon icon="fa-solid fa-arrow-left-long" fixed-width />
						<span class="text-sm ml-2">Kembali</span>
					</button>
					<button v-if="productId" type="button" @click="deleteConfirm" class="pl-2 pr-3 py-1 rounded text-red-100 border flex items-center justify-center transition-colors bg-red-500 hover:bg-red-600">
						<span class="text-lg"><font-awesome-icon icon="fa-solid fa-xmark" fixed-width /></span>
						<span class="text-xs font-semibold">Hapus</span>
					</button>
				</div>
				<form v-if="isLoaded" @submit.prevent="onSubmit" class="grid grid-cols-2 gap-4">
					<div class="flex justify-center items-start">
						<a role="button" v-if="getImgThumb" @click="showImgModal = true" :class="getInvalidClass('img')" class="rounded-xl border bg-gray-100 overflow-hidden block w-full relative group aspect-video">
							<BgImageAsync :src="getImgThumb" class="w-full h-full" />
							<div class="absolute w-full h-full top-0 left-0 bg-gray-300/90 flex transition-opacity opacity-0 group-hover:opacity-100">
								<span class="font-semibold text-gray-700 m-auto">Ganti</span>
							</div>
						</a>
						<a role="button" v-else @click="showImgModal = true" :class="getInvalidClass('img')" class="input-img">
							<span class=" m-auto">Upload Gambar Produk</span>
						</a>
					</div>
					<div class="px-8">
						<div class="input-group mb-8">
							<label for="inputName">Nama Produk</label>
							<input type="text" v-model="v$.name.$model" :class="getInvalidClass('name')" id="inputName">
						</div>
						<div class="input-group input-group-category grid grid-cols-1 mb-8">
							<label class="mr-2 mb-0">Kategori</label>
							<Dropdown v-if="categories.length > 0" :options="categories" :value="data.categoryId" labelKey="title" valueKey="id" @change="val => data.categoryId = val" :class="getInvalidClass('categoryId')" />
						</div>
						<div class="grid grid-cols-2 gap-4 mb-8">
							<div class="input-group">
								<label for="inputPrice">Harga (IDR)</label>
								<input type="number" :value="textPrice" id="inputPrice" readonly>
							</div>
							<div class="input-group">
								<label for="inputStock">Jumlah Stok</label>
								<input type="number" v-model="v$.stock.$model" :class="getInvalidClass('stock')" id="inputStock">
							</div>
						</div>
						<div class="input-group">
							<label for="textDescription">Deskripsi</label>
							<textarea v-model="v$.description.$model" :class="getInvalidClass('description')" id="textDescription" rows="4"></textarea>
						</div>
						<div class="flex justify-end items-center gap-8 px-4 pt-8">
							<button type="submit" :class="{ 'py-2': !showLoadingIcon, 'py-3': showLoadingIcon }" class="btn-icon rounded px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
								<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
								<span>Simpan</span>
							</button>
						</div>
					</div>
				</form>
				<ModalUploadProductImg v-if="showImgModal" @close="showImgModal = false" @change="changeImg" />
				<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
					<template #text>
						<p class="text-sm font-medium text-gray-700">Anda akan menghapus Produk. Lanjutkan?</p>
					</template>
					<template #btnConfirm="{ clicked }">
						<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Produk</button>
					</template>
				</ConfirmDialog>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.input-group-category :deep(.dropdown-toggler),
.input-group-category :deep(.dropdown-item) {
	@apply capitalize;
}

input:read-only {
	@apply cursor-default;
}

.input-img {
	@apply rounded-xl border bg-gray-100 flex justify-center items-center aspect-video w-full font-semibold text-gray-700 p-4 transition-colors bg-gray-100 hover:bg-gray-300;
}

.invalid,
.invalid-img,
.invalid :deep(.dropdown-toggler) {
	@apply border-red-400;
}

.invalid-img {
	@apply border-2;
}

</style>