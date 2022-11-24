<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
	name: { type: String, default: "User" },
	img: { type: String }
});

// https://silajue.taekwondosulsel.info/storage/image/Avatar/VEmaEYw6OcKoh4mkDtCSz6rYdCBoEKB0WngDHtvt.jpg

const data = reactive({
	name: props.name,
	img: props.img
});

const initialName = computed(() => data.name[0]);
const styleImg = computed(() => ({ backgroundImage: `url('${ data.img }')` }));

watch(() => props.name, name => data.name = name);
watch(() => props.img, img => data.img = img);
</script>
<template>
	<div class="avatar-wrapper">
		<div v-if="!img" class="avatar-layer bg-primary-600 flex justify-center items-center">
			<span class="text-[1.7rem] text-white font-semibold align-middle leading-4">{{ initialName }}</span>
		</div>
		<div v-else class="avatar-layer bg-cover bg-center bg-no-repeat" :style="styleImg"></div>
	</div>
</template>
<style scoped>
	
.avatar-wrapper {
	@apply relative w-12 h-12 rounded-full overflow-hidden shadow-sm border-[3px] border-primary-600 bg-primary-600 transition-opacity opacity-100 hover:opacity-70;
}

.avatar-layer {
	@apply absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2;
}

</style>