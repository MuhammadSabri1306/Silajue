<script setup>
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";

const { data, v$ } = useDataForm({
	facebook: { value: null },
	instagram: { value: null },
	twitter: { value: null },
	whatsapp: { value: null },
	phoneNumber: { value: null }
});
</script>
<template>
	<DashbLayout :activeNav="6">
		<template #main>
			<div>
				<h3 class="page-title">Sosial</h3>
				<form @submit.prevent="">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div class="input-group">
							<label for="inputFacebook">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-facebook" /></span>
								<span class="ml-2">Url Facebook</span>
							</label>
							<input type="url" v-model="v$.facebook.$model" id="inputFacebook" placeholder="https://www.facebook.com/***">
						</div>
						<div class="input-group">
							<label for="inputInstagram">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-instagram" /></span>
								<span class="ml-2">Url Instagram</span>
							</label>
							<input type="url" v-model="v$.instagram.$model" id="inputInstagram" placeholder="https://www.instagram.com/***">
						</div>
						<div class="input-group">
							<label for="inputTwitter">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-twitter" /></span>
								<span class="ml-2">Url Twitter</span>
							</label>
							<input type="url" v-model="v$.twitter.$model" id="inputTwitter" placeholder="https://twitter.com/***">
						</div>
						<div class="input-group">
							<label for="inputWhatsapp">
								<span class="text-2xl text-gray-400"><font-awesome-icon icon="fa-brands fa-whatsapp" /></span>
								<span class="ml-2">No. Whatsapp</span>
							</label>
							<input type="tel" v-model="v$.whatsapp.$model" id="inputWhatsapp" placeholder="62851********">
						</div>
						<div class="input-group">
							<label for="inputPhoneNumber">
								<span class="text-xl text-gray-400"><font-awesome-icon icon="fa-solid fa-phone" /></span>
								<span class="ml-2">No. Telepon</span>
							</label>
							<input type="text" v-model="v$.phoneNumber.$model" id="inputPhoneNumber" placeholder="+62851********">
						</div>
					</div>
					<div class="flex justify-end">
						<button type="submit" class="btn text-white hover-margin bg-primary-600 hover:bg-primary-500">Simpan Perubahan</button>
					</div>
				</form>
			</div>
		</template>
	</DashbLayout>
</template>