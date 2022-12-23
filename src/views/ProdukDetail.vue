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

const isProductLoaded = ref(false);
const isSuggestLoaded = ref(false);
const productStore = useProductStore();

productStore.fetchProducts(false, () => isProductLoaded.value = true);
productStore.fetchCategories();

const route = useRoute();
const productId = computed(() => route.params.id);
const product = computed(() => productStore.productById(productId.value));

const textPrice = computed(() => product.value.category ? formatIdr(product.value.category.price) : formatIdr(0));
const suggests = reactive([]);
const showModal = ref(false);

const openModal = id => {
	showModal.value = true;
};

const setupSuggestions = () => {
	isSuggestLoaded.value = false;
	suggests.splice(0, suggests.length);
	const dataProduct = productStore.products;

	if(dataProduct.length < 1)
		return [];

	let index = dataProduct.findIndex(item => item.id == productId.value);
	if(index < 0)
		return [];

	const maxLength = 4;
	for(let i=0; i<maxLength; i++) {
		suggests.push(dataProduct[index]);
		index++;
		if(index === dataProduct.length)
			index = 0;
	}

	isSuggestLoaded.value = true;
};

setupSuggestions();
watch(() => productStore.products, setupSuggestions);

const getCircleBgClass = key => productStore.colors[key]?.bg;
</script>
<template>
	<BasicLayout>
		<template #main>
			<div>
				<div class="bg-white py-16">
					<div class="container">
						<h6 class="text-2xl font-bold mb-4">Detail Produk</h6>
					</div>
					<div v-if="isProductLoaded" class="container mb-16">
						<div class="grid gap-4 grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] mb-16">
							<div>
								<div class="rounded-2xl overflow-hidden">
									<BgImageAsync class="aspect-video" :src="product.image" />
								</div>
							</div>
							<div class="p-4 md:flex items-center">
								<div class="relative">
									<h6 class="text-4xl font-bold text-gray-900 md:mr-24">{{ product.name }}</h6>
									<p class="text-base font-semibold text-gray-600 capitalize">{{ product.category?.name }}</p>
									<span class="absolute right-0 top-0 text-xs font-semibold px-3 py-1 rounded bg-gray-700 text-white capitalize">{{ product.category?.type }}</span>
									<div class="pt-8 pb-4">
										<div class="product-description mb-4" v-html="product.description"></div>
										<p class="text-sm text-gray-600 grid grid-cols-[auto_1fr] gap-1 mb-4">
											<span>Kode</span>
											<b>: {{ product.code }}</b>
											<span>Tgl. Lahir</span>
											<b>: {{ product.date_birth }}</b>
											<span>Sire</span>
											<b>: {{ product.sire }}</b>
											<span>Dam</span>
											<b>: {{ product.dam }}</b>
											<span>Stok</span>
											<b>: {{ product.stock }}</b>
										</p>
										<div class="flex items-center rounded bg-gray-800 mb-16 p-4 min-w-[12rem]">
											<p class="text-white text-center text-sm font-semibold">Warna Straw</p>
											<div class="grow flex items-center justify-center">
												<div :class="getCircleBgClass(product.straw_color)" class="w-12 h-12 rounded-full border border-black"></div>
											</div>
										</div>
										<p class="font-bold whitespace-nowrap text-gray-800 text-right">Harga</p>
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

								<ProductFeedback :productId="productId" />

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
							<div v-for="item in suggests">

								<CardProduct :key="item.id" :id="item.id" class="shadow-sm" />

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

.product-description :deep(p) {
	@apply text-sm text-gray-600 mb-1;
}

</style>