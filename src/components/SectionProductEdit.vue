<script setup>
import { ref, computed, watch } from "vue";
import { required } from "@vuelidate/validators";
import { useProductStore } from "@/stores/product";
import { useViewStore } from "@/stores/view";
import { formatIdr } from "@/modules/currency-format";
import { useDataForm } from "@/modules/data-form";
import Dropdown from "@/components/ui/Dropdown.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import ModalUploadProductImg from "@/components/ModalUploadProductImg.vue";

const productStore = useProductStore();

const emit = defineEmits(["cancel"]);
const props = defineProps({
	id: { required: true }
});

const setupDataForm = key => {
	return {
		value: productStore.productById(props.id)[key],
		required
	};

};

const { data, v$ } = useDataForm({
	name: setupDataForm("name"),
	img: setupDataForm("img"),
	stock: setupDataForm("stock"),
	category: setupDataForm("category"),
	price: setupDataForm("price"),
	type: setupDataForm("type"),
	description: setupDataForm("description")
});

const textPrice = computed(() => formatIdr(data.price));
const categories = computed(() => productStore.categories);

const onSexingToggle = isSexing => {
	if(isSexing)
		data.type = "Sexing";
	else
		data.type = "Unsexing";
};

const showImgModal = ref(false);
</script>
<template>
	<form>
		<div class="px-8 grid grid-cols-1 gap-8 mb-8">
			<div class="input-group col-start-1 col-end-3 md:col-end-2 max-w-[30rem]">
				<label for="inputName">Nama Produk</label>
				<input type="text" v-model="v$.name.$model" id="inputName">
			</div>
			<div class="input-group max-w-[20rem]">
				<label class="mr-2 mb-0">Kategori</label>
				<Dropdown v-if="categories.length > 0" :options="categories" :value="data.category" labelKey="name" valueKey="id" @change="val => data.category = val" />
			</div>
			<div class="input-group">
				<label class="mr-2 mb-0">Sexing</label>
				<SwitchToggle :value="data.type == 'Sexing'" @toggle="onSexingToggle" />
			</div>
			<div class="input-group max-w-[20rem]">
				<label for="inputPrice">Harga (IDR)</label>
				<input type="number" v-model="v$.price.$model" id="inputPrice">
			</div>
			<div class="input-group max-w-[10rem]">
				<label for="inputStock">Jumlah Stok</label>
				<input type="number" v-model="v$.stock.$model" id="inputStock">
			</div>
			<div>
				<label class="block text-lg text-center mb-4">Gambar Produk</label>
				<div class="flex justify-center items-center rounded-xl border bg-gray-100 p-4">
					<a role="button" @click="showImgModal = true" class="block max-w-full w-[20rem] relative group">
						<img :src="data.img" :alt="data.name">
						<div class="absolute w-full h-full top-0 left-0 bg-gray-300/90 flex transition-opacity opacity-0 group-hover:opacity-100">
							<span class="font-semibold text-gray-700 m-auto">Upload</span>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="flex justify-end items-center gap-8 px-4 pt-8">
			<button type="button" @click="$emit('cancel')" class="text-white text-sm rounded px-3 py-2 hover-margin bg-gray-600 hover:bg-gray-500">Kembali</button>
			<button type="button" class="text-white rounded px-3 py-2 hover-margin bg-primary-600 hover:bg-primary-500">Simpan Perubahan</button>
		</div>
		<ModalUploadProductImg v-if="showImgModal" @close="showImgModal = false" />
	</form>
</template>