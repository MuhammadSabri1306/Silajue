<script setup>
import { computed, useSlots } from "vue";
import { useRouter } from "vue-router";
import { useViewStore } from "@/stores/view";
import { useUserStore } from "@/stores/user";
import Navbar from "./Navbar.vue";
import CollapseUser from "./CollapseUser.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";

const navItems = [
	{ title: "Beranda", target: "/", routeItems: ["beranda"] },
	{ title: "Tentang", target: "/about", routeItems: ["tentang"] },
	{ title: "Produk", target: "/product", routeItems: ["produk", "produkKategori", "produkDetail"] },
	{ title: "Blog", target: "/blog", routeItems: ["blog", "blogDetail"] },
	{ title: "Panduan", target: "/guide", routeItems: ["panduan"] }
];

const userStore = useUserStore();
const isRolePublic = computed(() => userStore.isRolePublic);

const router = useRouter();
const navigateTo = to => router.push(to);
const logout = () => {
	userStore.logout();
	router.push("/login");
};

const viewStore = useViewStore();
const sidebarWidth = viewStore.sidebarWidth;

const isSidebarShow = computed(() => viewStore.showSidebar);
const contentLeft = computed(() => {
	if(viewStore.showSidebar === true)
		return sidebarWidth;
	return 0;
});

const slots = useSlots();
const useTopbarSlot = computed(() => !!slots.topbar);
</script>
<template>
	<div id="basicWrapper" class="w-full max-w-[100vw] overflow-x-hidden relative">
		<nav :style="{ marginLeft: contentLeft }" class="navbar">
			<Navbar :navItems="navItems" @navigate="navigateTo" class="border-b" >
				<div class="mx-2 lg:mx-6 flex">
					<a v-if="isRolePublic" role="button" class="nav-btn my-auto" @click="navigateTo('/login')">Log In</a>
					<CollapseUser v-else class="my-auto" @logout="logout" @navigate="navigateTo" />
				</div>
			</Navbar>
			<slot name="topbar"></slot>
		</nav>
		<div :style="{ marginLeft: contentLeft }" class="flex flex-col content-wrapper w-screen">
			<main class="grow">
				<slot name="main"></slot>
			</main>
			<Footer />
		</div>
		<Sidebar :navItems="navItems" @navigate="navigateTo" @login="navigateTo('/login')" @logout="logout" @toProfile="navigateTo('/user')" />
	</div>
</template>
<style>

body {
	@apply bg-primary-500;
}

body,
body > #app,
body > #app > div,
#basicWrapper {
	@apply max-h-screen;
}

#basicWrapper {
	@apply text-gray-900;
}

#basicWrapper .content-wrapper {
	transition: margin-left .3s;
}

.navbar {
	@apply bg-white z-[2] sticky top-0 w-screen shadow-sm grid grid-cols-1;
	transition: margin-left 0.3s;
}

.nav-btn {
	@apply whitespace-nowrap rounded py-2 px-6 text-white font-medium text-sm xl:text-base transition-colors bg-primary-600 hover:bg-gray-900;
}

</style>