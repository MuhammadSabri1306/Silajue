<script setup>
import { ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";

const emit = defineEmits(["cancel", "save"]);
const props = defineProps({
	title: String,
	submitTitle: String,
	name: String,
	type: String,
	price: Number
});

const { data, v$ } = useDataForm({
	name: { value: props.name, required },
	isSexing: { value: props.type == "sexing" },
	price: { value: props.price, required }
});

const onSubmit = async () => {
	const isValid = await v$.value.$validate();
	if(!isValid) {
		return;
	}

	emit("save", {
		name: data.name,
		type: data.isSexing ? "sexing" : "unsexing",
		price: data.price
	});
};
</script>
<template>
	<Modal @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-600">{{ title }}</h3>
			</div>
		</template>
		<template #body>
			<form @submit.prevent="onSubmit">
				<div class="px-8 py-4">
					<div class="input-group mb-8">
						<label for="inputName">Nama Kategori</label>
						<input type="text" v-model="v$.name.$model" id="inputName">
					</div>
					<div class="grid grid-cols-[auto_1fr] gap-8">
						<div class="input-group">
							<label>Sexing</label>
							<SwitchToggle :value="data.isSexing" @toggle="data.isSexing = !data.isSexing" />
						</div>
						<div class="input-group">
							<label for="inputPrice">Harga (IDR)</label>
							<input type="number" v-model="v$.price.$model" id="inputPrice">
						</div>
					</div>
				</div>
				<div class="flex justify-end px-8 py-4">
					<button type="submit" class="px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">{{ submitTitle }}</button>
				</div>
			</form>
		</template>
	</Modal>
</template>