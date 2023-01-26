<script setup>
import { computed } from "vue";
import { useSocialStore } from "@/stores/social";

const socialStore = useSocialStore();

const socialLinkAttr = computed(() => {
	const social = socialStore.social;
	const linkAttr = {
		fb: { href: "#" },
		ig: { href: "#" },
		tw: { href: "#" },
		wa: { href: "#" },
		phone: null
	};
	
	if(!socialStore.social)
		return linkAttr;

	if(social.facebook) {
		linkAttr.fb.href = social.facebook;
		linkAttr.fb.target = "_blank";
	}

	if(social.instagram) {
		linkAttr.ig.href = social.instagram;
		linkAttr.ig.target = "_blank";
	}

	if(social.twitter) {
		linkAttr.tw.href = social.twitter;
		linkAttr.tw.target = "_blank";
	}

	if(social.whatsapp) {
		linkAttr.wa.href = "https://wa.me/" + social.whatsapp;
		linkAttr.wa.target = "_blank";
	}

	if(social.phoneNumber)
		linkAttr.phone = social.phoneNumber;
	
	return linkAttr;
});

socialStore.fetchSocial();
</script>
<template>
	<footer class="bg-gray-900 pt-16 pb-8">
		<div class="px-6 md:px-8 lg:px-12 container">
			<div class="flex flex-col md:flex-row md:justify-between lg:justify-around items-center md:items-stretch">
				<div class="lg:max-w-[34rem]">
					<router-link to="/" class="flex items-center mb-8 transition-opacity opacity-100 hover:opacity-80">
						<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-16 md:h-24 w-auto">
						<div class="ml-2">
							<h5 class="text-xl font-semibold text-white text-shadow-black mb-1">UPT PIBPS</h5>
							<h6 class="text-xs md:text-sm font-bold text-shadow-black text-white">Dinas Peternakan dan Kesehatan Hewan<br><span class="text-blue-500">Prov. SULAWESI SELATAN</span></h6>
						</div>
					</router-link>
					<p class="text-sm mb-2 text-gray-200 font-semibold">Alamat</p>
					<p class="text-sm text-gray-200 mb-8"><a href="https://goo.gl/maps/VNnu4i7HiubN4WLq8" target="_blank">Jl. Veteran Selatan No.234, Kec. Mamajang,<br>Kota Makassar, Sulawesi Selatan 90131</a></p>
					<p class="text-sm text-shadow-black text-gray-100 font-semibold">Hubungi Kami</p>
					<div class="flex items-center my-6 gap-6 text-3xl">
						<a v-bind="socialLinkAttr.fb" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-facebook" />
						</a>
						<a v-bind="socialLinkAttr.ig" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-instagram" />
						</a>
						<a v-bind="socialLinkAttr.tw" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-twitter" />
						</a>
						<a v-bind="socialLinkAttr.wa" class="social-link text-shadow-black hover-margin">
							<font-awesome-icon icon="fa-brands fa-whatsapp" />
						</a>
					</div>
					<div v-if="socialLinkAttr.phone" class="flex items-center text-gray-100 text-shadow-black">
						<font-awesome-icon icon="fa-solid fa-phone" />
						<span class="text-sm ml-2">{{ socialLinkAttr.phone }}</span>
					</div>
				</div>
				<div>
					<div>
						<h6 class="font-bold text-blue-500 text-xl mb-4 mt-8">Layanan Lainnya</h6>
						<ul class="flex flex-col items-start mb-8">
							<li><a target="_blank" href="#" class="footer-link">Training Center</a></li>
							<li><a target="_blank" href="https://play.google.com/store/apps/details?id=disnakkeswan.raisa" class="footer-link">Aplikasi RAISA Peternak</a></li>
							<li><a target="_blank" href="https://play.google.com/store/apps/details?id=disnakkeswan.raisa_inseminator" class="footer-link">Aplikasi RAISA Inseminator</a></li>
						</ul>
						<h6 class="font-bold text-blue-500 text-xl mb-4">Link Terkait</h6>
						<ul class="flex flex-col items-start mb-8">
							<li><a target="_blank" href="https://disnakkeswan.sulselprov.go.id/" class="footer-link">Profil DISNAKKESWAN SULSEL</a></li>
							<li><a target="_blank" href="https://sulselprov.go.id/" class="footer-link">PEMPROV Sulawesi Selatan</a></li>
							<li><a target="_blank" href="https://ditjenpkh.pertanian.go.id/" class="footer-link">Ditjen PKH RI</a></li>
							<li><a target="_blank" href="https://www.pertanian.go.id/" class="footer-link">Kementerian Pertanian RI</a></li>
						</ul>
						<div class="flex justify-center md:justify-start">
							<div class="flex flex-col justify-center items-center gap-2">
								<span class="text-gray-200 mr-2">Download Apps di</span>
								<a href="https://play.google.com/store/apps/details?id=com.lni.silajue.app" target="_blank" class="inline-flex justify-center items-center pr-4 py-2 pl-1 rounded-lg shadow-sm border border-gray-900 text-white hover-margin bg-black hover:bg-black/40">
									<img src="/assets/img/playstore-logo.svg" class="w-12" alt="Google Play Store logo">
									<span class="font-medium -ml-2">Google Play</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pt-16 md:pt-24">
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
	@apply block py-1 px-4 text-sm font-medium mr-4 transition-all duration-300 text-gray-200 hover:text-blue-500 ml-4 lg:hover:ml-0;
}

</style>