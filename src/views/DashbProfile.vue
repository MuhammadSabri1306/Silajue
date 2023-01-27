<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import Listbox from "primevue/listbox";
import { useDataForm } from "@/modules/data-form";
import { useRegion } from "@/modules/region-id";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import ModalUploadImg from "@/components/ModalUploadImg.vue";
import ModalUpdatePassword from "@/components/ModalUpdatePassword.vue";

const { data, v$ } = useDataForm({
	name: { value: null },
	email: { value: null },
	avatar: { value: null },
	phoneNumber: { value: null }
});

const profileImg = computed(() => {
	if(!data.avatar)
		return null;
	return "https://silajue.taekwondosulsel.info/storage/" + data.avatar;
});

const userStore = useUserStore();
const viewStore = useViewStore();

http.get("/user", { headers: { "Authorization": "Bearer " + userStore.token } })
	.then(response => {
		const dataUser = response.data.data;
		data.name = dataUser.name;
		data.email = dataUser.email;
		data.avatar = dataUser.avatar;
		data.phoneNumber = dataUser.phone_number;
	})
	.catch(err => console.error(err));

const onSave = event => null;
const profileSection = ref(1);

const uploadAvatarElm = ref(null);
const showUploadAvatar = ref(false);
const updateAvatar = avatarImg => {
	const formData = new FormData();
	formData.append("avatar", avatarImg);
	const headers = { "Authorization": "Bearer " + userStore.token };

	uploadAvatarElm.value.isLoading(true);
	http.post("/user/avatar", formData, { headers })
		.then(response => {
			data.avatar = null;
			const dataUser = response.data.data;

			if(!dataUser.avatar)
				return console.log(response.data);

			data.avatar = dataUser.avatar;
			userStore.updateUser({ avatar: dataUser.avatar });

			uploadAvatarElm.value.isLoading(false);
			showUploadAvatar.value = false;
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("fetchData", false);
			uploadIdCardElm.value.isLoading(false);
		});
};

const isRoleAdmin = computed(() => userStore.isRoleAdmin);

const modalPass = ref(null);
const showModalPass = ref(false);
const updatePass = password => {
	modalPass.value.setLoadingIcon(true);
	console.log(password);
	userStore.updatePassword(password, success => {
		modalPass.value.setLoadingIcon(false);
		viewStore.showToast("updatePassword", success);
	});
};
</script>
<template>
	<DashbLayout :activeNav="4">
		<template #main>
			<div>
				<h3 class="page-title">Profil Saya</h3>
				<div class="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-16">
					<div class="flex justify-center items-start">
						<div class="relative profile-avatar-wrapper">
							<BgImageAsync :src="data.avatar" class="profile-avatar" />
							<button type="button" @click="showUploadAvatar = true" class="absolute top-0 left-0 w-full h-full text-gray-100 bg-gray-400/40 text-4xl flex justify-center items-center transition-opacity opacity-0 hover:opacity-100 focus:opacity-100">
								<font-awesome-icon icon="fa-solid fa-image" />
							</button>
						</div>
					</div>
					<div class="card-profile">
						<div class="lg:py-2 border-r bg-gray-100">
							<ul class="profile-menu">
								<li class="hidden lg:list-item"><h6 class="text-gray-900 px-4 py-2 font-semibold text-lg">Update Profil</h6></li>
							</ul>
						</div>
						<div class="relative">
							<section class="profile-section">
								<div class="input-group">
									<label for="inputName">Nama Lengkap</label>
									<input type="text" v-model="v$.name.$model" id="inputName">
								</div>
								<div class="input-group">
									<label for="inputEmail">Email</label>
									<input type="email" v-model="v$.email.$model" id="inputEmail">
								</div>
								<div class="input-group mb-4">
									<label for="inputTelp">No. Telepon</label>
									<input type="tele" v-model="v$.phoneNumber.$model" id="inputTelp">
								</div>
								<div class="input-group flex items-center">
									<label>Password</label>
									<button type="button" @click="showModalPass = true" class="ml-4 px-4 py-2 inline-flex gap-1 justify-center items-center rounded shadow-sm hover-margin text-gray-700 bg-yellow-300 hover:bg-yellow-200">
										<span class="text-lg">
											<font-awesome-icon icon="fa-solid fa-key" fixed-width />
										</span>
										<span class="text-xs font-medium">Ganti Password</span>
									</button>
								</div>
								<div class="flex justify-end pt-12">
									<button type="button" @click="onSave" class="py-2 px-4 rounded font-medium text-white hover-margin bg-primary-600 hover:bg-primary-500">Simpan Perubahan</button>
								</div>
							</section>
						</div>
					</div>
				</div>
				<ModalUploadImg v-if="showUploadAvatar" ref="uploadAvatarElm" title="Foto Profil" label="Upload Foto Profil" @change="updateAvatar" />
				<ModalUpdatePassword v-if="showModalPass" ref="modalPass" @update="updatePass" @close="showModalPass = false" />
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.profile-avatar-wrapper {
	@apply w-56 lg:w-full rounded-full overflow-hidden;
}

.profile-avatar {
	@apply aspect-square w-full bg-gray-200;
}

.card-profile {
	@apply rounded border shadow-lg grid grid-cols-1 lg:grid-cols-[1fr_2fr] overflow-hidden;
}

.profile-menu {
	@apply flex lg:flex-col;
}

.profile-menu > li:not(:last-child) {
	@apply lg:border-b;
}

.profile-link {
	@apply block w-full text-left lg:text-sm px-4 py-3 font-medium lg:font-semibold transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary-600;
}

.profile-link.active {
	@apply text-primary-600 lg:font-bold bg-gray-200/50;
}

.profile-section {
	@apply py-6 px-4 grid grid-cols-1 gap-4 bg-white;
}

</style>