<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import CardProduct from "@/components/CardProduct.vue";
import { getSuggestions } from "@/modules/sampleProduct";

const route = useRoute();
const productStore = useProductStore();

const productName = ref("");
const productPrice = ref("");

if(productStore.product.length < 1)
	productStore.fetchProductById(route.params.id);

watch(
	() => productStore.productById(route.params.id),
	(currentProduct) => {
		productName.value = currentProduct.name;
		productPrice.value = currentProduct.price;
	},
	{ immediate: true }
);

const dataSuggestProduct = ref(null);
const suggestProduct = computed(() => {
	if(!Array.isArray(dataSuggestProduct.value))
		return [];
	console.log(dataSuggestProduct.value);
	return dataSuggestProduct.value;
});

getSuggestions(route.params.id).then((suggestionsProduct) => dataSuggestProduct.value = suggestionsProduct);
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">Detail Produk</h6>
			<div class="border-t pt-4 mt-4 pb-32">
				<div class="grid grid-cols-[1fr_auto] gap-4">
					<div>
						<div class="mb-4">
							<img src="/assets/img/detail-produk-sample.png" class="w-full">
						</div>
						<div class="flex items-center justify-between my-8">
							<h4 class="text-4xl font-bold">{{ productName }}</h4>
							<h4 class="text-4xl font-bold">{{ productPrice }}</h4>
						</div>
						<p class="font-medium mb-4">Deskripsi</p>
						<p class="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.</p>
					</div>
					<div class="w-40 flex flex-col gap-4">
						<div><img src="/assets/img/detail-produk-sample1.png" class="w-full"></div>
						<div><img src="/assets/img/detail-produk-sample2.png" class="w-full"></div>
					</div>
				</div>
				<div class="border-t pt-2 mt-8"></div>
				<h6 class="text-base font-semibold mb-4">Produk Serupa</h6>
				<div class=" grid grid-cols-2 lg:grid-cols-3 gap-4">
					<CardProduct v-for="item in suggestProduct" :id="item.id" :title="item.name" :price="item.price" :img="item.img" />
				</div>
			</div>
		</div>
	</div>
</template>