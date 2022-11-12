<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import http from "@/modules/http-common";
import { formatIdr } from "@/modules/currency-format";
import { buildCardProps } from "@/modules/buildCardProps";
import { getSampleProduct, getProductSuggestions } from "@/modules/sample-products";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TopbarProduct from "@/components/TopbarProduct.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import CardProduct from "@/components/CardProduct.vue";
import ModalProduct from "@/components/ModalProduct.vue";

const errMessage = ref(null);
const isProductLoaded = ref(false);
const isSuggestLoaded = ref(false);

const route = useRoute();
const product = reactive({
	id: null,
	name: null,
	price: null,
	img: null,
	type: null,
	category: null,
	description: null,
	available: null
});

const textPrice = computed(() => formatIdr(product.price));
const suggests = reactive([]);
const showModal = ref(false);

const openModal = id => {
	showModal.value = true;
};

const setupData = id => {
	errMessage.value = null;
	isProductLoaded.value = false;
	isSuggestLoaded.value = false;
	showModal.value = false;

	getSampleProduct(id)
		.then(response => {
			if(!response.product) {
				return console.warn(response);
			}

			product.id = response.product.id;
			product.name = response.product.name;
			product.price = response.product.price;
			product.img = response.product.img;
			product.type = response.product.type;
			product.category = response.product.category;
			product.description = response.product.description;
			product.available = response.product.stock > 0;

			isProductLoaded.value = true;
		})
		.catch(err => {
			isProductLoaded.value = true;
			errMessage.value = "Terjadi kasalahan saat hendak menghubungi server.";
		});

	suggests.splice(0, suggests.length);
	getProductSuggestions(id, 4)
		.then(response => {
			if(!response.products) {
				return console.warn(response);
			}

			response.products.forEach(item => suggests.push(item));
			isSuggestLoaded.value = true;
		})
		.catch(err => {
			isSuggestLoaded.value = true;
		});
};

setupData(route.params.id);
watch(() => route.params.id, id => setupData(id));
</script>
<template>
	<BasicLayout>
		<template #topbar>
			<TopbarProduct />
		</template>
		<template #main>
			<div>
				<div class="bg-white py-16">
					<div v-if="errMessage" class="container mb-16">
						<h6 class="text-2xl font-semibold text-center text-gray-800">{{ errMessage }}</h6>
					</div>
					<div v-if="isProductLoaded" class="container mb-16">
						<h6 class="text-2xl font-bold mb-4">Detail Produk</h6>
						<div v-if="isProductLoaded && errMessage">
							<h3 class="text-2xl text-black/60 font-semibold">{{ errMessage }}</h3>
						</div>
						<div v-if="isProductLoaded && !errMessage" class="grid gap-4 grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
							<div>
								<div class="rounded-2xl overflow-hidden">
									<BgImageAsync class="aspect-video" :src="product.img" />
								</div>
							</div>
							<div class="p-4 flex flex-col justify-center">
								<h6 class="text-4xl font-bold text-gray-900">{{ product.name }}</h6>
								<p class="text-base font-semibold text-gray-600">{{ product.category }}</p>
								<div class="py-4">
									<p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
									<div class="flex items-center mb-4 gap-2">
										<span class="text-xs font-semibold px-3 py-1 rounded bg-gray-700 text-white">{{ product.type }}</span>
									</div>
									<p class="font-bold text-2xl whitespace-nowrap text-green-600 text-right">{{ textPrice }}</p>
								</div>
								<div class="flex justify-end">
									<button type="button" @click="openModal(product.id)" class="flex justify-center items-center text-white rounded px-6 py-2 hover-margin bg-green-600 hover:bg-green-500">
										<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
										<span class="text-sm font-medium">Beli</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="isSuggestLoaded" class="bg-gray-100 pt-16 pb-8">
					<div class="px-8 lg:container mb-8">
						<h6 class="text-2xl lg:text-4xl font-bold text-gray-900">Produk lainnya</h6>
					</div>
					<div class="w-full overflow-x-auto pb-8">
						<div class="flex gap-4">
							<div v-for="(item, index) in suggests" class="product-card-wrapper">

								<CardProduct v-bind="buildCardProps(item)" :class="{ 'ml-4': (index == 0), 'mr-4': (index == suggests.length - 1) }" class="shadow-sm" />

							</div>
						</div>
					</div>
				</div>

				<ModalProduct v-if="showModal" @close="showModal = false" :key="product.id" :id="product.id" :name="product.name" :price="product.price" :type="product.type" :category="product.category" />

			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
.product-card-wrapper {
	@apply flex-[0_0_18rem];
}

</style>