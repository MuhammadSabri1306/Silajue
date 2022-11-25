<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["verified"]);
const props = defineProps({
	invoiceId: { required: true }
});

const userStore = useUserStore();
const viewStore = useViewStore();

const transferNote = ref(null);
const showFileUpload = ref(true);
const imgSrc = ref(null);
const showLoadingIcon = ref(false);

const onUploadChange = files => {
	transferNote.value = files[0];
	showFileUpload.value = false;
	updateImgSrc();
};

const updateImgSrc = () => {
	const reader = new FileReader();
	reader.onload = event => imgSrc.value = event.target.result;
	reader.readAsDataURL(transferNote.value);
};

const verify = () => {
	const formData = new FormData();
	formData.append("proof_payment", transferNote.value);

	showLoadingIcon.value = true;
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.post("/invoice/" + props.invoiceId, formData, { headers })
		.then(response => {
			showLoadingIcon.value = false;
			viewStore.showToast("sendInvoiceVerification", true);
			emit("verified");
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("sendInvoiceVerification", false);
		});
};
</script>
<template>
	<Modal ref="modal">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Verifikasi Pembayaran</h3>
			</div>
		</template>
		<template #body>
			<div class="pt-4 pb-8 px-8">
				<label for="inputTranferNote" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">Upload Bukti Transfer</label>
				<div v-show="showFileUpload" class="mb-4">
					<FileUpload fieldId="inputTranferNote" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
				</div>
				<div v-show="imgSrc" class="mb-4 flex justify-center items-center">
					<img :src="imgSrc" class="max-h-[20rem] w-auto">
				</div>
				<div v-show="!showFileUpload" class="mb-8">
					<button type="button" @click="showFileUpload = true" class="text-primary-700 rounded px-2 py-2 text-xs font-medium border border-primary-600 bg-white hover:bg-gray-100">Upload Ulang</button>
				</div>
				<div class="flex justify-end">
					<button type="button" @click="verify" :class="{ 'py-2': !showLoadingIcon, 'py-3': showLoadingIcon }" class="btn-icon px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
						<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
						<span>Verifikasi</span>
					</button>
				</div>
			</div>
		</template>
	</Modal>
</template>