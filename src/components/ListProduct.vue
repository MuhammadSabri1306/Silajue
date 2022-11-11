<script setup>
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";
import { buildCardProps } from "@/modules/buildCardProps";
import CardProduct from "@/components/CardProduct.vue";

const errMessage = ref(null);
const productStore = useProductStore();

const products = reactive([]);

productStore.fetchProducts()
	.then(response => {
		if(!response.products)
			return console.warn(response);

		if(response.products.length < 1) {
			errMessage.value = "Belum ada produk.";
			return;
		}

		response.products.forEach(item => products.push(item));
	})
	.catch(err => {
		errMessage.value = "Terjadi kasalahan saat hendak menghubungi server.";
	});
</script>
<template>
	<div>
		<div v-if="errMessage && products.length < 1">
			<h3 class="text-2xl text-black/60 font-semibold">{{ errMessage }}</h3>
		</div>
		<div v-if="products.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
			
			<CardProduct v-for="(item, index) in products" :key="item.id" v-bind="buildCardProps(item)" class="shadow-sm" />
		
		</div>
	</div>
</template>