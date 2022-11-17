<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import http from "@/modules/http-common";
import { useDataForm } from "@/modules/data-form";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import StepCircle from "@/components/ui/StepCircle.vue";

defineEmits(["back"]);

const props = defineProps({
	name: { type: String, required: true },
	email: { type: String, required: true },
	telp: { type: String, required: true },
	idNumber: { type: String, required: true },
	villageId: { type: Number, required: true },
	address: { type: String, required: true },
	fullAddress: { type: String, required: true }
});

const { data, v$ } = useDataForm({
	password: { required },
	retypePassword: { required }
});

const dataRegister = computed(() => {
	return {
		name: props.name,
		email: props.email,
		password: data.password,
		address: props.address,
		phone_number: props.telp,
		village_id: props.villageId.toString(),
		nric: props.idNumber,
		role: "user"
	};
});

const router = useRouter();
const viewStore = useViewStore();

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
	http.post("/register", dataRegister.value)
		.then(response => {

			if(!response.data.success) {
				viewStore.showToast("register", false);
				console.warn(response);
				return;
			}

			viewStore.showToast("register", true);
			setTimeout(() => router.push("/login"), 500);

		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("register", false);
		});

};
</script>
<template>
	<form @submit.prevent="onRegister">
		<div class="grid grid-cols-[auto_1fr] gap-4 submitted-info mb-8">
			<p>Nama Lengkap</p><p class="font-semibold">{{ name }}</p>
			<p>Email</p><p class="font-semibold">{{ email }}</p>
			<p>No. Telepon</p><p class="font-semibold">{{ telp }}</p>
			<p>NIK</p><p class="font-semibold">{{ idNumber }}</p>
			<p>Alamat</p><p class="font-semibold">{{ fullAddress }}</p>
		</div>
		<div class="grid grid-cols-1 gap-4">
			<div :class="{ 'invalid': hasSubmitted && v$.password.$invalid }" class="register-input-group">
				<label for="inputPass" class="text-shadow-white">Masukkan Password *</label>
				<input v-model="v$.password.$model" type="password" id="inputPass" class="focus-shadow" required>
			</div>
			<div :class="{ 'invalid': hasSubmitted && v$.retypePassword.$invalid || hasSubmitted && !isPassEqual }" class="register-input-group">
				<label for="inputRetypePass" class="text-shadow-white">Masukkan ulang Password *</label>
				<input v-model="v$.retypePassword.$model" type="password" id="inputRetypePass" class="focus-shadow" required>
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