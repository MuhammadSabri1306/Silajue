<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useViewStore } from "@/stores/view";
import TransitionTopDown from "./transitions/TransitionTopDown.vue";

const route = useRoute();
const viewStore = useViewStore();

const isNavToggle = ref(false);
const onNavToggle = () => {
	isNavToggle.value = !isNavToggle.value;
};

const getNavActiveClass = (navName) => {
	if(route.name == "beranda" && navName == "beranda")
		return ["active"];
	if(route.name == "profil" && navName == "profil")
		return ["active"];
	if(["produk", "produkDetail", "produkForm"].indexOf(route.name) >= 0 && navName == "produk")
		return ["active"];
	if(["blog", "blogDetail", "blogForm"].indexOf(route.name) >= 0 && navName == "blog")
		return ["active"];

	return null;
};

const searchElm = ref(null);
const isSearchShow = ref(false);

const showSearch = () => {
	isSearchShow.value = true;
	nextTick(() => searchElm.value.focus());
};

const onSearchFormSubmit = (event) => {
	const formElm = event.target;
	console.log(formElm["keyword"].value);
};

const navElm = ref(null);
const navHeight = ref(0);

const onSearchFormLostFocus = (event) => {
	if(!event.relatedTarget)
		isSearchShow.value = false;
};

onMounted(() => {
	if(navElm.value.offsetHeight)
		navHeight.value = navElm.value.offsetHeight;

	document.body.classList.add("bg-primary-500");
});

const onRouteChange = () => isNavToggle.value = false;

watch(() => isNavToggle.value, (val) => {
	if(val === true)
		document.body.style.overflowY = "hidden";
	else
		document.body.style.overflowY = "auto";
});
</script>
<template>
	<div id="basicWrapper" class="w-full flex max-w-[100vw] overflow-x-hidden" :class="{ 'side-collapsed': isNavToggle }">
		<div class="nav-side-wrapper">
				<nav class="pb-8 h-screen" :style="{ paddingTop: 'calc(' + navHeight + 'px + 3rem)' }">
					<ul class="nav-side">
						<li class="nav-link hover-margin">
							<router-link to="/" :class="getNavActiveClass('beranda')" @click="onRouteChange">Beranda</router-link>
						</li>
						<li class="nav-link text-shadow-white hover-margin">
							<router-link to="/profil" :class="getNavActiveClass('profil')" @click="onRouteChange">Profil</router-link>
						</li>
						<li class="nav-link text-shadow-white hover-margin">
							<router-link to="/produk" :class="getNavActiveClass('produk')" @click="onRouteChange">Produk</router-link>
						</li>
						<li class="nav-link text-shadow-white hover-margin">
							<router-link to="/blog" :class="getNavActiveClass('blog')" @click="onRouteChange">Blog</router-link>
						</li>
						<li class="nav-link text-shadow-white hover-margin">
							<a href="#">Panduan</a>
						</li>
					</ul>
				</nav>
			</div>
		<div class="flex flex-col content-wrapper">
			<TransitionTopDown>
				<div v-if="isSearchShow" class="fixed w-screen top-0 left-0 z-[3] max-w-[100%] px-4">
					<form class="block relative" :style="{ height: navHeight + 'px' }" @focusout.capture="onSearchFormLostFocus" @submit.prevent="onSearchFormSubmit">
						<input ref="searchElm" type="search" name="keyword" class="w-full h-full bg-white pl-4 pr-14" placeholder="Masukkan keyword...">
						<button type="submit" class="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-full text-2xl">
							<font-awesome-icon icon="fa-solid fa-magnifying-glass" fixed-width />
						</button>
					</form>
				</div>
			</TransitionTopDown>
			<nav ref="navElm" class="bg-primary-500 shadow-sm z-[2] fixed top-0 left-0 w-screen">
				<div class="py-5 px-6 md:px-8 lg:px-12">
					<div class="flex items-center">
						<div>
							<a href="#" class="nav-brand hidden md:flex flex-col text-shadow-white group">
								<span class="text-2xl font-bold transition-all ml-0 group-hover:ml-4">Sistem Informasi Silajue</span>
								<span class="text-sm leading-none transition-all ml-0 group-hover:ml-8">Penjualan Elektronik</span>
							</a>
							<a href="#" class="nav-brand flex flex-col md:hidden text-shadow-white group">
								<span class="leading-none font-bold transition-all ml-0 group-hover:ml-4">Sistem Informasi</span>
								<span class="text-4xl font-bold transition-all -ml-[0.15rem] group-hover:ml-8">SILAJUE</span>
								<span class="text-sm leading-none transition-all ml-0 group-hover:ml-4">Penjualan Elektronik</span>
							</a>
						</div>
						<button class="text-2xl text-black p-2 ml-auto lg:hidden" @click="showSearch">
							<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
						</button>
						<button class="text-2xl text-black p-2 ml-4 lg:hidden" @click="onNavToggle">
							<font-awesome-icon v-if="!isNavToggle" icon="fa-solid fa-bars" />
							<font-awesome-icon v-else icon="fa-solid fa-bars-staggered" />
						</button>
						<ul class="nav-menu">
							<li class="nav-link hover-margin">
								<router-link to="/" :class="getNavActiveClass('beranda')">Beranda</router-link>
							</li>
							<li class="nav-link text-shadow-white hover-margin">
								<router-link to="/profil" :class="getNavActiveClass('profil')">Profil</router-link>
							</li>
							<li class="nav-link text-shadow-white hover-margin">
								<router-link to="/produk" :class="getNavActiveClass('produk')">Produk</router-link>
							</li>
							<li class="nav-link text-shadow-white hover-margin">
								<router-link to="/blog" :class="getNavActiveClass('blog')" @click="onRouteChange">Blog</router-link>
							</li>
							<li class="nav-link text-shadow-white hover-margin">
								<a href="#">Panduan</a>
							</li>
						</ul>
						<div class="ml-10 hidden md:inline hover-margin">
							<button class="nav-btn">Logout</button>
						</div>
					</div>
				</div>
			</nav>
			<main class="grow w-screen" :class="{ 'w-screen': isNavToggle }" :style="{ marginTop: navHeight + 'px' }">
				<slot name="main"></slot>
			</main>
			<footer class="bg-primary-500 py-16">
				<div class="px-6 md:px-8 lg:px-12">
					<div class="flex flex-col lg:flex-row">
						<div class="lg:max-w-[34rem] mb-16 lg:mb-0">
								<a href="#" class="nav-brand hidden md:flex flex-col text-shadow-white group mb-4">
									<span class="text-2xl font-bold transition-all ml-0 group-hover:ml-4">Sistem Informasi Silajue</span>
									<span class="text-sm leading-none transition-all ml-0 group-hover:ml-8">Penjualan Elektronik</span>
								</a>
								<p class="text-black text-sm mb-2">Alamat</p>
								<p class="text-black text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla eget euismod netus est accumsan.</p>
							</div>
						<div class="mx-auto">
							<p class="text-black text-sm text-shadow-white">Contact Us</p>
							<div class="flex items-center my-6 gap-6 text-3xl">
								<a href="#" class="text-black text-shadow-white hover-margin">
									<font-awesome-icon icon="fa-brands fa-facebook" />
								</a>
								<a href="#" class="text-black text-shadow-white hover-margin">
									<font-awesome-icon icon="fa-brands fa-instagram" />
								</a>
								<a href="#" class="text-black text-shadow-white hover-margin">
									<font-awesome-icon icon="fa-brands fa-twitter" />
								</a>
								<a href="#" class="text-black text-shadow-white hover-margin">
									<font-awesome-icon icon="fa-brands fa-whatsapp" />
								</a>
							</div>
							<div class="flex items-center text-shadow-white">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -scale-x-100"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
								<span class="text-black text-sm ml-2">0411 - 123456</span>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>
