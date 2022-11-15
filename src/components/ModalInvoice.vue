<script setup>
import { ref } from "vue";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["cancel"]);
const props = defineProps({
	id: { required: true }
})

const transferNote = ref(null);
const onUploadChange = files => {
	transferNote.value = files[0];
	console.log(transferNote.value);
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
				<div class="mb-4">
					<label for="inputTranferNote" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">Upload Bukti Transfer</label>
					<FileUpload fieldId="inputTranferNote" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
				</div>
				<div class="flex justify-end">
					<button type="button" class="flex justify-center items-center text-white rounded px-3 py-2 hover-margin bg-primary-600 hover:bg-primary-500">Verifikasi</button>
				</div>
			</div>
		</template>
	</Modal>
</template>