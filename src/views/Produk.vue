<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TopbarProduct from "@/components/TopbarProduct.vue";
import ListProduct from "@/components/ListProduct.vue";
import FabProduct from "@/components/FabProduct.vue";
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