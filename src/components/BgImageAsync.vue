<script setup>
import { ref, computed, watch } from "vue";
import { v3ImgPreviewFn } from "v3-img-preview";

const emit = defineEmits(["loaded"]);
const props = defineProps({
	src: { type: String, default: "" },
	preview: { type: Boolean, default: true }
});

const imgSrc = ref(null);
const isImgLoaded = ref(false);
const styleImg = computed(() => {
	if(!isImgLoaded.value)
		return {};
	return { backgroundImage: `url('${ imgSrc.value }')` };
});

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

const previewImg = () => isImgLoaded.value && props.preview && v3ImgPreviewFn(imgSrc.value);
const imgClass = computed(() => {
	if(!isImgLoaded.value)
		return ["skeleton-loader"];
	
	const classList = ["bg-cover", "bg-center", "bg-no-repeat"];
	if(props.preview)
		classList.push("cursor-pointer");
	return classList;
});
</script>
<template>
	<div :style="styleImg" @click="previewImg" :class="imgClass">
		<slot></slot>
	</div>
</template>