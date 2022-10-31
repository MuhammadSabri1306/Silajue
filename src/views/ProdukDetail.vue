<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import CardProduct from "@/components/CardProduct.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import ProductCart from "@/components/ProductCart.vue";
import { getSampleProduct, getSuggestions } from "@/modules/sample-products";
import { useProductStore } from "@/stores/product";

const route = useRoute();
const data = reactive({
	name: "",
	price: "",
	stock: 0,
	description: "",
	img: ""
});

const numberWithDot = n => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

if(route.params.id) {
	getSampleProduct(route.params.id).then(product => {
		data.name = product.name;
		data.price = product.price;
		data.stock = product.stock;
		data.category = product.category;
		data.description = product.description;
		data.img = product.img;
	});
}

const dataSuggest = reactive([]);
getSuggestions(route.params.id).then(suggest => {
	suggest.forEach(suggestItem => dataSuggest.push(suggestItem));
});

const textPrice = computed(() => "Rp " + numberWithDot(data.price));
const showBuyForm = ref(false);
const itemCount = ref(1);
const textTotalPrice = computed(() => {
	return "Rp " + numberWithDot(data.price * itemCount.value);
});

const showCart = ref(false);

const productStore = useProductStore();
const addToCart = () => {
	const isSuccess = productStore.addToCart(route.params.id, data.name, data.price, itemCount.value);
	if(isSuccess)
		alert(props.name + " ditambahkan ke keranjang.");
	else
		alert("Error saat ingin menambahkan ke keranjang.");
};
</script>
<template>
	<div class="bg-white py-16">
		<div class="container mb-12">
			<div class="flex justify-end">
				<button @click="showCart = true" class="flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
					<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></span>
					<span class="text-sm font-semibold hidden md:inline">Keranjang</span>
				</button>
			</div>
		</div>
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">Detail Produk</h6>
			<div class="border-t pt-4 mt-4 pb-32">
				<div class="md:grid grid-cols-[1fr_auto] gap-4">
					<div>
						<div class="mb-12">
							<BgImageAsync class="aspect-[2.4/1]" :src="data.img" />
							<div class="grid md:hidden grid-cols-2 gap-4 mt-4">
								<div><img src="/assets/img/detail-produk-sample1.png" class="w-full"></div>
								<div><img src="/assets/img/detail-produk-sample2.png" class="w-full"></div>
							</div>
						</div>
						<div class="flex gap-4">
							<h6 class="text-3xl font-bold text-black/90">{{ data.name }}</h6>
							<button v-if="!showBuyForm" type="button" @click="showBuyForm = true" class="ml-auto flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
								<span class="text-2xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
								<span class="font-semibold">Beli</span>
							</button>
							<button v-else type="button" @click="showBuyForm = false" class="ml-auto flex justify-center items-center text-black rounded px-3 py-2 bg-gray-100 hover:bg-white">
								<font-awesome-icon icon="fa-solid fa-angle-left" />
								<span class="ml-2">Kembali</span>
							</button>
						</div>
						<div :class="{ 'max-h-[100%]': !showBuyForm, 'max-h-[0]': showBuyForm }" class="overflow-hidden transition-all duration-300">
							<div class="py-4 md:py-8 px-2 md:px-8 my-4 md:my-8 bg-gray-100 rounded-2xl">
								<p class="text-black/70 mb-4">{{ data.description }}</p>
								<p class="text-black/80 flex items-center mb-4">Stok tersisa <span class="font-semibold border rounded px-2 py-1 mx-2 text-lg">{{ data.stock }}</span> ekor</p>
								<p class="font-semibold text-xl whitespace-nowrap text-primary-800">{{ textPrice }}</p>
							</div>
						</div>
						<div :class="{ 'max-h-[0]': !showBuyForm, 'max-h-[100%]': showBuyForm }" class="overflow-hidden transition-all duration-300">
							<div class="py-4 md:py-8 px-2 md:px-8 my-4 md:my-8 md:w-2/3 lg:w-1/2">
								<div class="mb-4">
									<label class="text-black/90 text-sm font-medium" for="jumlahItem">Jumlah item:</label>
									<div class="flex items-center mt-2">
										<div class="grow">
											<input type="number" id="jumlahItem" class="block w-full py-1 px-2 border border-black/10 hover:border-black/20 focus:border-black/20 rounded text-center" v-model="itemCount">
										</div>
										<span class="text-sm font-medium text-black/70 ml-2 mr-1">dari</span>
										<span class="text-sm font-bold text-black/70">{{ data.stock }}</span>
									</div>
								</div>
								<div class="mb-8">
									<label class="text-black/90 text-sm font-medium" for="totalItem">Total:</label>
									<input type="text" :value="textTotalPrice" id="totalItem" class="block w-full py-1 px-2 border border-green-30 text-green-800 text-lg rounded text-center" disabled>
								</div>
								<div class="flex justify-end">
									<button @click="addToCart" type="button" class="flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
										<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
										<span class="font-semibold">Beli</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="w-40 hidden md:flex flex-col gap-4">
						<div><img src="/assets/img/detail-produk-sample1.png" class="w-full"></div>
						<div><img src="/assets/img/detail-produk-sample2.png" class="w-full"></div>
					</div>
				</div>
				<div class="border-t pt-2 mt-8"></div>
				<h6 class="text-base font-semibold mb-4">Produk Serupa</h6>
				<div class=" grid grid-cols-2 lg:grid-cols-3 gap-4">
					<CardProduct v-for="(item, index) in dataSuggest" :id="index" :title="item.name" :price="item.price" :img="item.img" :category="item.category" :description="item.description" :stock="item.stock" class="shadow-sm" />
				</div>
			</div>
		</div>
		<ProductCart :class="{ 'right-0': showCart, '-right-full': !showCart }" class="fixed top-0 h-screen bg-white border-l shadow z-[22] md:w-1/2 lg:w-1/3 overflow-y-auto transition-all duration-500" @hide="showCart = false" />
	</div>
</template>