<script setup>
import { reactive, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { getSampleProduct } from "@/modules/sample-products";
import CardProduct from "@/components/CardProduct.vue";

const data = reactive([]);

if(data.length < 1) {
	getSampleProduct().then(products => {
		products.forEach(pItem => data.push(pItem));
	});
}
</script>
<template>
	<div class="bg-white py-16">
		<div class="container">
			<div class="flex flex-col md:flex-row gap-16 pt-8 pb-32">
				<div class="mt-16">
					<h6 class="font-semibold mb-4">Kategori</h6>
					<ul class="list-none">
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Sapi</a></li>
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Kambing</a></li>
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Domba</a></li>
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Bebek</a></li>
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Ayam</a></li>
						<li class="font-medium hover-margin py-1 px-6"><a href="#" class="block">Ikan</a></li>
					</ul>
				</div>
				<div class="w-full">
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
						<div class="flex justify-end mb-8">
							<router-link to="/produk/form" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 focus-solid"><font-awesome-icon icon="fa-solid fa-plus" fixed-width /> Tambah Produk</router-link>
						</div>
						<div class=" grid grid-cols-2 lg:grid-cols-3 gap-4">
							<CardProduct v-for="(item, index) in data" :id="index" :title="item.name" :price="item.price" :img="item.img" :isAdmin="true" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>