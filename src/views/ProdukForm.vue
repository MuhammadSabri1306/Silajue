<script setup>
import { reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getSampleProduct } from "@/modules/sampleProducts";

const route = useRoute();

const pageContent = computed(() => {
	const title = route.params.id ? "Edit Produk" : "Tambah Produk";
	const btnSubmit = route.params.id ? "Update Produk" : "Tambah Produk";

	return { title, btnSubmit };
});

const data = reactive({
	name: "",
	price: "",
	stock: 0,
	description: ""
});

if(route.params.id) {
	getSampleProduct(route.params.id).then(product => {
		data.name = product.name;
		data.price = product.price;
		data.stock = product.stock;
		data.description = product.description;
		console.log(product);
	});
}
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">{{ pageContent.title }}</h6>
			<div class="border-t pt-12 mt-4 pb-32">
				<form @submit.prevent>
					<div class="grid grid-cols-[1fr_0.7fr] gap-4">
						<div class="form-input-group col-span-2">
							<label for="inputNama" class="text-shadow-white">Nama Produk</label>
							<input type="text" id="inputNama" v-model="data.name" class="pl-[10rem] focus-shadow">
						</div>
						<div class="form-input-group col-span-1">
							<label for="inputHarga" class="text-shadow-white">Harga Produk</label>
							<input type="text" id="inputHarga" v-model="data.price" class="pl-[10rem] focus-shadow">
						</div>
						<div class="form-input-group col-span-1">
							<label for="inputStok" class="text-shadow-white">Stok</label>
							<input type="number" id="inputStok" v-model="data.stock" class="pl-[6rem] focus-shadow">
						</div>
						<div class="form-textarea-group col-span-2">
							<label for="textDeskripsi" class="text-shadow-white">Deskripsi Produk</label>
							<textarea id="textDeskripsi" v-model="data.description" rows="10" class="focus-shadow"></textarea>
						</div>
					</div>
					<div class="flex justify-end mt-8">
						<button type="submit" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 btn-focus-primary">{{ pageContent.btnSubmit }}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>