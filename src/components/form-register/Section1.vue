<script setup>
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import StepCircle from "@/components/ui/StepCircle.vue";

const { data, v$ } = useDataForm({
	name: { required },
	email: { required },
	telp: { required },
	idNumber: { required }
});

const emit = defineEmits(["change"]);

const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const ready = await v$.value.$validate();

	if(!ready)
		return;

	emit("change", {
		name: data.name,
		email: data.email,
		telp: data.telp,
		idNumber: data.idNumber.toString()
	});
};
</script>
<template>
	<form @submit.prevent="onSubmit">
		<div class="grid grid-cols-1 gap-4">
			<div :class="{ 'invalid': v$.name.$invalid && hasSubmitted }" class="register-input-group">
				<label for="inputNama" class="text-shadow-white">Nama Lengkap *</label>
				<input v-model="v$.name.$model" type="text" id="inputNama" class="focus-shadow" required>
			</div>
			<div :class="{ 'invalid': v$.email.$invalid && hasSubmitted }" class="register-input-group">
				<label for="inputEmail" class="text-shadow-white">Email *</label>
				<input v-model="v$.email.$model" type="email" id="inputEmail" class="focus-shadow" required>
			</div>
			<div :class="{ 'invalid': v$.telp.$invalid && hasSubmitted }" class="register-input-group">
				<label for="inputTelp" class="text-shadow-white">No. Telepon *</label>
				<input v-model="v$.telp.$model" type="tel" id="inputTelp" class="focus-shadow" required>
			</div>
			<div :class="{ 'invalid': v$.idNumber.$invalid && hasSubmitted }" class="register-input-group">
				<label for="inputNik" class="text-shadow-white">NIK *</label>
				<input v-model="v$.idNumber.$model" type="text" id="inputNik" class="focus-shadow" required>
			</div>
		</div>

		<StepCircle :maxItem="3" :active="1" class="my-8" />
		
		<div class="flex gap-4 mx-2 md:mx-4">
			<button type="submit" class="ml-auto font-medium text-sm px-4 rounded py-2 font-semibold text-primary-700 bg-white border border-primary-700 hover:bg-gray-100">Lanjut</button>
		</div>
	</form>
</template>