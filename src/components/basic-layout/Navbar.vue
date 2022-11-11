<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
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
			<RouterLink to="/">
				<h4 class="nav-brand"><span>S</span>ILAJUE</h4>
			</RouterLink>
			<div class="flex md:hidden ml-auto">
				<button type="button" @click="toggleSidebar" class="text-2xl text-black p-2 my-auto">
					<font-awesome-icon v-if="!isSidebarShow" icon="fa-solid fa-bars" />
					<font-awesome-icon v-else icon="fa-solid fa-bars-staggered" />
				</button>
			</div>
			<ul class="nav-menu">
				<li v-for="item in navItems" class="nav-link text-shadow-white hover-margin">
					<a role="button" :class="getNavActiveClass(item.routeItems)" @click="$emit('navigate', item.target)">{{ item.title }}</a>
				</li>
			</ul>
			<div class="mx-6 hidden md:flex">
				<a v-if="isRolePublic" role="button" class="nav-btn my-auto" @click="$emit('login')">Log In</a>
				<div v-else class="relative">
					<a :class="{ 'hover-margin': !expandUserMenu }" class="block w-8 h-8 rounded-full overflow-hidden text-black flex bg-no-repeat bg-center bg-cover opacity-80 hover:opacity-100 focus:opacity-100" role="button" @click.stop="expandUserMenu = !expandUserMenu">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 m-auto"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" /></svg>
					</a>
					<div :class="{ 'hidden': !expandUserMenu }" class="navbar-collapse">
						<a role="button" @click.stop="$emit('toProfile')" class="btn-profile">
							<span class="icon">
								<font-awesome-icon icon="fa-regular fa-face-smile" fixed-width />
							</span>
							<span>Profil</span>
						</a>
						<a role="button" @click.stop="$emit('logout')" class="btn-logout">
							<span class="icon">
								<font-awesome-icon icon="fa-regular fa-share-from-square" />
							</span>
							<span>Logout</span>
						</a>
					</div>
				</div>
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

.nav-btn {
	@apply whitespace-nowrap rounded py-2 px-6 text-white font-medium text-sm xl:text-base transition-colors bg-primary-600 hover:bg-gray-900;
}

.navbar-collapse {
	@apply absolute top-full right-0 min-w-[10rem] mt-2 bg-white rounded border shadow-lg overflow-hidden grid grid-cols-1;
}

.btn-profile > span.icon,
.btn-logout > span.icon {
	@apply text-xl mr-2;
}

.btn-profile > span:not(.icon),
.btn-logout > span:not(.icon) {
	@apply text-xs font-semibold;
}

.btn-profile {
	@apply border-b px-6 py-2 inline-flex items-center opacity-80 hover:opacity-100 active:opacity-100 bg-white hover:bg-gray-100 focus:bg-gray-100;
}

.btn-logout {
	@apply px-6 py-2 inline-flex items-center opacity-80 hover:opacity-100 active:opacity-100 bg-white hover:bg-gray-100 focus:bg-gray-100;
}

.btn-profile > span.icon {
	@apply text-primary-700;
}

.btn-logout > span.icon {
	@apply text-danger-700;
}

</style>