<style scoped>
	.nav-brand {
		@apply text-black;
	}

	.nav-menu {
		@apply bg-white border border-neutral-300 border hidden lg:flex flex-col pb-8 pt-12 rounded-t-2xl z-[9999] lg:pb-0 lg:pt-0 lg:rounded-t-none lg:py-0 lg:h-auto lg:w-auto lg:static lg:bg-transparent lg:border-0 lg:flex-row lg:items-center lg:ml-auto transition-all duration-300 ease-in-out;
	}

	.nav-menu.show {
		@apply bottom-0;
	}

	.nav-link > a.active {
		@apply font-bold text-black;
	}

	.nav-link > a {
		@apply block text-black/80 lg:inline py-2;
	}

	.nav-link > a, .nav-btn {
		@apply font-medium text-base xl:text-base px-6;
	}

	.nav-btn {
		@apply rounded-2xl py-2 bg-light-100 hover:bg-light-300;
	}

	.nav-side > .nav-link {
		@apply block text-black/80 lg:inline py-1 px-4;
	}

	.nav-side > .nav-link.active {
		@apply font-bold text-black;
	}

	#basicWrapper .nav-side-wrapper {
		@apply border border-neutral-300 border w-[60vw] md:w-[40vw] top-0 -left-full fixed bg-white z-[2] overflow-hidden;
		transition: left .3s;
	}

	#basicWrapper.side-collapsed .nav-side-wrapper {
		@apply left-0;
	}

	#basicWrapper .content-wrapper {
		@apply ml-0;
		transition: margin-left .3s;
	}

	#basicWrapper.side-collapsed .content-wrapper {
		@apply ml-[60vw] md:ml-[40vw];
	}
</style>