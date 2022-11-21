<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import http from "@/modules/http-common";
import { useProductStore } from "@/stores/product";
import { formatIdr } from "@/modules/currency-format";
import { buildCardProps } from "@/modules/build-card-props";
import { getSampleProduct, getProductSuggestions } from "@/modules/sample-products";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import CardProduct from "@/components/CardProduct.vue";
import ModalProduct from "@/components/ModalProduct.vue";
import ProductFeedback from "@/components/ProductFeedback.vue";
import FabProduct from "@/components/FabProduct.vue";

const isSuggestLoaded = ref(false);
const productStore = useProductStore();

productStore.fetchProducts()
productStore.fetchCategories();

const route = useRoute();
const product = computed(() => productStore.productById(route.params.id));

const categoryName = computed(() => {
	if(!productStore.categories)
		return null;
	
	const currCategory = productStore.categories.find(item => item.id == product.value.category);
	if(!currCategory)
		return null;
	
	return currCategory.name;
});

const textPrice = computed(() => product.value.price ? formatIdr(product.value.price) : formatIdr(0));
const suggests = reactive([]);
const showModal = ref(false);

const openModal = id => {
	showModal.value = true;
};

const setupData = id => {
	isSuggestLoaded.value = false;
	showModal.value = false;

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
		<template #main>
			<div>
				<div class="bg-white py-16">
					<div class="container mb-16">
						<h6 class="text-2xl font-bold mb-4">Detail Produk</h6>
						<div class="grid gap-4 grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] mb-16">
							<div>
								<div class="rounded-2xl overflow-hidden">
									<BgImageAsync class="aspect-video" :src="product.img" />
								</div>
							</div>
							<div class="p-4 flex items-center">
								<div class="relative">
									<h6 class="text-4xl font-bold text-gray-900">{{ product.name }}</h6>
									<p class="text-base font-semibold text-gray-600">{{ categoryName }}</p>
									<span class="absolute right-0 top-0 text-xs font-semibold px-3 py-1 rounded bg-gray-700 text-white">{{ product.type }}</span>
									<div class="py-4">
										<p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
										<p class="text-sm text-gray-600 mb-4">Stok Tersedia: <b>{{ product.stock }}</b></p>
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
						<div class="flex">
							<div class="w-full md:w-1/2">

								<ProductFeedback :productId="product.id" />

							</div>
						</div>
					</div>
				</div>
				<div v-if="isSuggestLoaded" class="bg-gray-100 pt-16 pb-8">
					<div class="px-8 lg:container mb-8">
						<h6 class="text-2xl lg:text-4xl font-bold text-gray-900">Produk lainnya</h6>
					</div>
					<div class="w-full overflow-x-auto flex pb-8">
						<div class="mx-auto grid grid-cols-[repeat(4,18rem)] pl-8 pr-12 gap-4">
							<div v-for="(item, index) in suggests">

								<CardProduct v-bind="buildCardProps(item)" class="shadow-sm" />

							</div>
						</div>
					</div>
				</div>
				
				<FabProduct />
				<ModalProduct v-if="showModal" @close="showModal = false" :id="product.id" />

			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
.product-card-wrapper {
	@apply flex-[0_0_18rem];
}

</style>