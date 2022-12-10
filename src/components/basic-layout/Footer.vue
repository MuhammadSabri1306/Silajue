<script setup>
import { computed } from "vue";
import { useSocialStore } from "@/stores/social";

const socialStore = useSocialStore();

const urlFb = computed(() => socialStore.social && socialStore.social.facebook ? socialStore.social.facebook : "#");
const urlIg = computed(() => socialStore.social && socialStore.social.instagram ? socialStore.social.instagram : "#");
const urlTw = computed(() => socialStore.social && socialStore.social.twitter ? socialStore.social.twitter : "#");
const urlWa = computed(() => socialStore.social && socialStore.social.whatsapp ? "https://wa.me/" + socialStore.social.whatsapp : "#");
const textPhone = computed(() => socialStore.social && socialStore.social.phoneNumber ?  socialStore.social.phoneNumber : null);
</script>
<template>
	<footer class="bg-gray-900 pt-16 pb-8">
		<div class="px-6 md:px-8 lg:px-12 container">
			<div class="flex flex-col md:flex-row md:justify-between lg:justify-around items-center md:items-stretch">
				<div class="lg:max-w-[34rem] mb-16 lg:mb-0">
					<router-link to="/" class="flex items-center mb-16 mt-16 transition-opacity opacity-100 hover:opacity-80">
						<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-16 md:h-24 w-auto">
						<div class="ml-2">
							<h5 class="text-lg font-semibold text-white text-shadow-black mb-1">Dinas Peternakan dan<br>KesehatanHewan Provinsi</h5>
							<h6 class="text-sm md:text-base font-bold text-blue-500 text-shadow-black">SULAWESI SELATAN</h6>
						</div>
					</router-link>
					<p class="text-sm mb-2 text-gray-200 font-semibold">Alamat</p>
					<p class="text-sm text-gray-200 mb-8"><a href="https://goo.gl/maps/VNnu4i7HiubN4WLq8" target="_blank">Jl. Veteran Selatan No.234, Kec. Mamajang,<br>Kota Makassar, Sulawesi Selatan 90131</a></p>
					<p class="text-sm text-shadow-black text-gray-100 font-semibold">Hubungi Kami</p>
					<div class="flex items-center my-6 gap-6 text-3xl">
						<a :href="urlFb" target="_blank" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-facebook" />
						</a>
						<a :href="urlIg" target="_blank" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-instagram" />
						</a>
						<a :href="urlTw" target="_blank" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-twitter" />
						</a>
						<a :href="urlWa" target="_blank" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-whatsapp" />
						</a>
					</div>
					<div v-if="textPhone" class="flex items-center text-gray-100 text-shadow-black">
						<font-awesome-icon icon="fa-solid fa-phone" />
						<span class="text-sm ml-2">{{ textPhone }}</span>
					</div>
				</div>
				<div>
					<div>
						<h6 class="mt-16 font-bold text-blue-500 text-xl mb-4">Layanan Lainnya</h6>
						<ul class="flex flex-col items-start mb-12">
							<li><a target="_blank" href="#" class="footer-link">Training Center</a></li>
							<li><a target="_blank" href="https://play.google.com/store/apps/details?id=disnakkeswan.raisa" class="footer-link">Aplikasi RAISA Peternak</a></li>
							<li><a target="_blank" href="https://play.google.com/store/apps/details?id=disnakkeswan.raisa_inseminator" class="footer-link">Aplikasi RAISA Inseminator</a></li>
						</ul>
						<h6 class="font-bold text-blue-500 text-xl mb-4">Link Terkait</h6>
						<ul class="flex flex-col items-start">
							<li><a target="_blank" href="https://disnakkeswan.sulselprov.go.id/" class="footer-link">Profil DISNAKKESWAN SULSEL</a></li>
							<li><a target="_blank" href="https://sulselprov.go.id/" class="footer-link">PEMPROV Sulawesi Selatan</a></li>
							<li><a target="_blank" href="https://ditjenpkh.pertanian.go.id/" class="footer-link">Ditjen PKH RI</a></li>
							<li><a target="_blank" href="https://www.pertanian.go.id/" class="footer-link">Kementerian Pertanian RI</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="pt-24">
				<p class="text-sm text-gray-200 font-semibold text-center">&copy; Dinas Peternakan dan Kesehatan Hewan Provinsi Sulawesi Selatan 2022. All Rights Reserved.</p>
			</div>
		</div>
	</footer>
</template>
<style scoped>
	
.social-link {
	@apply text-gray-100 hover:text-blue-600;
}

.footer-link {
	@apply block py-2 px-4 text-sm font-medium mr-4 transition-all text-gray-200 hover:text-blue-500 ml-4 lg:hover:ml-0;
}

</style>