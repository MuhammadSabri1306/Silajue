<script setup>

const onSearchFormSubmit = (event) => {
	const formElm = event.target;
	console.log(formElm["keyword"].value);
};
</script>
<template>
	<header class="h-[451px] relative w-full overflow-hidden">
		<div class="absolute top-0 left-0 w-full h-full bg-black/20 flex">
			<div class="m-auto flex flex-col items-center">
				<img src="/assets/img/text-hero.webp" class="w-2/3 md:w-[20rem] mb-10">
				<form class="hidden md:flex" @submit.prevent="onSearchFormSubmit">
					<div class="grid w-[30rem] mr-5">
						<input type="search" name="" class="block w-full h-10 px-6 text-sm rounded-[1.25rem] transition-color bg-gray-200 hover:bg-white focus:bg-white">
					</div>
					<button class="px-6 py-2 rounded-[1.25rem] text-base leading-none text-white text-shadow-black bg-primary-500 hover:bg-primary-600">Search</button>
				</form>
			</div>
		</div>
	</header>
	<div class="bg-white pt-16 pb-8">
		<div class="container">
			<div class="flex justify-center items-center mb-12">
				<div class="w-36 border-b border-gray-500 hidden md:block"></div>
				<h3 class="text-2xl tracking-widest font-bold text-center mx-8">DAFTAR KATEGORI</h3>
				<div class="w-36 border-b border-gray-500 hidden md:block"></div>
			</div>
			<div class="flex justify-center items-center gap-12 flex-wrap mb-16">
				<div class="category-item">
					<img src="/assets/img/kategori-sapi-circle.webp" class="rounded-full mb-4">
					<p class="text-center font-medium">Sapi</p>
				</div>
				<div class="category-item">
					<img src="/assets/img/kategori-kambing-circle.webp">
					<p>Kambing</p>
				</div>
				<div class="category-item">
					<img src="/assets/img/kategori-ayam-circle.webp">
					<p>Ayam</p>
				</div>
				<div class="category-item">
					<img src="/assets/img/kategori-domba-circle.webp">
					<p>Domba</p>
				</div>
				<div class="category-item">
					<img src="/assets/img/kategori-bebek-circle.webp">
					<p>Bebek</p>
				</div>
				<div class="category-item">
					<img src="/assets/img/kategori-ikan-circle.webp">
					<p>Ikan</p>
				</div>
			</div>
			<div class="flex flex-col items-center mb-16">
				<div class="mb-6">
					<router-link to="/product" class="block text-xl font-medium px-6 py-2 bg-primary-500 text-shadow-white hover:bg-primary-400 hover-margin">MULAI BELANJA</router-link>
				</div>
				<h2 class="text-3xl text-primary-600 tracking-wider font-bold text-center">AYO BELANJA DI APLIKASI SILAJUE</h2>
			</div>
		</div>
		<div class="container mx-auto py-8">
			<div class="flex justify-center items-center mb-8">
				<img src="/assets/img/selling-flow.svg" class="lg:w-3/4">
			</div>
		</div>
		<div class="container">
			<div class="flex justify-center">
				<div class="w-full lg:w-3/4 h-24 rounded-[3rem] bg-gray-200 flex justify-between items-center px-12">
					<p class="text-black text-center leading-none">
						<span class="text-2xl font-bold leading-none">1000</span><br>
						<span class="text-sm font-medium">Produk</span>
					</p>
					<p class="text-black text-center leading-none">
						<span class="text-2xl font-bold leading-none">1000</span><br>
						<span class="text-sm font-medium">Penyedia</span>
					</p>
					<p class="text-black text-center leading-none">
						<span class="text-2xl font-bold leading-none">1000</span><br>
						<span class="text-sm font-medium">Transaksi</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	header {
		background-image: url(/assets/img/bg-hero.jpg);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}

	.category-item {
		@apply w-28;
	}

	.category-item > img {
		@apply rounded-full mb-4;
	}

	.category-item > p {
		@apply text-center font-medium;
	}

	.category-item > img:hover {
		animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
	}

	@keyframes shake {
		10%, 90% { transform: translate3d(-1px, 0, 0); }
		20%, 80% { transform: translate3d(2px, 0, 0); }
		30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
		40%, 60% { transform: translate3d(4px, 0, 0); }
	}
</style>