<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import { buildCardProps } from "@/modules/build-card-props";
import CardProduct from "@/components/CardProduct.vue";

const productStore = useProductStore();
productStore.fetchProducts();

const route = useRoute();
const categoryId = computed(() => route.params.categoryId);

const isSexing = computed(() => productStore.isSexing);
const products = computed(() => {

	return productStore.products.filter(item => {
		const typeFilter = isSexing.value && item.category.type == "sexing" || !isSexing.value && item.category.type == "unsexing";
		const categoryFilter = !categoryId.value ? true : (item.category.id == categoryId.value);
		return typeFilter && categoryFilter;
	});

});
</script>
<template>
	<div>
		<div v-if="products.length < 1">
			<h3 class="text-2xl text-black/60 font-semibold text-center">Belum ada produk.</h3>
		</div>
		<div v-if="products.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
			
			<CardProduct v-for="(item, index) in products" :key="item.id" v-bind="buildCardProps(item)" class="shadow-sm" />
		
		</div>
	</div>
</template>