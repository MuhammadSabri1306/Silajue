<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { getSampleProduct } from "@/modules/sample-products";
import CardProduct from "@/components/CardProduct.vue";
import ProductCart from "@/components/ProductCart.vue";

const route = useRoute();
const data = reactive([]);

const fetch = category => {
	getSampleProduct().then(products => {
		data.splice(0);


		products.forEach(pItem => {
			if(category && pItem.category == category)
				data.push(pItem);
			else if(!category)
				data.push(pItem);
		});
	});
};

fetch(route.params.category);
watch(() => route.params.category, category => fetch(category));

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);
window.userStore = () => userStore;

const productStore = useProductStore();
const categoryList = computed(() => ["semua", ...productStore.categories]);
const activeCategoryText = computed(() => {
	if(!route.params.category)
		return "Semua";

	const activedIndex = productStore.categories.indexOf(route.params.category);
	if(activedIndex >= 0)
		return productStore.categories[activedIndex];

	return "Kategori";
})

const router = useRouter();
const showCategoryDropdown = ref(false);

const goToCategory = category => {
	if(productStore.categories.indexOf(category) >= 0)
		router.push("/product/category/" + category);
	else if(category == "semua")
		router.push("/product");
	else
		console.log("E404");

	showCategoryDropdown.value = false;
};

const onBodyClick = event => {
	if(showCategoryDropdown.value)
		showCategoryDropdown.value = false;
};

onMounted(() => {
	document.body.addEventListener("click", onBodyClick);
});
onUnmounted(() => {
	document.body.removeEventListener("click", onBodyClick);
});

const showCart = ref(false);
</script>
<template>
	<div class="bg-white py-16">
		<div class="container mb-12">
			<div class="flex gap-4 justify-end">
				<div class="list-category">
					<button type="button" @click.stop="showCategoryDropdown = !showCategoryDropdown" class="btn-category">
						<span>{{ activeCategoryText }}</span>
						<span class="icon">
							<font-awesome-icon icon="fa-solid fa-angle-down" fixed-width />
						</span>
					</button>
					<ul :class="{ 'show': showCategoryDropdown }">
						<li v-for="item in categoryList">
							<a role="button" @click.stop="goToCategory(item)" class="category-item btn-category">{{ item }}</a>
						</li>
					</ul>
				</div>
				<button @click="showCart = true" class="flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
					<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></span>
					<span class="text-sm font-semibold hidden md:inline">Keranjang</span>
				</button>
			</div>
		</div>
		<div class="container">
			<div class="flex justify-between items-end">
				<h6 class="text-4xl font-bold">Produk</h6>
				<form class="block relative">
					<input type="search" name="keyword" class="w-full bg-white pl-4 pr-14 py-2 rounded-[50rem] bg-gray-200" placeholder="Cari...">
					<button type="submit" class="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-full text-lg">
						<font-awesome-icon icon="fa-solid fa-magnifying-glass" fixed-width />
					</button>
				</form>
			</div>
			<div class="border-t pt-4 mt-4">
				<div v-if="isAdmin" class="flex justify-end mb-8">
					<router-link to="/product/form" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 focus-solid"><font-awesome-icon icon="fa-solid fa-plus" fixed-width /> Tambah Produk</router-link>
				</div>
				<div v-if="data.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
					<CardProduct v-for="(item, index) in data" :id="index" :title="item.name" :price="item.price" :img="item.img" :category="item.category" :description="item.description" :stock="item.stock" class="shadow-sm" />
				</div>
				<div v-else>
					<h3 class="text-2xl text-black/60 font-semibold">Belum ada produk di kategori ini.</h3>
				</div>
			</div>
		</div>
		<ProductCart :class="{ 'right-0': showCart, '-right-full': !showCart }" class="fixed top-0 h-screen bg-white border-l shadow z-[22] md:w-1/2 lg:w-1/3 overflow-y-auto transition-all duration-500" @hide="showCart = false" />
	</div>
</template>
<style scoped>
	
.list-category {
	@apply relative;
}

.list-category button {
	@apply flex justify-center items-center bg-primary-500 text-black/90 text-sm font-semibold px-4 py-2 rounded capitalize;
}

.list-category button > .icon {
	@apply text-[0.8em];
}

.list-category button > .icon > * {
	vertical-align: middle;
}

.list-category li:not(:last-child) {
	@apply border-b;
}

.list-category ul {
	@apply border rounded overflow-hidden mt-0 opacity-0 absolute right-0 z-[1] shadow transition-all duration-300;
}

.list-category ul.show {
	@apply mt-4 opacity-100;
}

.list-category .category-item {
	@apply capitalize px-12 py-2 block bg-white hover:bg-gray-100;
}

</style>