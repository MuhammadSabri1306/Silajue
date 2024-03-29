<script setup>
import { ref } from "vue";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import http from "@/modules/http-common";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";

const { data, v$ } = useDataForm({
	name: { value: null, required },
	email: { value: null, required },
	comment: { value: null, required }
});

const viewStore = useViewStore();
const hasFeedbackSubmitted = ref(false);

const onFeedbackSubmit = async () => {
	hasFeedbackSubmitted.value = true;
	const isValid = await v$.value.$validate();
	
	if(!isValid)
		return;
	const { name, email, comment } = data;
	http.post("/feedback", { name, email, comment })
		.then(response => {
			hasFeedbackSubmitted.value = false;
			viewStore.showToast("sendAppExp", true);
			data.comment = null;
		}).catch(err => {
			console.error(err);
			hasFeedbackSubmitted.value = false;
			viewStore.showToast("sendAppExp", false);
		})
};

const onSearchFormSubmit = (event) => {
	const formElm = event.target;
	console.log(formElm["keyword"].value);
};

</script>
<template>
	<BasicLayout>
		<template #main>
			<header class="border-b border-gray-300">
				<BgImageAsync src="/assets/img/banner-landscape.jpg" :preview="false" class="w-full aspect-[2/1] hidden lg:block" />
				<BgImageAsync src="/assets/img/banner-portrait.jpg" :preview="false" class="w-full aspect-[2/3] lg:hidden" />
			</header>
			<div class="relative">
				<div class="-mt-[5vw] lg:-mt-[3vw] mb-[5vw] lg:mb-[3vw] container pb-8 flex justify-center items-center">
					<div class="flex flex-col lg:flex-row gap-4 justify-center items-center bg-white rounded-3xl border border-gray-400 p-6 shadow">
						<img src="/assets/img/logo-ib.png" alt="Logo Inseminasi Buatan" class="h-28">
						<div>
							<p class="text-xl font-light text-gray-900 text-center lg:text-left mb-2 lg:mb-0">UPT Pelayanan Inseminasi Buatan dan Produk Semen</p>
							<p class="text-lg text-gray-900 font-bold text-center lg:text-left mb-2 lg:mb-0">Dinas Peternakan dan Kesehatan Hewan</p>
							<p class="text-lg text-primary-700 font-bold text-center lg:text-left mb-2 lg:mb-0">Provinsi Sulawesi Selatan</p>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-white mt-16 mb-8">
				<div class="container">
					<div class="flex justify-center items-center relative z-[1]">
						<div class="w-36 border-b border-gray-500 hidden md:block"></div>
						<!-- <h3 class="text-2xl tracking-widest font-bold text-center mx-8">PRODUK KAMI</h3> -->
						<img src="/assets/img/icon.svg" class="w-36 drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]" alt="">
						<div class="w-36 border-b border-gray-500 hidden md:block"></div>
					</div>
					<div class="relative -mt-12 mb-16">
						<div class="grid grid-cols-1 md:grid-cols-4 h-48">
							<BgImageAsync src="/assets/img/bali-bima.webp" />
							<BgImageAsync src="/assets/img/limousin-abang.webp" class="hidden md:block" />
							<BgImageAsync src="/assets/img/simental-buyung.webp" class="hidden md:block" />
							<BgImageAsync src="/assets/img/kerbau belang-sopai.webp" class="hidden md:block" />
						</div>
						<div class="absolute w-full h-full top-0 left-0 bg-black/70 px-8 py-4 flex justify-center items-center">
							<p class="text-center font-semibold text-white text-xl text-shadow-black">Kami menyediakan semen beku sapi, kerbau, kuda, dan kambing.</p>
						</div>
					</div>
					<div class="flex flex-col items-center mb-16 md:mb-32">
						<div class="mb-6">
							<router-link to="/product" class="block text-xl font-semibold px-6 py-3 bg-primary-500 rounded hover:bg-primary-400 hover-margin">MULAI BELANJA</router-link>
						</div>
						<h2 class="text-3xl text-primary-600 tracking-wider font-bold text-center">AYO BELANJA DI APLIKASI SILAJUE</h2>
					</div>
				</div>
				<div class="bg-gray-100">
					<div class="container py-16 mb-16 md:mb-32">
						<h2 class="text-2xl text-gray-900 tracking-wider font-bold mb-8">Alur Pembelian di Silajue</h2>
						<div class="flex flex-wrap justify-center items-end gap-8 mb-8">
							<div class="flow-card">
								<span class="flow-number">1</span>
								<font-awesome-icon icon="fa-brands fa-google-play" fixed-width />
								<span class="flow-text"><strong>Download Apps</strong><br>di <a href="https://play.google.com/store/apps/details?id=com.lni.silajue.app" target="_blank">Play Store</a> atau kunjungi situs resmi <a href="https://silajue.diskeswan.sulselprov.go.id/" target="_blank">Silajue</a>.</span>
							</div>
							<div class="flow-card">
								<span class="flow-number">2</span>
								<font-awesome-icon icon="fa-solid fa-child" fixed-width />
								<span class="flow-text"><strong>Registrasi dan Login.</strong><br>Pastikan memasukkan data diri dan alamat yang benar. Upload juga foto KTP anda untuk verifikasi pesanan anda nantinya.</span>
							</div>
						</div>
						<div class="flex flex-wrap justify-center items-start gap-8">
							<div class="flow-card">
								<span class="flow-number">3</span>
								<font-awesome-icon icon="fa-solid fa-cart-arrow-down" fixed-width />
								<span class="flow-text"><strong>Temukan produk</strong><br>semen beku yang kamu butuhkan.</span>
							</div>
							<div class="flow-card">
								<span class="flow-number">4</span>
								<font-awesome-icon icon="fa-solid fa-receipt" fixed-width />
								<span class="flow-text"><strong>Lakukan pembayaran</strong><br>lalu upload nota untuk verifikasi pesanan anda. Anda akan menerima <b>Nota Pengambilan</b>.</span>
							</div>
							<div class="flow-card">
								<span class="flow-number">5</span>
								<font-awesome-icon icon="fa-solid fa-warehouse" />
								<span class="flow-text">Anda dapat membawa<br><strong>Nota Pengambilan</strong><br>ke <b>Bank Sperma</b> di lokasi <a href="#">berikut</a>.</span>
							</div>
						</div>
					</div>
				</div>
				<div class="relative mb-32">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<BgImageAsync src="/assets/img/mockup.jpg" class="aspect-square md:aspect-auto md:h-full" />
						<!-- <div>
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
						</div> -->
						<div class="px-8 py-4">
							<h6 class="text-4xl text-gray-900 font-bold">Feedback</h6>
							<h6 class="text-2xl text-gray-700 font-semibold mb-4">Berikan komentar anda</h6>
							<div class="px-8 py-16 md:w-[23rem] bg-white shadow-lg rounded border">
								<form @submit.prevent="onFeedbackSubmit">
									<div class="grid grid-cols-1 gap-4 mb-8">
										<div class="input-group">
											<label for="inputName">Nama Lengkap</label>
											<input type="text" v-model="v$.name.$model" id="inputName">
										</div>
										<div class="input-group">
											<label for="inputEmail">Email</label>
											<input type="email" v-model="v$.email.$model" id="inputEmail">
										</div>
										<div class="input-group">
											<label for="inputComment">Komentar</label>
											<textarea v-model="v$.comment.$model" id="inputComment" rows="4"></textarea>
										</div>
									</div>
									<div class="flex justify-end">
										<button type="submit" class="px-4 py-2 rounded text-white font-semibold hover-margin bg-primary-600 hover:bg-primary-500">Kirim</button>
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

.flow-card {
	@apply bg-white rounded-xl shadow border relative px-6 pb-6 pt-8 flex items-center gap-4 md:w-2/3 lg:max-w-[20rem] lg:w-auto;
}

.flow-number {
	@apply text-xl font-bold border border-primary-600 text-primary-600 w-8 h-8 bg-white flex justify-center items-center rounded-full absolute -top-4 left-8;
}

.flow-card svg {
	@apply w-12 h-12 text-gray-400;
}

.flow-text {
	@apply text-sm font-medium text-gray-700 leading-6;
}

.flow-text strong {
	@apply text-xl font-bold text-primary-600;
}

.flow-text a {
	@apply font-bold transition-colors hover:text-primary-600;
}

</style>