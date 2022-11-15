<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import StepCircle from "@/components/ui/StepCircle.vue";

defineEmits(["back"]);

const props = defineProps({
	name: { type: String, required: true },
	telp: { type: String, required: true },
	idNumber: { type: String, required: true },
	villageId: { type: String, required: true },
	address: { type: String, required: true },
	fullAddress: { type: String, required: true }
});

const { data, v$ } = useDataForm({
	password: { required },
	retypePassword: { required }
});

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const showLoader = ref(false);
const hasSubmitted = ref(false);
const isPassEqual = ref(false);

const onRegister = async () => {
	hasSubmitted.value = true;
	const ready = await v$.value.$validate();
	if(!ready)
		return;

	isPassEqual.value = data.password === data.retypePassword;
	if(!isPassEqual.value)
		return;

	showLoader.value = true;
	const dataRegister = {
		name: props.name,
		password: data.password,
		address: props.address,
		phone_number: props.telp,
		village_id: props.villageId,
		nric: props.idNumber,
	};

	userStore.register(dataRegister, success => {
		if(success) {
			toast.add({
				severity:"success",
				summary: "Berhasil membuat akun.",
				detail:"Silahkan login menggunakan akun anda."
			});
			setTimeout(() => router.push("/login"), 500);
			return;
		}

		showLoader.value = false;
		toast.add({
			severity:"error",
			summary: "Gagal Register",
			detail:"Terjadi masalah saat menghubungi server."
		});
	});
};
</script>
<template>
	<form @submit.prevent="onRegister">
		<div class="grid grid-cols-[auto_1fr] gap-4 submitted-info">
			<p>Nama Lengkap</p><p class="font-semibold">{{ name }}</p>
			<p>No. Telepon</p><p class="font-semibold">{{ telp }}</p>
			<p>NIK</p><p class="font-semibold">{{ idNumber }}</p>
			<p>Alamat</p><p class="font-semibold">{{ fullAddress }}</p>
		</div>
		<div class="grid grid-cols-1 gap-4">
			<div :class="{ 'invalid': hasSubmitted && v$.password.$invalid }" class="register-input-group">
				<label for="inputPass" class="text-shadow-white">Masukkan Password *</label>
				<input v-model="data.password" type="password" id="inputPass" class="focus-shadow" required>
			</div>
			<div :class="{ 'invalid': hasSubmitted && v$.retypePassword.$invalid || hasSubmitted && !isPassEqual }" class="register-input-group">
				<label for="inputRetypePass" class="text-shadow-white">Masukkan ulang Password *</label>
				<input v-model="data.retypePassword" type="password" id="inputRetypePass" class="focus-shadow" required>
			</div>
		</div>
		<p v-if="hasSubmitted && !isPassEqual" class="mt-2 text-red-700 text-xs font-bold">Password tidak cocok.</p>
		<div v-if="showLoader" class="h-3 my-8">
			
			<LoaderHorizontalLine />
		
		</div>

		<StepCircle v-else :maxItem="3" :active="3" class="my-8" />
		
		<div class="flex items-end mb-8 mx-2 md:mx-4">
			<button type="button" @click="$emit('back')" class="font-medium text-sm px-6 rounded py-2 font-semibold text-gray-600 bg-white border border-gray-500 hover:bg-gray-100">Kembali</button>
			<button type="submit" class="ml-auto font-medium text-base xl:text-base px-6 rounded py-2 font-semibold text-white bg-primary-700 hover:bg-primary-600">Register</button>
		</div>
	</form>
</template>
<style scoped>
	
.submitted-info p {
	@apply text-gray-700 text-sm;
}

</style>