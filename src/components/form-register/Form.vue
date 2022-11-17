<script setup>
import { ref, reactive, computed } from "vue";
import Section1 from "./Section1.vue";
import Section2 from "./Section2.vue";
import Section3 from "./Section3.vue";

const data = reactive({
	name: null,
	email: null,
	telp: null,
	idNumber: null,
	villageId: null,
	address: null,
	fullAddress: null
});

const section = ref(1);

const onSection1Change = ({ name, email, telp, idNumber }) => {
	data.name = name;
	data.email = email;
	data.telp = telp;
	data.idNumber = idNumber;

	section.value = 2;
};

const onSection2Change = ({ villageId, address, fullAddress }) => {
	data.villageId = villageId;
	data.address = address;
	data.fullAddress = fullAddress;

	section.value = 3;
};

const dataSection3 = computed(() => {
	const { name, email, telp, idNumber, villageId, address, fullAddress } = data;
	return { name, email, telp, idNumber, villageId, address, fullAddress };
});
</script>
<template>
	<div class="form-reg rounded-2xl bg-white py-8 px-6 w-full md:w-[30rem] lg:w-[25rem]">
		<h3 class="text-4xl font-bold mb-6 mt-4 form-title">Register</h3>
		
		<Section1 v-show="section === 1" @change="onSection1Change" />
		<Section2 v-show="section === 2" @back="section = 1" @change="onSection2Change" />
		<Section3 v-if="section === 3" v-bind="dataSection3" @back="section = 2" />

		<p class="text-xs text-center mb-2 mt-8 font-medium drop-shadow-[0_1px_5px_#fff]">Sudah punya Akun? <RouterLink to="/login" class="font-bold hover:text-black">Log In</RouterLink></p>
	</div>
</template>
<style scoped>

.form-reg :deep(.form-title) {
	text-shadow: 1px 3px theme(colors.secondary);
}

.form-reg :deep(.register-input-group label) {
	@apply block mb-2;
}

.form-reg :deep(.register-input-group input),
.form-reg :deep(.register-input-group textarea) {
	@apply block w-full px-4 py-2 text-sm focus:shadow-none rounded transition-colors bg-gray-100 border;
}

.form-reg :deep(.register-input-group.invalid) {
	@apply border-danger-500;
}

.form-reg :deep(.register-input-group > label) {
	@apply pl-4 pr-2 py-2 text-sm text-black/80;
}

</style>