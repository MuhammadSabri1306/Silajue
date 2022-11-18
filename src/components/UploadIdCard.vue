<script setup>
import { ref, watch } from "vue";
import FileUpload from "@/components/FileUpload.vue";

const emit = defineEmits(["change"]);
const props = defineProps(["idCard"]);
const imgSrc = ref(null);

if(props.idCard)
	imgSrc.value = props.idCard;

const onUploadChange = files => {
	const file = files[0];
	emit("change", file);

	const reader = new FileReader();
	reader.onload = event => imgSrc.value = event.target.result;
	reader.readAsDataURL(file);
};

watch(() => props.idCard, idCard => imgSrc.value = idCard);
</script>
<template>
	<div>
		<div class="mb-4">
			<label for="inputIdCard" class="text-sm font-medium text-gray-600 whitespace-nowrap block mb-2">Upload Foto KTP</label>
			<FileUpload fieldId="inputIdCard" fieldAccept="image/*" regexAccept="image.*" @change="onUploadChange" />
		</div>
		<div v-show="imgSrc" class="mb-4 flex justify-center items-center">
			<img :src="imgSrc" class="max-h-[20rem] w-auto">
		</div>
	</div>
</template>