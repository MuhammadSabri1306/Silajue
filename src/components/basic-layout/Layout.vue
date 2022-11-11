<script setup>
import { computed, useSlots } from "vue";
import { useRouter } from "vue-router";
import { useViewStore } from "@/stores/view";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";

const navItems = [
	{ title: "Beranda", target: "/", routeItems: ["beranda"] },
	{ title: "Tentang", target: "/about", routeItems: ["tentang"] },
	{ title: "Produk", target: "/product", routeItems: ["produk", "produkKategori", "produkDetail"] },
	{ title: "Blog", target: "/blog", routeItems: ["blog", "blogDetail"] },
	{ title: "Panduan", target: "/guide", routeItems: ["panduan"] }
];

const router = useRouter();
const navigateTo = to => router.push(to);
const login = () => router.push("/login");
const toProfile = () => router.push("/user");
const logout = () => {
	console.log("Button Logout was clicked");
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
			<Navbar :navItems="navItems" @navigate="navigateTo" @login="login" @logout="logout" @toProfile="toProfile" class="border-b" />
			<slot name="topbar"></slot>
		</nav>
		<div :style="{ marginLeft: contentLeft }" class="flex flex-col content-wrapper w-screen">
			<main class="grow">
				<slot name="main"></slot>
			</main>
			<Footer />
		</div>
		<Sidebar :navItems="navItems" @navigate="navigateTo" @login="login" @logout="logout" @toProfile="toProfile" />
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

</style>