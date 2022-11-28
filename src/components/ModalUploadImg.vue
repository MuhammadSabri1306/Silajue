<script setup>
import { ref } from "vue";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	title: String,
	label: String
});

const img = ref(null);
const showFileUpload = ref(true);
const thumbImg = ref(null);

const onUploadChange = files => {
	img.value = files[0];
	showFileUpload.value = false;
	updateThumbImg();
};

const updateThumbImg = () => {
	const reader = new FileReader();
	reader.onload = event => {
		thumbImg.value = event.target.result;
	};
	reader.readAsDataURL(img.value);
};

const showLoadingIcon = ref(false);
const isLoading = val => showLoadingIcon.value = val;
defineExpose({ isLoading });

const update = () => emit("change", img.value);
</script>
<template>
	<Modal ref="modal">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">{{ title }}</h3>
			</div>
		</template>
		<template #body>
			<div class="pt-4 pb-8 px-8">
				<div v-show="showFileUpload" class="mb-4">
					<label for="inputImg" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">{{ label }}</label>
					<FileUpload fieldId="inputImg" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
				</div>
				<div v-show="thumbImg && !showFileUpload" class="mb-4 flex justify-center items-center">
					<img :src="thumbImg" class="max-h-[20rem] w-auto">
				</div>
				<div v-show="!showFileUpload" class="mb-8">
					<button type="button" @click="showFileUpload = true" class="text-primary-700 rounded px-2 py-2 text-xs font-medium border border-primary-600 bg-white hover:bg-gray-100">Ganti Gambar</button>
				</div>
				<div class="flex justify-end">
					<button type="button" @click="update" :class="{ 'py-2': !showLoadingIcon, 'py-3': showLoadingIcon }" class="btn-icon px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
						<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
						<span>Upload</span>
					</button>
				</div>
			</div>
		</template>
	</Modal>
</template>