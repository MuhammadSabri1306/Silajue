<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageContent = computed(() => {
	const title = route.params.id ? "Edit Produk" : "Tambah Produk";
	const btnSubmit = route.params.id ? "Update Produk" : "Tambah Produk";

	return { title, btnSubmit };
});

const model = reactive({
	nama: "",
	harga: "",
	stok: 0,
	deskripsi: ""
});

</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">{{ pageContent.title }}</h6>
			<div class="border-t pt-12 mt-4 pb-32">
				<form @submit.prevent>
					<div class="grid grid-cols-[1fr_0.7fr] gap-4">
						<div class="form-input-group col-span-2">
							<label for="inputNama">Nama Produk</label>
							<input type="text" id="inputNama" v-model="model.nama" class="pl-[10rem] focus-shadow">
						</div>
						<div class="form-input-group col-span-1">
							<label for="inputHarga">Harga Produk</label>
							<input type="text" id="inputHarga" v-model="model.harga" class="pl-[10rem] focus-shadow">
						</div>
						<div class="form-input-group col-span-1">
							<label for="inputStok">Stok</label>
							<input type="number" id="inputStok" v-model="model.stok" class="pl-[6rem] focus-shadow">
						</div>
						<div class="form-textarea-group col-span-2">
							<label for="textDeskripsi">Deskripsi Produk</label>
							<textarea id="textDeskripsi" v-model="model.deskripsi" rows="10" class="focus-shadow"></textarea>
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
<style scoped>
	.form-input-group, .form-textarea-group {
		@apply relative;
	}

	.form-input-group > input {
		@apply block w-full h-10 pr-6 text-sm rounded-lg transition-colors bg-gray-200 focus:bg-white;
	}

	.form-input-group > label {
		@apply absolute top-0 left-0 h-10 px-6 text-sm rounded-lg text-shadow-white bg-primary-500 font-semibold inline-flex items-center;
	}

	.form-textarea-group > textarea {
		@apply block w-full px-6 pt-12 pb-6 text-sm rounded-lg transition-colors bg-gray-200 focus:bg-white;
	}

	.form-textarea-group > label {
		@apply absolute top-0 left-0 h-10 w-full px-6 text-sm rounded-lg text-shadow-white bg-primary-500 font-semibold inline-flex items-center;
	}
</style>