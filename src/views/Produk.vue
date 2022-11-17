<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { getSampleProduct } from "@/modules/sample-products";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TopbarProduct from "@/components/TopbarProduct.vue";
import ListProduct from "@/components/ListProduct.vue";
import ProductCart from "@/components/ProductCart.vue";
import FabProduct from "@/components/FabProduct.vue";

const route = useRoute();
const data = reactive([]);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);

const productStore = useProductStore();
const categoryList = computed(() => ["Semua", ...productStore.categories]);
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
	<BasicLayout>
		<template #topbar>
			<TopbarProduct />
		</template>
		<template #main>
			<main>
				<header class="py-16 bg-green-600 flex flex-col">
					<h3 class="text-black text-4xl font-bold text-shadow-white text-center">Produk</h3>
					<h6 class="font-medium text-lg text-center text-gray-100 mb-8">Temukan produk semen beku sesuai kebutuhan anda.</h6>
					<div class="mx-auto">
						<form>
							<div class="flex">
								<div class="grid grow md:w-[30rem] mr-2">
									<input type="search" class="block w-full h-full px-6 text-sm font-semibold rounded transition-color bg-gray-200 hover:bg-white focus:bg-white" placeholder="Cari produk...">
								</div>
								<button class="px-3 py-2 rounded text-xl transition-color text-white hover:text-green-500 bg-black">
									<font-awesome-icon icon="fa-solid fa-search" />
								</button>
							</div>
						</form>
					</div>
				</header>

				<FabProduct />
				
				<div class="bg-white py-16">
					<div class="container px-8">
						
						<ListProduct class="border-t pt-4 mt-4" />
						
					</div>
					<ProductCart :class="{ 'right-0': showCart, '-right-full': !showCart }" class="fixed top-0 h-screen bg-white border-l shadow z-[22] md:w-1/2 lg:w-1/3 overflow-y-auto transition-all duration-500" @hide="showCart = false" />
				</div>
			</main>
		</template>
	</BasicLayout>
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