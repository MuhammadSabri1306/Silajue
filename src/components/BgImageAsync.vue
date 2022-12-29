<script setup>
import { ref, computed, watch } from "vue";
import { v3ImgPreviewFn } from "v3-img-preview";

const emit = defineEmits(["loaded"]);
const props = defineProps({
	src: { type: String, default: "" },
});

const imgSrc = ref(null);
const styleImg = computed(() => ({ backgroundImage: `url('${ imgSrc.value }')` }));

const isImgLoaded = ref(false);
const load = src => {
	imgSrc.value = null;
	const targetImg = new Image();
	targetImg.onload = () => {
		imgSrc.value = props.src;
		emit("loaded");
		isImgLoaded.value = true;
	};

	targetImg.src = src;
}

load(props.src);
watch(() => props.src, load);

const previewImg = () => isImgLoaded.value && v3ImgPreviewFn(imgSrc.value);
</script>
<template>
	<div :class="{ 'cursor-pointer': isImgLoaded }" :style="styleImg" @click="previewImg" class="bg-cover bg-center bg-no-repeat bg-gray-500">
		<slot></slot>
	</div>
</template>