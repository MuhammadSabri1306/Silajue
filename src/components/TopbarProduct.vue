<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const categories = computed(() => productStore.categories);
const showTopbar = computed(() => productStore.categories && productStore.categories.length > 0);

if(categories.value.length < 1)
	productStore.fetchCategories();
</script>
<template>
	<nav v-if="showTopbar" class="topbar">
		<ul class="flex md:justify-center">
			<li>
				<div class="scroll-icon">
					<font-awesome-icon icon="fa-solid fa-arrows-left-right" fixed-width />
				</div>
			</li>
			<li class="topbar-item">
				<router-link to="/product">Semua</router-link>
			</li>
			<li v-for="item in categories" class="topbar-item">
				<router-link :to="'/product/category/' + item.id">{{ item.name }}</router-link>
			</li>
		</ul>
	</nav>
</template>
<style scoped>
	
.topbar {
	@apply bg-green-600 shadow-sm w-full overflow-x-auto border-t;
}

.scroll-icon {
	@apply flex justify-center items-center h-full md:hidden px-6 text-lg;
}

.topbar-item a {
	@apply block px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10;
}

.scroll-icon,
.topbar-item a {
	@apply text-gray-100;
}

.topbar-item a.active {
	@apply text-primary-700;
}

</style>