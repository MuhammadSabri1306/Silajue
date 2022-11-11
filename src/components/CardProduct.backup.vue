<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { formatIdr } from "@/modules/currency-format";
import BgImageAsync from "@/components/BgImageAsync.vue";

const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	img: String,
	category: String,
	description: String,
	available: Boolean
});

const numberWithDot = n => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const textPrice = computed(() => formatIdr(props.price));

const textDescription = computed(() => {
	return props.description.slice(0, 50) + "..."
});

const routeDetail = computed(() => "/product/detail/" + props.id);
const routeEdit = computed(() => "/product/form/" + props.id);

const isImgLoaded = ref(false);

const user = useUserStore();
const isAdmin = computed(() => user.isRoleAdmin);

const showBuyForm = ref(false);
const itemCount = ref(1);

const textTotalPrice = computed(() => {
	return "Rp " + numberWithDot(props.price * itemCount.value);
});

const productStore = useProductStore();
const addToCart = () => {
	const isSuccess = productStore.addToCart(props.id, props.title, props.price, itemCount.value);
	console.log(isSuccess);
	if(isSuccess)
		alert(props.title + " ditambahkan ke keranjang.");
	else
		alert("Error saat ingin menambahkan ke keranjang.");
};
</script>
<template>
	<div class="bg-white overflow-hidden rounded-2xl shadow">
		<div class="relative">
			<BgImageAsync class="aspect-square" :src="img" />
			<div class="absolute top-0 left-0 w-full h-full card-img-gradient"></div>
			<div :class="{ 'left-0': !showBuyForm, '-left-full': showBuyForm }" class="absolute top-0 w-full h-full flex flex-col justify-end transition-all duration-300">
				<div class="p-4">
					<button type="button" @click="showBuyForm = true" class="flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
						<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
						<span class="text-sm font-semibold">Beli</span>
					</button>
				</div>
			</div>
			<div :class="{ 'left-full': !showBuyForm, 'left-0': showBuyForm }" class="absolute top-0 w-full h-full flex flex-col justify-end transition-all duration-300">
				<div class="p-4">
					<button type="button" @click="showBuyForm = false" class="flex justify-center items-center text-black rounded px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-white">
						<font-awesome-icon icon="fa-solid fa-angle-left" />
						<span class="ml-2">Kembali</span>
					</button>
				</div>
			</div>
		</div>
		<div class="relative">
			<div class="p-4">
				<h6 class="text-2xl font-bold text-black/90">{{ title }}</h6>
				<div class="py-4 px-2 mb-4">
					<p class="text-sm text-black/70 mb-4">{{ textDescription }}</p>
					<p class="text-sm text-black/80 flex items-center mb-4">Stok tersisa <span class="font-semibold border rounded px-2 py-1 mx-2 text-lg">{{ stock }}</span> ekor</p>
					<p class="font-semibold text-lg whitespace-nowrap text-primary-800">{{ textPrice }}</p>
				</div>
				<router-link :to="routeDetail" class="flex justify-center items-center rounded px-3 py-1 hover-margin bg-black/90 text-white hover:text-primary-500">
					<span class="text-sm font-semibold">Lebih banyak</span>
					<span class="text-xl ml-2"><font-awesome-icon icon="fa-solid fa-angle-down" /></span>
				</router-link>
			</div>
			<div :class="{ 'top-full': !showBuyForm, 'top-0': showBuyForm }" class="absolute left-0 w-full h-full transition-all duration-300 p-4 bg-white">
				<h6 class="text-2xl font-bold text-black/90 mb-4">{{ title }}</h6>
				<div class="mb-4">
					<label class="text-black/90 text-sm font-medium" for="jumlahItem">Jumlah item:</label>
					<div class="flex items-center mt-2">
						<div class="grow">
							<input type="number" id="jumlahItem" class="block w-full py-1 px-2 border border-black/10 hover:border-black/20 focus:border-black/20 rounded text-center" v-model="itemCount">
						</div>
						<span class="text-sm font-medium text-black/70 ml-2 mr-1">dari</span>
						<span class="text-sm font-bold text-black/70">{{ stock }}</span>
					</div>
				</div>
				<div class="mb-8">
					<label class="text-black/90 text-sm font-medium" for="totalItem">Total:</label>
					<input type="text" :value="textTotalPrice" id="totalItem" class="block w-full py-1 px-2 border border-green-30 text-green-800 text-lg rounded text-center" disabled>
				</div>
				<div class="flex justify-end">
					<button @click="addToCart" type="button" class="flex justify-center items-center text-black rounded px-3 py-1 hover-margin bg-green-500 hover:bg-green-400">
						<span class="text-xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
						<span class="text-sm font-semibold">Beli</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	
.card-img-gradient {
	background-image: radial-gradient(circle at 50% 20%, transparent 30%, rgba(20,20,20,0.6) 100%)
}

</style>