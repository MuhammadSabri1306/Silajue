<script setup>
import { ref } from "vue";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["change"]);

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

const update = () => emit("change", img.value);
</script>
<template>
	<Modal ref="modal">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Gambar Blog</h3>
			</div>
		</template>
		<template #body>
			<div class="pt-4 pb-8 px-8">
				<div v-show="showFileUpload" class="mb-4">
					<label for="inputImg" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">Upload Gambar Blog</label>
					<FileUpload fieldId="inputImg" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
				</div>
				<div v-show="thumbImg" class="mb-4 flex justify-center items-center">
					<img :src="thumbImg" class="max-h-[20rem] w-auto">
				</div>
				<div v-show="!showFileUpload" class="mb-8">
					<button type="button" class="text-primary-700 rounded px-2 py-2 text-xs font-medium border border-primary-600 bg-white hover:bg-gray-100">Ganti Gambar</button>
				</div>
				<div class="flex justify-end">
					<button type="button" @click="update" class="text-white rounded px-3 py-2 hover-margin bg-primary-600 hover:bg-primary-500">Lanjutkan</button>
				</div>
			</div>
		</template>
	</Modal>
</template>