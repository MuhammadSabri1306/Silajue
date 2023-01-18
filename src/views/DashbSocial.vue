<script setup>
import { ref, reactive } from "vue";
import { useSocialStore } from "@/stores/social";
import { useViewStore } from "@/stores/view";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";

const isLoaded = ref(false);
const socialStore = useSocialStore();

const data = reactive({
	facebook: null,
	instagram: null,
	twitter: null,
	whatsapp: null,
	phoneNumber: null
});

const initData = () => {
	socialStore.fetchSocial(false, isSuccess => {
		if(!isSuccess)
			return;

		data.facebook = socialStore.social.facebook;
		data.instagram = socialStore.social.instagram;
		data.twitter = socialStore.social.twitter;
		data.whatsapp = socialStore.social.whatsapp;
		data.phoneNumber = socialStore.social.phoneNumber;
		isLoaded.value = true;
	});
};

initData();

const viewStore = useViewStore();
const isLoading = ref(false);
const onSubmit = async () => {
	const body = {
		fb: data.facebook,
		inst: data.instagram,
		tw: data.twitter,
		wa: data.whatsapp,
		no_hp: data.phoneNumber,
		yt: ""
	};

	isLoading.value = true;
	socialStore.updateSocial(body, success => {
		viewStore.showToast("updateSocial", success);
		isLoading.value = false;
		if(success)
			initData();
	});
};
</script>
<template>
	<DashbLayout :activeNav="6">
		<template #main>
			<div>
				<h3 class="page-title">Sosial</h3>
				<form v-if="isLoaded" @submit.prevent="onSubmit">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						<div class="input-group">
							<label for="inputFacebook">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-facebook" /></span>
								<span class="ml-2">Url Facebook</span>
							</label>
							<input type="url" v-model="data.facebook" id="inputFacebook" placeholder="https://www.facebook.com/***">
						</div>
						<div class="input-group">
							<label for="inputInstagram">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-instagram" /></span>
								<span class="ml-2">Url Instagram</span>
							</label>
							<input type="url" v-model="data.instagram" id="inputInstagram" placeholder="https://www.instagram.com/***">
						</div>
						<div class="input-group">
							<label for="inputTwitter">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-twitter" /></span>
								<span class="ml-2">Url Twitter</span>
							</label>
							<input type="url" v-model="data.twitter" id="inputTwitter" placeholder="https://twitter.com/***">
						</div>
						<div class="input-group">
							<label for="inputWhatsapp">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-whatsapp" /></span>
								<span class="ml-2">No. Whatsapp</span>
							</label>
							<input type="tel" v-model="data.whatsapp" id="inputWhatsapp" placeholder="62851********">
						</div>
						<div class="input-group">
							<label for="inputPhoneNumber">
								<span class="text-xl text-gray-400"><font-awesome-icon icon="fa-solid fa-phone" /></span>
								<span class="ml-2">No. Telepon</span>
							</label>
							<input type="text" v-model="data.phoneNumber" id="inputPhoneNumber" placeholder="+62851********">
						</div>
					</div>
					<div class="flex justify-end">
						<button type="submit" :class="{ 'py-2': !isLoading, 'py-3': isLoading }" class="btn-icon rounded px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
							<span v-show="isLoading"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
							<span>Simpan Perubahan</span>
						</button>
					</div>
				</form>
			</div>
		</template>
	</DashbLayout>
</template>