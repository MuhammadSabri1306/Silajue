<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useViewStore } from "@/stores/view";

defineEmits(['navigate', 'login', 'logout', 'toProfile']);
const props = defineProps({
	navItems: { type: Array, required: true }
});


const route = useRoute();
const getNavActiveClass = routeItems => {
	if(routeItems.indexOf(route.name) >= 0)
		return ["active"];
	return null;
};

const viewStore = useViewStore();
const sidebarWidth = viewStore.sidebarWidth;

const isSidebarShow = computed(() => viewStore.showSidebar);
const navLeft = computed(() => {
	if(viewStore.showSidebar === true)
		return sidebarWidth;
	return 0;
});

const toggleSidebar = () => viewStore.toggleShowSidebar();
</script>
<template>
	<div class="px-6 md:px-8 lg:px-12">
		<div class="flex">
			<RouterLink to="/" class="mr-auto">
				<h4 class="nav-brand"><span>S</span>ILAJUE</h4>
			</RouterLink>
			<ul class="nav-menu">
				<li v-for="item in navItems" class="nav-link text-shadow-white hover-margin">
					<a role="button" :class="getNavActiveClass(item.routeItems)" @click="$emit('navigate', item.target)">{{ item.title }}</a>
				</li>
			</ul>
			<slot></slot>
			<div class="flex md:hidden">
				<button type="button" @click="toggleSidebar" class="text-2xl text-black p-2 my-auto">
					<font-awesome-icon v-if="!isSidebarShow" icon="fa-solid fa-bars" />
					<font-awesome-icon v-else icon="fa-solid fa-bars-staggered" />
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>

.nav-brand {
	text-shadow: 2px 1px #ffff00;
	@apply font-black tracking-widest text-gray-900 text-xl lg:text-2xl py-5;
}

.nav-brand > span {
	@apply text-3xl md:text-4xl font-bold;
}

.nav-menu {
	@apply hidden md:flex ml-auto;
}

.nav-link > a.active {
	@apply font-bold text-black;
}

.nav-link > a {
	@apply flex items-center text-gray-800 font-semibold h-full;
}

.nav-link > a {
	@apply font-medium text-sm xl:text-base px-4 lg:px-6;
}

</style>