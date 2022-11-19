<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";

const onSearchFormSubmit = (event) => {
	const formElm = event.target;
	console.log(formElm["keyword"].value);
};
</script>
<template>
	<BasicLayout>
		<template #main>
			<header class="h-[451px] relative w-full overflow-hidden">
				<div class="absolute top-0 left-0 w-full h-full bg-black/20 flex">
					<div class="m-auto flex flex-col items-center">
						<img src="/assets/img/text-hero.webp" class="w-2/3 md:w-[20rem] mb-10">
						<form @submit.prevent="onSearchFormSubmit">
							<div class="flex">
								<div class="grid grow md:w-[30rem] mr-2 lg:mr-4">
									<input type="search" class="block w-full h-full px-6 text-sm font-semibold rounded transition-color bg-gray-200 hover:bg-white focus:bg-white" placeholder="Cari...">
								</div>
								<button class="px-3 py-2 rounded text-xl transition-color text-white hover:text-primary-700 bg-black">
									<font-awesome-icon icon="fa-solid fa-search" />
								</button>
							</div>
						</form>
					</div>
				</div>
			</header>
			<div class="bg-white pt-16 pb-8">
				<div class="container">
					<div class="flex justify-center items-center mb-12">
						<div class="w-36 border-b border-gray-500 hidden md:block"></div>
						<h3 class="text-2xl tracking-widest font-bold text-center mx-8">PRODUK KAMI</h3>
						<div class="w-36 border-b border-gray-500 hidden md:block"></div>
					</div>
					<div class="relative mb-16">
						<div class="grid grid-cols-1 md:grid-cols-4 h-48">
							<BgImageAsync src="/assets/img/bali-bima.webp" />
							<BgImageAsync src="/assets/img/limousin-abang.webp" class="hidden md:block" />
							<BgImageAsync src="/assets/img/simental-buyung.webp" class="hidden md:block" />
							<BgImageAsync src="/assets/img/kerbau belang-sopai.webp" class="hidden md:block" />
						</div>
						<div class="absolute w-full h-full top-0 left-0 bg-black/70 px-8 py-4 flex justify-center items-center">
							<p class="text-center font-semibold text-white text-xl text-shadow-black">Kami menyediakan semen beku sapi dan kerbau dengan berbagai pilihan jenis sapi.</p>
						</div>
					</div>
					<div class="flex flex-col items-center mb-16">
						<div class="mb-6">
							<router-link to="/product" class="block text-xl font-semibold px-6 py-3 bg-primary-500 rounded hover:bg-primary-400 hover-margin">MULAI BELANJA</router-link>
						</div>
						<h2 class="text-3xl text-primary-600 tracking-wider font-bold text-center">AYO BELANJA DI APLIKASI SILAJUE</h2>
					</div>
				</div>
				<div class="lg:container mb-32">
					<img src="/assets/img/distribution-flow.png">
				</div>
				<div class="container mb-32">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h6 class="text-4xl text-gray-900 font-bold">Feedback</h6>
							<p class="text-gray-600 mb-12">Review dari pengguna layanan kami.</p>
							<div class="flex flex-col gap-8">
								<div class="grid grid-cols-[auto_1fr] gap-4">
									<div class="flex justify-center items-center">
										<BgImageAsync src="/assets/img/person_2.jpg" class="feedback-avatar" />
									</div>
									<div class="feedback-text">
										<p class="feedback-name">Gibran Giffar</p>
										<p class="feedback-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ad.</p>
									</div>
								</div>
								<div class="grid grid-cols-[auto_1fr] gap-4">
									<div class="flex justify-center items-center">
										<BgImageAsync src="/assets/img/person_3.jpg" class="feedback-avatar" />
									</div>
									<div class="feedback-text">
										<p class="feedback-name">Ali Sadikin</p>
										<p class="feedback-message">Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, debitis! Nisi, facilis.</p>
									</div>
								</div>
								<div class="grid grid-cols-[auto_1fr] gap-4">
									<div class="flex justify-center items-center">
										<BgImageAsync src="/assets/img/person_1.jpg" class="feedback-avatar" />
									</div>
									<div class="feedback-text">
										<p class="feedback-name">Amalia Ramadhani</p>
										<p class="feedback-message">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h6 class="text-2xl text-gray-700 font-semibold my-4">Bagikan respons anda</h6>
							<div class="px-8 py-16 bg-white shadow-lg rounded border">
								<form>
									<div class="grid grid-cols-1 gap-4 mb-8">
										<div class="input-group">
											<label for="inputName">Nama Lengkap</label>
											<input type="text" id="inputName">
										</div>
										<div class="input-group">
											<label for="inputEmail">Email</label>
											<input type="email" id="inputEmail">
										</div>
										<div class="input-group">
											<label for="inputComment">Komentar</label>
											<textarea id="inputComment" rows="4"></textarea>
										</div>
									</div>
									<div class="flex justify-end">
										<button type="button" class="px-4 py-2 rounded text-white font-semibold hover-margin bg-primary-600 hover:bg-primary-500">Kirim</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
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

.feedback-avatar {
	@apply w-16 h-16 rounded-full overflow-hidden;
}

.feedback-text {
	@apply flex flex-col justify-center;
}

.feedback-name {
	@apply font-bold text-gray-800;
}

.feedback-message {
	@apply text-sm text-gray-600;
}

</style>