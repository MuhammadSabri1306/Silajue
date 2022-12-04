<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";

const emit = defineEmits(['navigate']);
const props = defineProps({
	navItems: { type: Array, required: true }
});

const route = useRoute();
const getNavActiveClass = routeItems => {
	if(routeItems.indexOf(route.name) >= 0)
		return ["active"];
	return null;
};

const expandUserMenu = ref(false);
const onUserMenuLostFocus = event => {
	expandUserMenu.value = false;
};

onMounted(() => {
	document.addEventListener("click", onUserMenuLostFocus);
});

onUnmounted(() => {
	document.removeEventListener("click", onUserMenuLostFocus);
});

const userStore = useUserStore();
const isRolePublic = computed(() => userStore.isRolePublic);

const viewStore = useViewStore();
const sidebarWidth = viewStore.sidebarWidth;

const navLeft = computed(() => {
	if(viewStore.showSidebar !== true)
		return `-${ sidebarWidth }`;
	return 0;
});

const hideSidebar = () => viewStore.toggleShowSidebar(false);
const navigate = to => {
	hideSidebar();
	emit("navigate", to);
};
</script>
<template>
	<nav :style="{ left: navLeft, width: sidebarWidth }" class="sidebar">
		<div class="flex justify-end border-b py-2">
			<button type="button" @click="hideSidebar" class="text-lg py-4 px-8 text-gray-400">
				<font-awesome-icon icon="fa-solid fa-x" />
			</button>
		</div>
		<div class="py-4">
			<ul class="nav-menu mb-8">
				<li v-for="item in navItems" class="nav-link">
					<a role="button" :class="getNavActiveClass(item.routeItems)" @click="navigate(item.target)">{{ item.title }}</a>
				</li>
			</ul>
			<ul class="nav-menu items-start px-4 gap-2">
				<a v-if="isRolePublic" role="button" class="nav-btn" @click="navigate('/login')">Log In</a>
			</ul>
		</div>
	</nav>
</template>
<style scoped>
	
.sidebar {
	@apply bg-white border-r pl-8 shadow fixed h-screen top-0;
	transition: left 0.3s;
}

.nav-menu {
	@apply flex flex-col;
}

.nav-link > a {
	@apply block py-2 pl-4 border-r-4 border-transparent text-lg;
}

.nav-link > a.active {
	@apply text-primary-700 border-primary-600 font-semibold;
}

.nav-btn {
	@apply whitespace-nowrap rounded py-2 px-6 text-white transition-colors bg-primary-600 hover:bg-gray-900;
}

</style>