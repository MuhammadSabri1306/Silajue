<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

defineProps({
	activeNav: { type: Number, default: 0 }
});

const sidebarItem = [
	{ to: "/app", title: "Data Produk", icon: "fa-solid fa-star" },
	{ to: "/app", title: "Kategori Produk", icon: "fa-solid fa-tags" },
	{ to: "/app", title: "Invoice", icon: "fa-solid fa-bookmark" },
	{ to: "/app", title: "Halaman Blog", icon: "fa-solid fa-thumbtack" },
	{ to: "/app", title: "Data Pengguna", icon: "fa-solid fa-user" },
	{ to: "/app", title: "Sosial", icon: "fa-solid fa-thumbs-up" }
];

const toggleSidebar = ref(false);

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

const router = useRouter();
const userStore = useUserStore();
const onLogout = () => {
	userStore.logout();
	router.push("/");
};
</script>
<template>
	<div id="dashbWrapper" :class="{ 'toggle-sidebar': toggleSidebar }">
		<nav class="sidebar">
			<router-link to="/app" class="nav-brand text-shadow-black">
				<h6>E-Market <span class="text-primary-600">Silajue</span></h6>
				<p>Pasar Bibit Ternak Daring</p>
			</router-link>
			<ul class="sidebar-menu">
				<li v-for="(item, index) in sidebarItem">
					<router-link :to="item.to" :class="{ 'active': activeNav == index }">
						<span class="icon"><font-awesome-icon :icon="item.icon" fixed-width /></span>
						<span>{{ item.title }}</span>
					</router-link>
				</li>
			</ul>
		</nav>
		<div id="content">
			<nav class="navbar flex">
				<button type="button" @click="toggleSidebar = !toggleSidebar" class="navbar-item">
					<span class="icon">
						<font-awesome-icon v-if="!toggleSidebar" icon="fa-solid fa-bars" fixed-width />
						<font-awesome-icon v-else icon="fa-solid fa-bars-staggered" fixed-width />
					</span>
				</button>
				<div class="relative">
					<button @click.stop="expandUserMenu = !expandUserMenu" class="navbar-item">
						<span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 m-auto"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" /></svg></span>
					</button>
					<Transition name="fade">
						<div v-show="expandUserMenu" class="navbar-collapse">
							<router-link to="/user" class="collapse-item">
								<div class="icon text-primary-500">
									<font-awesome-icon icon="fa-regular fa-face-smile" fixed-width />
								</div>
								<div>
									<h6 class="text-primary-700">Profil</h6>
									<p>Lihat Profil saya</p>
								</div>
							</router-link>
							<a role="button" @click.stop="logout" class="collapse-item">
								<div class="icon text-red-500">
									<font-awesome-icon icon="fa-regular fa-share-from-square" fixed-width />
								</div>
								<div>
									<h6 class="text-red-700">Log Out</h6>
									<p>Keluar dari Akun saya</p>
								</div>
							</a>
						</div>
					</Transition>
				</div>
				<router-link to="/" class="ml-auto navbar-item flex items-center">
					<span class="icon"><font-awesome-icon icon="fa-regular fa-newspaper" fixed-width /></span>
					<span class="text-xs font-medium ml-2">Buka Beranda</span>
				</router-link>
			</nav>
			<main class="grow p-8">
				<slot name="main"></slot>
			</main>
			<footer class="px-8 py-4">
				<p class="text-sm font-medium text-gray-600 text-center md:text-end"><span class="whitespace-nowrap">&copy; Liny Jaya Informatika 2022.</span> <span class="whitespace-nowrap">All Rights Reserved.</span></p>
			</footer>
		</div>
	</div>
</template>
<style scoped>
	
body {
	@apply bg-white;
}

body,
body > #app,
body > #app > div,
#dashbWrapper {
	@apply h-screen bg-gray-100;
}

#dashbWrapper {
	@apply w-screen flex overflow-x-hidden;
}

.sidebar {
	@apply fixed md:static h-screen top-0 left-[-18rem] w-[18rem] z-[10] bg-gray-900 overflow-x-hidden ml-0;
	transition: left 0.3s, margin-left 0.3s;
}

.toggle-sidebar .sidebar {
	@apply left-0 md:ml-[-18rem];
}

.nav-brand {
	@apply text-gray-100 flex flex-col mr-auto p-4;
}

.nav-brand h6 {
	@apply text-xl md:text-2xl font-bold;
}

.nav-brand p {
	@apply text-xs md:text-sm leading-none;
}

.sidebar-menu {
	@apply mb-16 mt-8 flex flex-col;
}

.sidebar-menu a {
	@apply px-8 py-3 grid grid-cols-[2rem_1fr] items-center gap-4 text-xs font-medium text-gray-100 bg-transparent hover:bg-gray-800/50;
}

.sidebar-menu a.active {
	@apply text-primary-600 text-base whitespace-nowrap;
}

.sidebar-menu .icon {
	@apply text-lg;
}

#content {
	@apply w-screen md:w-auto md:grow ml-0 h-screen text-gray-800 flex flex-col items-stretch relative;
	transition: margin-left 0.3s;
}

.toggle-sidebar #content {
	@apply ml-[18rem] md:ml-0;
}

.navbar {
	@apply flex sticky top-0 left-0 bg-white px-4 border-b;
}

.navbar-item {
	@apply p-4 mt-2 transition-colors text-gray-500 hover:text-gray-700 whitespace-nowrap;
}

.navbar-item .icon {
	@apply text-xl flex justify-center items-center;
}

.navbar-collapse {
	@apply absolute top-full right-0 min-w-[16rem] mt-2 bg-white rounded border shadow-lg overflow-hidden grid grid-cols-1;
}

.navbar-collapse > *:not(:last-child) {
	@apply border-b;
}

.collapse-item {
	@apply px-6 py-4 flex items-center opacity-80 hover:opacity-100 active:opacity-100 bg-white hover:bg-gray-100 focus:bg-gray-100;
}

.collapse-item > .icon {
	@apply text-2xl mr-4;
}

.collapse-item h6 {
	@apply text-lg lg:text-sm font-bold mb-1;
}

.collapse-item p {
	@apply text-xs font-semibold;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin-top 0.3s, margin-bottom 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-4 mb-4;
}

</style>