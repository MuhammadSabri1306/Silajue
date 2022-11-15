<script setup>
import { ref } from "vue";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["cancel"]);
const props = defineProps({
	id: { required: true }
})

const transferNote = ref(null);
const showFileUpload = ref(true);
const imgSrc = ref(null);

const onUploadChange = files => {
	transferNote.value = files[0];
	showFileUpload.value = false;
	updateImgSrc();
};

const updateImgSrc = () => {
	const reader = new FileReader();
	reader.onload = event => {
		imgSrc.value = event.target.result;
		console.log(imgSrc.value);
	};
	reader.readAsDataURL(transferNote.value);
};
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Verifikasi Pembayaran</h3>
			</div>
		</template>
		<template #body>
			<div class="pt-4 pb-8 px-8">
				<div v-show="showFileUpload" class="mb-4">
					<label for="inputTranferNote" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">Upload Bukti Transfer</label>
					<FileUpload fieldId="inputTranferNote" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
				</div>
				<div v-show="imgSrc" class="mb-4 flex justify-center items-center">
					<img :src="imgSrc" class="max-h-[20rem] w-auto">
				</div>
				<div v-show="!showFileUpload" class="mb-8">
					<button type="button" class="text-primary-700 rounded px-2 py-2 text-xs font-medium border border-primary-600 bg-white hover:bg-gray-100">Upload Ulang</button>
				</div>
				<div class="flex justify-end">
					<button type="button" class="text-white rounded px-3 py-2 hover-margin bg-primary-600 hover:bg-primary-500">Verifikasi</button>
				</div>
			</div>
		</template>
	</Modal>
</template>