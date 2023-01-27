<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import Listbox from "primevue/listbox";
import { useDataForm } from "@/modules/data-form";
import { useRegion } from "@/modules/region-id";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
// import UploadIdCard from "@/components/UploadIdCard.vue";
import ModalUploadImg from "@/components/ModalUploadImg.vue";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import ModalUpdatePassword from "@/components/ModalUpdatePassword.vue";

const { data, v$ } = useDataForm({
	name: { value: null },
	email: { value: null },
	identityCard: { value: null },
	avatar: { value: null },
	nric: { value: null },
	phoneNumber: { value: null },
	address: { value: null },
	role: { value: null },
	province: { value: null },
	regency: { value: null },
	district: { value: null },
	village: { value: null },
	villageId: { value: null }
});

const {
	prov,
	onProvChange,
	fetchProv,
	kab,
	onKabChange,
	fetchKab,
	kec,
	onKecChange,
	fetchKec,
	desa,
	onDesaChange,
	fetchDesa
} = useRegion();

const setRegion = dataRegion => {
	fetchProv();
	prov.id = dataRegion.prov.id;
	prov.text = dataRegion.prov.name;
	kab.idProv = dataRegion.prov.id;
	
	fetchKab();
	kab.id = dataRegion.kab.id;
	kab.text = dataRegion.kab.name;
	kec.idKab = dataRegion.kab.id;

	fetchKec();
	kec.id = dataRegion.kec.id;
	kec.text = dataRegion.kec.name;
	desa.idKec = dataRegion.kec.id;

	fetchDesa();
	desa.id = dataRegion.desa.id;
	desa.text = dataRegion.desa.name;
};

const profileImg = computed(() => {
	if(!data.avatar)
		return null;
	return "https://silajue.taekwondosulsel.info/storage/" + data.avatar;
});

const setData = (dataUser, village) => {
	data.name = dataUser.name;
	data.email = dataUser.email;
	data.identityCard = dataUser.identity_card;
	data.avatar = dataUser.avatar;
	data.nric = dataUser.nric;
	data.phoneNumber = dataUser.phone_number;
	data.address = dataUser.address;
	data.role = dataUser.role;
	data.province = village.district.regency.province.name;
	data.regency = village.district.regency.name;
	data.district = village.district.name
	data.village = village.name;
	data.villageId = village.id;
};

const userStore = useUserStore();
http.get("/user", { headers: { "Authorization": "Bearer " + userStore.token } })
	.then(response => {
		const { village, ...dataUser } = response.data.data;
		setData(dataUser, village);

		setRegion({
			prov: {
				id: village.district.regency.province.id,
				name: village.district.regency.province.name
			},
			kab: {
				id: village.district.regency.id,
				name: village.district.regency.name
			},
			kec: {
				id: village.district.id,
				name: village.district.name
			},
			desa: {
				id: village.id,
				name: village.name
			}
		});
	})
	.catch(err => console.error(err));

const onBodyClick = () => {
	prov.showListbox = false;
	kab.showListbox = false;
	kec.showListbox = false;
	desa.showListbox = false;
};

onMounted(() => document.body.addEventListener("click", onBodyClick));
onUnmounted(() => document.body.addEventListener("click", onBodyClick));

watch(
	() => desa.id,
	idDesa => data.villageId = idDesa
);

const showLoadingIcon = ref(false);
const viewStore = useViewStore();
const onSave = () => {
	const headers = { "Authorization": "Bearer " + userStore.token };
	const body = {
		name: data.name,
		phone_number: data.phoneNumber,
		village_id: data.villageId.toString(),
		address: data.address,
		nric: data.nric
	};

	showLoadingIcon.value = true;
	http.post("/user/profile", body, { headers })
		.then(response => {
			viewStore.showToast("updateProfile", true);
			showLoadingIcon.value = false;
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("updateProfile", false);
			showLoadingIcon.value = false;
		});
};
const profileSection = ref(1);

