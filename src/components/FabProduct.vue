<script setup>
import { ref } from "vue";
import ProductCart from "@/components/ProductCart.vue";

const showCart = ref(false);
</script>
<template>
	<div>
		<div class="fixed bottom-0 md:bottom-8 lg:bottom-16 right-0 md:right-8 lg:right-16 shadow-sm md:rounded-lg overflow-hidden grid grid-cols-2">
			<button type="button" @click="showCart = true" class="btn-fab bg-black text-gray-100 group">
				<span class="mt-0 group-hover:-mt-1 mb-0 group-hover:mb-1">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
				</span>
			</button>
			<a target="_blank" href="https://wa.me/6285144392944" class="btn-fab bg-green-600 text-gray-100 group">
				<span class="mt-0 group-hover:-mt-1 mb-0 group-hover:mb-1">
					<font-awesome-icon icon="fa-brands fa-whatsapp" />
				</span>
			</a>
		</div>

		<ProductCart :class="{ 'right-0': showCart, 'right-[-110vw]': !showCart }" class="fixed top-0 h-screen w-screen md:w-[50vw] lg:w-auto bg-white border-l shadow z-[22] md:w-1/2 lg:w-1/3 overflow-y-auto transition-all duration-500" @hide="showCart = false" />

	</div>
</template>
<style scoped>

.btn-fab {
	@apply flex justify-center items-center w-16 h-16 text-2xl;
}

.btn-fab svg {
	width: 1em;
	height: 1em;
}

.btn-fab > * {
	transition: margin-top 0.3s, margin-bottom 0.3s;
}

</style>