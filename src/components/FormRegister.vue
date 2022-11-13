<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import Listbox from "primevue/listbox";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import { useDataForm } from "@/modules/data-form";
import { useRegion } from "@/modules/region-id";

const router = useRouter();
const toast = useToast();

const { data, v$ } = useDataForm({
	email: { required, email },
	password: { required },
	village_id: { required }
});

const userStore = useUserStore();
const showLoader = ref(false);
const hasSubmitted = ref(false);

const onRegister = async () => {
	hasSubmitted.value = true;
	const ready = await v$.value.$validate();

	if(!ready)
		return;

	showLoader.value = true;
	userStore.login(data.email, data.password, success => {
		if(success) {
			toast.add({
				severity:"success",
				summary: "Berhasil Login.",
				detail:"Anda akan diarahkan ke halaman beranda."
			});
			setTimeout(() => router.push("/"), 500);
			return;
		}

		showLoader.value = false;
		toast.add({
			severity:"error",
			summary: "Gagal Login",
			detail:"Username atau password yang anda masukkan tidak benar."
		});
	});
};

const { prov, onProvChange, fetchProv, kab, onKabChange, kec, onKecChange, desa, onDesaChange } = useRegion();
fetchProv();

watch(
	() => desa.id,
	idDesa => {
		data.village_id = idDesa;
		console.log(data.village_id);
	}
);

const onBodyClick = () => {
	prov.showListbox = false;
	kab.showListbox = false;
	kec.showListbox = false;
	desa.showListbox = false;
};

onMounted(() => document.body.addEventListener("click", onBodyClick));
onUnmounted(() => document.body.addEventListener("click", onBodyClick));
</script>
<template>
	<div class="rounded-2xl bg-white py-8 px-6 min-w-[25rem]">
		<h3 class="text-4xl font-bold mb-6 mt-4 form-title">Register</h3>
		<form @submit.prevent="onRegister">
			<div class="grid grid-cols-1 gap-4">
				<div :class="{ 'invalid': v$.email.$invalid && hasSubmitted }" class="register-input-group">
					<label for="inputEmail" class="text-shadow-white">Email</label>
					<input v-model="data.email" type="email" id="inputEmail" class="focus-shadow" required>
				</div>
				<div :class="{ 'invalid': v$.password.$invalid && hasSubmitted }" class="register-input-group">
					<label for="inputPass" class="text-shadow-white">Password</label>
					<input v-model="data.password" type="password" id="inputPass" class="focus-shadow" required>
				</div>
				<div class="register-input-group">
					<label for="inputProvinsi">Provinsi</label>
					<div class="listbox-wrapper" @click.stop="">
						<input :value="prov.text" type="text" id="inputProvinsi" class="focus-shadow" readonly required @click="prov.showListbox = true">
						<div v-if="prov.showListbox" class="listbox listbox-provinsi">
							<Listbox :options="prov.list" optionLabel="name" :filter="true" @change="onProvChange" />
						</div>
					</div>
				</div>
				<div v-if="kab.idProv" class="register-input-group">
					<label for="inputKab">Kabupaten</label>
					<div class="listbox-wrapper" @click.stop="">
						<input :value="kab.text" type="text" id="inputKab" class="focus-shadow" readonly required @click="kab.showListbox = true">
						<div v-if="kab.showListbox" class="listbox listbox-provinsi">
							<Listbox :options="kab.list" optionLabel="name" :filter="true" @change="onKabChange" />
						</div>
					</div>
				</div>
				<div v-if="kec.idKab" class="register-input-group">
					<label for="inputKec">Kecamatan</label>
					<div class="listbox-wrapper" @click.stop="">
						<input :value="kec.text" type="text" id="inputKec" class="focus-shadow" readonly required @click="kec.showListbox = true">
						<div v-if="kec.showListbox" class="listbox listbox-provinsi">
							<Listbox :options="kec.list" optionLabel="name" :filter="true" @change="onKecChange" />
						</div>
					</div>
				</div>
				<div v-if="desa.idKec" class="register-input-group">
					<label for="inputDesa">Desa/Kelurahan</label>
					<div class="listbox-wrapper" @click.stop="">
						<input :value="desa.text" type="text" id="inputDesa" class="focus-shadow" readonly required @click="desa.showListbox = true">
						<div v-if="desa.showListbox" class="listbox listbox-provinsi">
							<Listbox :options="desa.list" optionLabel="name" :filter="true" @change="onDesaChange" />
						</div>
					</div>
				</div>
			</div>
			<div class="h-3 my-4">
				<LoaderHorizontalLine v-if="showLoader" />
			</div>
			<div class="flex items-end mb-8 mx-2 md:mx-4">
				<button type="submit" class="ml-auto font-medium text-base xl:text-base px-6 rounded py-2 font-semibold text-white bg-primary-700 hover:bg-primary-600">Register</button>
			</div>
			<p class="text-xs text-center mb-2 font-medium drop-shadow-[0_1px_5px_#fff]">Sudah punya Akun? <RouterLink to="/login" class="font-bold hover:text-black">Log In</RouterLink></p>
		</form>
	</div>
</template>

<style scoped>

.form-title {
	text-shadow: 1px 3px theme(colors.secondary);
}

.register-input-group label {
	@apply block mb-2;
}

.register-input-group input {
	@apply block w-full px-4 py-2 text-sm focus:shadow-none rounded transition-colors bg-gray-100 border;
}

.register-input-group.invalid {
	@apply border-danger-500;
}

.register-input-group > label {
	@apply pl-4 pr-2 py-2 text-sm text-black/80;
}

.listbox-wrapper {
	@apply relative;
}

.listbox {
	@apply absolute w-full top-full z-10;
}

.listbox-provinsi :deep(.p-listbox-list) {
	@apply max-h-[8rem];
}

</style>