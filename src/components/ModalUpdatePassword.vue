<script setup>
import { ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";

const emits = defineEmits(["update"]);

const showLoadingIcon = ref(false);
const setLoadingIcon = val => showLoadingIcon.value = val;
defineExpose({ setLoadingIcon });

const { data, v$ } = useDataForm({
	oldPass: { required, value: null },
	newPass1: { required, value: null },
	newPass2: { required, value: null }
});

const isPassEqual = computed(() => data.newPass1 === data.newPass2);
const hasSubmitted = ref(false);

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();

	if(!isValid || !isPassEqual.value)
		return;
	
	emits("update", {
		oldPass: data.oldPass.toString(),
		newPass: data.newPass1.toString(),
		newPassRetype: data.newPass2.toString()
	});
};
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="p-8">
				<h3 class="text-lg text-gray-700">Perbarui Password</h3>
			</div>
		</template>
		<template #body>
			<form @submit.prevent="onSubmit">
				<div class="grid grid-cols-1 gap-4 px-8">
					<div class="input-group">
						<label for="oldPass">Masukkan Password lama</label>
						<input type="password" id="oldPass" v-model="v$.oldPass.$model" :class="{ 'invalid': hasSubmitted && v$.oldPass.$invalid }">
					</div>
					<div class="input-group">
						<label for="newPass1">Masukkan Password baru</label>
						<input type="password" id="newPass1" v-model="v$.newPass1.$model" :class="{ 'invalid': hasSubmitted && v$.newPass1.$invalid }">
					</div>
					<div class="input-group">
						<label for="newPass2">Masukkan ulang Password baru</label>
						<input type="password" id="newPass2" v-model="v$.newPass2.$model" :class="{ 'invalid': hasSubmitted && v$.newPass2.$invalid || hasSubmitted && !isPassEqual }">
						<small v-if="hasSubmitted && !isPassEqual" class="text-xs font-semibold text-danger-500 mx-4">Password baru tidak cocok</small>
					</div>
				</div>
				<div class="flex justify-end p-8">
					<button type="submit" class="btn btn-icon rounded font-medium text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
						<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
						<span>Simpan Perubahan</span>
					</button>
				</div>
			</form>
		</template>
	</Modal>
</template>