<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import { useRegion } from "@/modules/region-id";
import Listbox from "primevue/listbox";
import StepCircle from "@/components/ui/StepCircle.vue";

const { data, v$ } = useDataForm({
	villageId: { required },
	address: { required }
});

const emit = defineEmits(["change", "back"]);

const { prov, onProvChange, fetchProv, kab, onKabChange, kec, onKecChange, desa, onDesaChange } = useRegion();
fetchProv();

const getFullAddress = () => {
	return `${ data.address.toUpperCase() }, ${ desa.text.toUpperCase() }, KECAMATAN ${ kec.text.toUpperCase() } ${ kab.text.toUpperCase() } PROVINSI ${ prov.text.toUpperCase() }`;
};

watch(
	() => desa.id,
	idDesa => {
		data.villageId = idDesa;
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

const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const ready = await v$.value.$validate();

	if(!ready)
		return;

	const fullAddress = getFullAddress();

	emit("change", {
		villageId: data.villageId,
		address: data.address,
		fullAddress
	});
};
</script>
<template>
	<form @submit.prevent="onSubmit">
		<div class="grid grid-cols-1 gap-4">
			<div class="register-input-group">
				<label for="inputProvinsi">Provinsi</label>
				<div class="listbox-wrapper" @click.stop="">
					<input :value="prov.text" type="text" id="inputProvinsi" class="focus-shadow" readonly required @click="prov.showListbox = true">
					<div v-if="prov.showListbox" class="listbox listbox-provinsi">
						<Listbox :options="prov.list" optionLabel="name" :filter="true" @change="onProvChange" />
					</div>
				</div>
			</div>
			<div class="register-input-group">
				<label for="inputKab">Kabupaten</label>
				<div class="listbox-wrapper" @click.stop="">
					<input type="text" :value="kab.text" :disabled="!kab.idProv" id="inputKab" class="focus-shadow" readonly required @click="kab.showListbox = true">
					<div v-if="kab.showListbox" class="listbox listbox-provinsi">
						<Listbox :options="kab.list" optionLabel="name" :filter="true" @change="onKabChange" />
					</div>
				</div>
			</div>
			<div class="register-input-group">
				<label for="inputKec">Kecamatan</label>
				<div class="listbox-wrapper" @click.stop="">
					<input type="text" :value="kec.text" :disabled="!kec.idKab" @click="kec.showListbox = true" id="inputKec" class="focus-shadow" readonly required>
					<div v-if="kec.showListbox" class="listbox listbox-provinsi">
						<Listbox :options="kec.list" optionLabel="name" :filter="true" @change="onKecChange" />
					</div>
				</div>
			</div>
			<div class="register-input-group">
				<label for="inputDesa">Desa/Kelurahan</label>
				<div class="listbox-wrapper" @click.stop="">
					<input type="text" :value="desa.text" :disabled="!desa.idKec" @click="desa.showListbox = true" id="inputDesa" class="focus-shadow" readonly required>
					<div v-if="desa.showListbox" class="listbox listbox-provinsi">
						<Listbox :options="desa.list" optionLabel="name" :filter="true" @change="onDesaChange" />
					</div>
				</div>
			</div>
			<div :class="{ 'invalid': v$.address.$invalid && hasSubmitted }" class="register-input-group">
				<label for="inputAddress" class="text-shadow-white">Jalan *</label>
				<textarea v-model="data.address" id="inputAddress" rows="3" class="focus-shadow" required></textarea>
			</div>
		</div>

		<StepCircle :maxItem="3" :active="2" class="my-8" />
		
		<div class="flex gap-4 mx-2 md:mx-4">
			<button type="button" @click="$emit('back')" class="font-medium text-sm px-6 rounded py-2 font-semibold text-gray-600 bg-white border border-gray-500 hover:bg-gray-100">Kembali</button>
			<button type="submit" class="ml-auto font-medium text-sm px-6 rounded py-2 font-semibold text-gray-600 bg-white border border-primary-700 hover:bg-gray-100">Lanjut</button>
		</div>
	</form>
</template>
<style scoped>
	
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