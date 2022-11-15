<script setup>
import { ref } from "vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	fieldId: { type: String, default: "inputImg" },
	fieldAccept: { type: String, default: "*" },
	regexAccept: String
});

const isUnvalid = ref(false);
const hasChange = ref(false);

const checkFileType = files => {
	if(!props.regexAccept)
		return true;

	for(let item of files) {
		const unvalid = item.type.match(new RegExp(props.regexAccept)) === null;
		if(unvalid)
			return false;
	}

	return true;
};

const changeValue = files => {
	if(!files || files.length < 1) return;

	hasChange.value = true;
	isUnvalid.value = !checkFileType(files);

	if(isUnvalid.value)
		return;
	emit("change", files);
};

const onDragOver = event => {
	event.dataTransfer.dropEffect = "copy";
};

const onChange = event => changeValue(event.target.files);
const onDrop = event => changeValue(event.dataTransfer.files);

</script>
<template>
	<div :class="{ 'unvalid': hasChange && isUnvalid }" class="file-upload">
		<span class="label-default">Klik atau geser gambar disini</span>
		<span class="label-unvalid">Ekstensi file tidak cocok.</span>
		<span class="label-icon">
			<font-awesome-icon icon="fa-solid fa-image" />
		</span>
		<input type="file" :accept="fieldAccept" :id="fieldId" @change="onChange" @dragover.stop.prevent="onDragOver" @drop.stop.prevent="onDrop">
	</div>
</template>
<style scoped>
	
.file-upload {
	@apply relative min-h-[4rem] p-16 border-2 border-primary-100 bg-white hover:bg-primary-100/70 rounded-2xl flex flex-col justify-center items-center;
}

.file-upload.unvalid {
	@apply border-red-700/40;
}

.label-default {
	@apply text-sm mb-2 text-black/40 text-center;
}

.unvalid .label-default {
	@apply hidden;
}

.label-unvalid {
	@apply text-sm mb-2 text-red-700/70 hidden text-center;
}

.unvalid .label-unvalid {
	@apply inline;
}

.label-icon {
	@apply text-6xl text-black/20;
}

.unvalid .label-icon {
	@apply text-red-700/30;
}

.file-upload input {
	@apply absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer;
}

</style>