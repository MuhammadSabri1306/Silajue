<template>
	<nav class="topbar">
		<ul class="flex md:justify-center">
			<li>
				<div class="scroll-icon">
					<font-awesome-icon icon="fa-solid fa-arrows-left-right" fixed-width />
				</div>
			</li>
			<li class="topbar-item">
				<a href="#">Semua</a>
			</li>
			<li class="topbar-item">
				<a href="#">Sapi Bali</a>
			</li>
			<li class="topbar-item">
				<a href="#">Sapi Limousin</a>
			</li>
			<li class="topbar-item">
				<a href="#">Sapi Simental</a>
			</li>
			<li class="topbar-item">
				<a href="#">Kerbau Belang</a>
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
	@apply block px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors hover:text-green-400;
}

.scroll-icon,
.topbar-item a {
	@apply text-gray-100;
}

.topbar-item a.active {
	@apply text-primary-700;
}

</style>