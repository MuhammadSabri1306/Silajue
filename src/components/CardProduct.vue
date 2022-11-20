<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { formatIdr } from "@/modules/currency-format";
import BgImageAsync from "@/components/BgImageAsync.vue";
import ModalProduct from "@/components/ModalProduct.vue";

const routeDetail = computed(() => "/product/detail/" + props.id);
const routeEdit = computed(() => "/product/form/" + props.id);

const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	img: String,
	type: String,
	category: { default: null },
	description: String,
	stock: Number
});

const productStore = useProductStore();
const categoryName = computed(() => {
	if(!productStore.categories)
		return null;
	
	const currCategory = productStore.categories.find(item => item.id == props.category);
	if(!currCategory)
		return null;
	
	return currCategory.name;
});

const textPrice = computed(() => formatIdr(props.price));
const isTypeSexing = computed(() => props.type == "Sexing");

const showModal = ref(false);
const openModal = id => {
	showModal.value = true;
};
</script>
<template>
	<div class="card-product">
		<div>
			<BgImageAsync class="aspect-video" :src="img" />
		</div>
		<div class="p-4">
			<div class="flex items-start">
				<div class="mr-auto">
					<h6 class="text-2xl font-bold text-gray-900">{{ title }}</h6>
					<p class="text-xs font-semibold text-gray-600">{{ categoryName }}</p>
				</div>
				<button type="button" @click="openModal(id)" class="flex justify-center items-center text-white rounded px-3 py-1 hover-margin bg-green-600 hover:bg-green-500">
					<span class="text-lg mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
					<span class="text-xs font-bold">Beli</span>
				</button>
			</div>
			<div class="py-4 px-2">
				<p class="text-sm text-gray-600 mb-4">{{ description }}</p>
				<p class="text-sm text-gray-600 mb-4">Stok Tersedia: <b>{{ stock }}</b></p>
				<div class="flex items-center mb-4 gap-2">
					<span v-if="isTypeSexing" class="card-badge bg-gray-700 text-white">Sexing</span>
					<span v-else class="card-badge bg-gray-700 text-white">Unsexing</span>
				</div>
				<p class="font-bold text-2xl whitespace-nowrap text-green-600 text-right">{{ textPrice }}</p>
			</div>
			<router-link :to="routeDetail" class="flex justify-center items-center rounded px-3 py-2 hover-margin bg-black/90 text-white/80 hover:text-green-600">
				<span class="text-xs font-semibold">Lebih banyak</span>
				<span class="text-sm ml-2"><font-awesome-icon icon="fa-solid fa-angle-down" /></span>
			</router-link>
		</div>

		<ModalProduct v-if="showModal" @close="showModal = false" :id="id" :name="title" :price="price" :type="type" :category="category" />

	</div>
</template>
<style scoped>
	
.card-product {
	@apply bg-white overflow-hidden rounded-2xl shadow;
}

.card-img-gradient {
	background-image: radial-gradient(circle at 50% 20%, transparent 30%, rgba(20,20,20,0.6) 100%)
}

.card-badge {
	@apply text-xs font-semibold px-3 py-1 rounded;
}

</style>