<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import CardProduct from "./CardProduct.vue";

const route = useRoute();
const productStore = useProductStore();

const currentProduct = computed(() => productStore.getProductById(route.params.id));
const sampleProduct = computed(() => productStore.product.slice(-3));
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-4xl font-bold">Detail Produk</h6>
			<div class="border-t pt-4 mt-4 pb-32">
				<div class="grid grid-cols-[1fr_auto] gap-4">
					<div>
						<div class="mb-4">
							<img src="/assets/img/detail-produk-sample.png">
						</div>
						<div class="flex items-center justify-around mb-4">
							<h4 class="text-4xl font-bold">{{ currentProduct.name }}</h4>
							<h4 class="text-4xl font-bold">{{ currentProduct.price }}</h4>
						</div>
						<p class="font-medium">Deskripsi</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At malesuada eu tortor, amet. Nisi, in tortor magna quisque suspendisse. Turpis eget ultricies pharetra at nisl scelerisque vitae, gravida. Nunc, et egestas sollicitudin arcu lectus dis mauris hac sit. Gravida mattis blandit habitant mi ac mi. Sem eu eget at ut at pellentesque in porta.</p>
					</div>
					<div class="w-40 grid grid-cols-1 gap-4">
						<div><img src="/assets/img/detail-produk-sample1.png"></div>
						<div><img src="/assets/img/detail-produk-sample2.png"></div>
					</div>
				</div>
				<div class=" grid grid-cols-2 lg:grid-cols-3 gap-4">
					<CardProduct v-for="item in sampleProduct" :title="item.name" :price="item.price" :img="item.img" />
				</div>
			</div>
		</div>
	</div>
</template>