const uploadIdCardElm = ref(null);
const showUploadIdCard = ref(false);
const updateIdCard = idCardImg => {
	const formData = new FormData();
	formData.append("identity_card", idCardImg);
	const headers = { "Authorization": "Bearer " + userStore.token };

	uploadIdCardElm.value.isLoading(true);
	http.post("/user/image", formData, { headers })
		.then(response => {
			data.identityCard = null;
			const dataUser = response.data.data;

			if(!dataUser.identity_card)
				return console.log(response.data);

			data.identityCard = dataUser.identity_card;
			uploadIdCardElm.value.isLoading(false);
			showUploadIdCard.value = false;
			// console.log(dataUser.identity_card);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("fetchData", false);
			uploadIdCardElm.value.isLoading(false);
		});
};

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

const isRoleUser = computed(() => userStore.isRoleUser);

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
	<BasicLayout>
		<template #main>
			<div class="bg-white py-16">
				<div class="container mb-12">
					<h3 class="text-4xl font-semibold text-gray-900">Profil Saya</h3>
				</div>
				<div class="container">
					<div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-16">
						<div class="flex justify-center items-start">
							<div class="relative profile-avatar-wrapper">
								<BgImageAsync :src="data.avatar" class="profile-avatar" />
								<button type="button" @click="showUploadAvatar = true" class="absolute top-0 left-0 w-full h-full text-gray-100 bg-gray-400/40 text-4xl flex justify-center items-center transition-opacity opacity-0 hover:opacity-100 focus:opacity-100">
									<font-awesome-icon icon="fa-solid fa-image" />
								</button>
							</div>
						</div>
						<div class="card-profile">
							<div class="md:py-2 border-r bg-gray-100">
								<ul v-if="!isRoleUser" class="profile-menu">
									<li class="hidden md:list-item"><h6 class="text-gray-900 px-4 py-2 font-semibold text-lg">Update Profil</h6></li>
								</ul>
								<ul v-else class="profile-menu">
									<li class="hidden md:list-item"><h6 class="text-gray-900 px-4 py-2 font-semibold text-lg">Update Profil</h6></li>
									<li><button type="button" :class="{ 'active': profileSection == 1 }" @click="profileSection = 1" class="profile-link">Akun</button></li>
									<li><button type="button" :class="{ 'active': profileSection == 2 }" @click="profileSection = 2" class="profile-link">Lokasi</button></li>
									<li><button type="button" :class="{ 'active': profileSection == 3 }" @click="profileSection = 3" class="profile-link">Kartu Identitas</button></li>
								</ul>
							</div>
							<div class="relative">
								<form @submit.prevent="onSave">
									<Transition name="fade">
										<section v-if="profileSection == 1" class="profile-section">
											<div class="input-group">
												<label for="inputName">Nama Lengkap</label>
												<input type="text" v-model="v$.name.$model" id="inputName">
											</div>
											<div class="input-group">
												<label for="inputEmail">Email</label>
												<input type="email" :value="data.email" id="inputEmail" disabled>
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
												<button type="submit" class="btn btn-icon rounded font-medium text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
													<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
													<span>Simpan Perubahan</span>
												</button>
											</div>
										</section>
									</Transition>
									<Transition name="fade">
										<section v-if="profileSection == 2 && isRoleUser" class="profile-section">
											<div class="input-group">
												<label for="inputProvinsi">Provinsi</label>
												<div class="listbox-wrapper" @click.stop="">
													<input :value="prov.text" type="text" id="inputProvinsi" class="focus-shadow" readonly required @click="prov.showListbox = true">
													<div v-if="prov.showListbox" class="listbox listbox-region top-full">
														<Listbox :options="prov.list" optionLabel="name" :filter="true" @change="onProvChange" />
													</div>
												</div>
											</div>
											<div class="input-group">
												<label for="inputKab">Kabupaten</label>
												<div class="listbox-wrapper" @click.stop="">
													<input type="text" :value="kab.text" :disabled="!kab.idProv" id="inputKab" class="focus-shadow" readonly required @click="kab.showListbox = true">
													<div v-if="kab.showListbox" class="listbox listbox-region top-full">
														<Listbox :options="kab.list" optionLabel="name" :filter="true" @change="onKabChange" />
													</div>
												</div>
											</div>
											<div class="input-group">
												<label for="inputKec">Kecamatan</label>
												<div class="listbox-wrapper" @click.stop="">
													<input type="text" :value="kec.text" :disabled="!kec.idKab" @click="kec.showListbox = true" id="inputKec" class="focus-shadow" readonly required>
													<div v-if="kec.showListbox" class="listbox listbox-region top-full">
														<Listbox :options="kec.list" optionLabel="name" :filter="true" @change="onKecChange" />
													</div>
												</div>
											</div>
											<div class="input-group">
												<label for="inputDesa">Desa/Kelurahan</label>
												<div class="listbox-wrapper" @click.stop="">
													<input type="text" :value="desa.text" :disabled="!desa.idKec" @click="desa.showListbox = true" id="inputDesa" class="focus-shadow" readonly required>
													<div v-if="desa.showListbox" class="listbox listbox-region bottom-full">
														<Listbox :options="desa.list" optionLabel="name" :filter="true" @change="onDesaChange" />
													</div>
												</div>
											</div>
											<div class="input-group">
												<label for="textAddress" class="text-shadow-white">Jalan *</label>
												<textarea v-model="v$.address.$model" id="textAddress" rows="3" class="focus-shadow" required></textarea>
											</div>
											<div class="flex justify-end pt-12">
												<button type="submit" class="btn btn-icon rounded font-medium text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
													<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
													<span>Simpan Perubahan</span>
												</button>
											</div>
										</section>
									</Transition>
									<Transition name="fade">
										<section v-if="profileSection == 3 && isRoleUser" class="profile-section">
											<div class="input-group mb-8">
												<label for="inputNric">No. NIK</label>
												<input type="tele" v-model="v$.nric.$model" id="inputNric">
											</div>
											<div>
												<button v-if="!data.identityCard" type="button" @click="showUploadIdCard = true" class="btn text-sm font-medium text-white transition-colors bg-gray-500 hover:bg-gray-400">Verifikasi Akun</button>
												<div v-else>
													<div class="aspect-video rounded-2xl overflow-hidden mb-4">
														<BgImageAsync :src="data.identityCard" class="w-full h-full" />
													</div>
													<button type="button" @click="showUploadIdCard = true" class="btn text-sm font-medium text-white transition-colors bg-gray-500 hover:bg-gray-400">Ganti</button>
												</div>
											</div>
											<div class="flex justify-end pt-12">
												<button type="submit" class="btn btn-icon rounded font-medium text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
													<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
													<span>Simpan Perubahan</span>
												</button>
											</div>
										</section>
									</Transition>
								</form>
							</div>
						</div>
					</div>
				</div>
				<ModalUploadImg v-if="showUploadIdCard" ref="uploadIdCardElm" title="Verifikasi Akun" label="Upload Foto KTP" @change="updateIdCard" />
				<ModalUploadImg v-if="showUploadAvatar" ref="uploadAvatarElm" title="Foto Profil" label="Upload Foto Profil" @change="updateAvatar" />
				<ModalUpdatePassword v-if="showModalPass" ref="modalPass" @update="updatePass" @close="showModalPass = false" />
			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
.profile-avatar-wrapper {
	@apply w-56 md:w-full rounded-full overflow-hidden;
}

.profile-avatar {
	@apply aspect-square w-full bg-gray-200;
}

.card-profile {
	@apply rounded border shadow-lg grid grid-cols-1 md:grid-cols-[1fr_2fr] overflow-hidden;
}

.profile-menu {
	@apply flex md:flex-col;
}

.profile-menu > li:not(:last-child) {
	@apply md:border-b;
}

.profile-link {
	@apply block w-full text-left md:text-sm px-4 py-3 font-medium md:font-semibold transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary-600;
}

.profile-link.active {
	@apply text-primary-600 md:font-bold bg-gray-200/50;
}

.profile-section {
	@apply py-6 px-4 grid grid-cols-1 gap-4 bg-white;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin-left 0.3s, margin-right 0.3s;
}

/*.fade-enter-from {
	@apply absolute;
}*/

.fade-enter-from,
.fade-leave-to {
	@apply absolute opacity-0 ml-4 -mr-4;
}

.listbox-wrapper {
	@apply relative;
}

.listbox {
	@apply absolute w-full left-0 z-10;
}

.listbox-region :deep(.p-listbox-list) {
	@apply max-h-[8rem];
}

</style>