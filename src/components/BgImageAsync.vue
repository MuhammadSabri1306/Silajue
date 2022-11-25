<script setup>
import { ref, computed, watch } from "vue";

const emit = defineEmits(["loaded"]);
const props = defineProps({
	src: { type: String, default: "" },
});

const imgSrc = ref(null);
const styleImg = computed(() => ({ backgroundImage: `url('${ imgSrc.value }')` }));

const load = src => {
	imgSrc.value = null;
	const targetImg = new Image();
	targetImg.onload = () => {
		imgSrc.value = props.src;
		emit("loaded");
	};

	targetImg.src = src;
}

load(props.src);
watch(() => props.src, load);

</script>
<template>
	<div class="bg-cover bg-center bg-no-repeat bg-primary-500" :style="styleImg">
		<slot></slot>
	</div>
</template>