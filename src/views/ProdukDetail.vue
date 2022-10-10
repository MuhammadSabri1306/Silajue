<script setup>
import { reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import CardProduct from "@/components/CardProduct.vue";
import { getSampleProduct, getSuggestions } from "@/modules/sampleProducts";

const route = useRoute();
const data = reactive({
	name: "",
	price: "",
	stock: 0,
	description: "",
	img: ""
});

const styleImg = computed(() => ({ backgroundImage: `url('${ data.img }')` }));

if(route.params.id) {
	getSampleProduct(route.params.id).then(product => {
		data.name = product.name;
		data.price = product.price;
		data.stock = product.stock;
		data.description = product.description;
		data.img = product.img;
	});
}

const dataSuggest = reactive([]);
getSuggestions(route.params.id).then(suggest => {
	suggest.forEach(suggestItem => dataSuggest.push(suggestItem));
});
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">Detail Produk</h6>
			<div class="border-t pt-4 mt-4 pb-32">
				<div class="grid grid-cols-[1fr_auto] gap-4">
					<div>
						<div class="mb-4">
							<div class="aspect-[2.4/1] bg-cover bg-center" :style="styleImg"></div>
						</div>
						<div class="flex items-center justify-between my-8">
							<h4 class="text-4xl font-bold">{{ data.name }}</h4>
							<h4 class="text-4xl font-bold">{{ data.price }}</h4>
						</div>
						<p class="font-medium mb-4">Deskripsi</p>
						<p class="mb-8">{{ data.description }}</p>
					</div>
					<div class="w-40 flex flex-col gap-4">
						<div><img src="/assets/img/detail-produk-sample1.png" class="w-full"></div>
						<div><img src="/assets/img/detail-produk-sample2.png" class="w-full"></div>
					</div>
				</div>
				<div class="border-t pt-2 mt-8"></div>
				<h6 class="text-base font-semibold mb-4">Produk Serupa</h6>
				<div class=" grid grid-cols-2 lg:grid-cols-3 gap-4">
					<CardProduct v-for="item in dataSuggest" :id="item.id" :title="item.name" :price="item.price" :img="item.img" />
				</div>
			</div>
		</div>
	</div>
</template>