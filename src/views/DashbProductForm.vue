<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { required } from "@vuelidate/validators";
import { useProductStore } from "@/stores/product";
import { useViewStore } from "@/stores/view";
import { formatIdr } from "@/modules/currency-format";
import { useDataForm } from "@/modules/data-form";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import ModalUploadProductImg from "@/components/ModalUploadProductImg.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";

const productStore = useProductStore();
productStore.fetchCategories();
productStore.fetchProducts();

const isLoaded = ref(false);
const showImgModal = ref(false);

const route = useRoute();
const productId = computed(() => route.params.id);

const { data, v$ } = useDataForm({
	name: { value: null, required },
	img: { value: null, required },
	stock: { value: null, required },
	category: { value: null, required },
	price: { value: 0, required },
	type: { value: "Sexing", required },
	description: { value: null, required }
});

if(!productId.value)
	isLoaded.value = true;

watch(() => productStore.products, () => {
	console.log(productId.value);
	if(!productId.value)
		return;

	const product = productStore.productById(productId.value);
	data.name = product.name;
	data.img = product.img;
	data.stock = product.stock;
	data.category = product.category;
	data.price = product.price;
	data.type = product.type;
	data.description = product.description;

	isLoaded.value = true;
});

const textPrice = computed(() => formatIdr(data.price));
const categories = computed(() => productStore.categories);

const onSexingToggle = isSexing => {
	if(isSexing)
		data.type = "Sexing";
	else
		data.type = "Unsexing";
};
</script>
<template>
	<DashbLayout>
		<template #main>
			<div>
				<h3 class="page-title">Data Produk</h3>
				<div v-if="isLoaded" class="grid grid-cols-2 gap-4">
					<div class="flex justify-center items-start">
						<a role="button" v-if="data.img" @click="showImgModal = true" class="rounded-xl border bg-gray-100 overflow-hidden block w-full relative group aspect-video">
							<BgImageAsync :src="data.img" class="w-full h-full" />
							<div class="absolute w-full h-full top-0 left-0 bg-gray-300/90 flex transition-opacity opacity-0 group-hover:opacity-100">
								<span class="font-semibold text-gray-700 m-auto">Ganti</span>
							</div>
						</a>
						<a role="button" v-else @click="showImgModal = true" class="rounded-xl border bg-gray-100 flex justify-center items-center aspect-video w-full font-semibold text-gray-700 p-4 transition-colors bg-gray-100 hover:bg-gray-300">
							<span class=" m-auto">Upload Gambar Produk</span>
						</a>
					</div>
					<form class="px-8">
						<div class="input-group mb-8">
							<label for="inputName">Nama Produk</label>
							<input type="text" v-model="v$.name.$model" id="inputName">
						</div>
						<div class="grid grid-cols-[repeat(2,auto)] gap-4 mb-8">
							<div class="input-group">
								<label class="mr-2 mb-0">Kategori</label>
								<Dropdown v-if="categories.length > 0" :options="categories" :value="data.category" labelKey="name" valueKey="id" @change="val => data.category = val" />
							</div>
							<div class="input-group">
								<label class="mr-2 mb-0">Sexing</label>
								<SwitchToggle :value="data.type == 'Sexing'" @toggle="onSexingToggle" />
							</div>
						</div>
						<div class="grid grid-cols-2 gap-4 mb-8">
							<div class="input-group">
								<label for="inputPrice">Harga (IDR)</label>
								<input type="number" v-model="v$.price.$model" id="inputPrice">
							</div>
							<div class="input-group">
								<label for="inputStock">Jumlah Stok</label>
								<input type="number" v-model="v$.stock.$model" id="inputStock">
							</div>
						</div>
						<div class="flex justify-end items-center gap-8 px-4 pt-8">
							<button type="button" @click="$emit('cancel')" class="text-white text-sm rounded px-3 py-2 hover-margin bg-gray-600 hover:bg-gray-500">Kembali</button>
							<button type="button" class="text-white rounded px-3 py-2 hover-margin bg-primary-600 hover:bg-primary-500">Simpan Perubahan</button>
						</div>
					</form>
				</div>
				<ModalUploadProductImg v-if="showImgModal" @close="showImgModal = false" />
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	


</style>