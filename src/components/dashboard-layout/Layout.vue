<script setup>
defineProps({
	activeNav: { type: Number, default: 0 }
});

const sidebarItem = [
	{ to: "/app", title: "Produk", icon: "fa-solid fa-star" },
	{ to: "/app", title: "Kategori Produk", icon: "fa-solid fa-tags" },
	{ to: "/app", title: "Invoice", icon: "fa-solid fa-bookmark" },
	{ to: "/app", title: "Artikel", icon: "fa-solid fa-thumbtack" },
	{ to: "/app", title: "Media Sosial", icon: "fa-solid fa-thumbs-up" }
];
</script>
<template>
	<div id="dashbWrapper">
		<nav class="sidebar">
			<router-link to="/app" class="nav-brand text-shadow-black">
				<h6>E-Market <span class="text-primary-600">Silajue</span></h6>
				<p>Pasar Bibit Ternak Daring</p>
			</router-link>
			<ul class="sidebar-menu">
				<li v-for="(item, index) in sidebarItem">
					<router-link :to="item.to" :class="{ 'active': activeNav == index }">
						<span class="icon"><font-awesome-icon :icon="item.icon" /></span>
						<span>{{ item.title }}</span>
					</router-link>
				</li>
			</ul>
		</nav>
		<main>
			<slot name="main"></slot>
		</main>
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

#dashbWrapper main {
	@apply max-h-screen text-gray-800;
}

.sidebar {
	@apply w-[18rem] bg-gray-900;
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
	@apply px-8 py-4 grid grid-cols-[2rem_1fr] items-center gap-4 text-sm font-medium text-gray-100 bg-transparent hover:bg-gray-800/50;
}

.sidebar-menu .icon {
	@apply text-xl;
}

.sidebar-menu a.active {
	@apply text-primary-600 font-semibold;
}

</style>