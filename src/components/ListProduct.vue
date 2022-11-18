<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import { buildCardProps } from "@/modules/buildCardProps";
import CardProduct from "@/components/CardProduct.vue";

const errMessage = ref(null);
const productStore = useProductStore();

const products = reactive([]);
const route = useRoute();
const categoryId = computed(() => route.params.categoryId);

const onFetchSuccess = response => {
	products.splice(0, products.length);
	errMessage.value = null;

	if(!response.products)
		return console.warn(response);

	response.products.forEach(item => {
		if(!categoryId.value)
			products.push(item);
		else if(categoryId.value && item.category == categoryId.value)
			products.push(item);
	});

	if(products.length < 1) {
		errMessage.value = "Belum ada produk.";
		return;
	}
};

const onFetchError = err => {
	errMessage.value = "Terjadi kasalahan saat hendak menghubungi server.";
	products.splice(0, products.length);
};

productStore.fetchProducts().then(onFetchSuccess).catch(onFetchError);

watch(
	() => route.params.categoryId,
	() => productStore.fetchProducts().then(onFetchSuccess).catch(onFetchError)
);
</script>
<template>
	<div>
		<div v-if="errMessage && products.length < 1">
			<h3 class="text-2xl text-black/60 font-semibold text-center">{{ errMessage }}</h3>
		</div>
		<div v-if="products.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
			
			<CardProduct v-for="(item, index) in products" :key="item.id" v-bind="buildCardProps(item)" class="shadow-sm" />
		
		</div>
	</div>
</template>