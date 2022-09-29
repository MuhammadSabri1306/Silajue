<script setup>
import { computed, watch } from "vue";
import { useViewStore } from "@/stores/view";

const viewStore = useViewStore();
const props = defineProps({ isClickable: Boolean });

const isShow = computed(() => viewStore.showBackdrop);
const hide = () => {
	if(props.isClickable)
		viewStore.toggleShowBackdrop(false);
};

if(isShow.value)
	document.body.classList.add("overflow-hidden");

watch(
	() => isShow.value,
	(show) => {
		if(show)
			document.body.classList.add("overflow-hidden");
		else
			document.body.classList.remove("overflow-hidden");
	}
);
</script>
<template>
	<Transition>
		<div v-if="isShow" class="fixed top-0 left-0 w-screen h-screen" @click="hide">
			<slot name="content"></slot>
		</div>
	</Transition>
</template>
<style scoped>
	.v-enter-active, .v-leave-active {
		transition: opacity .3s ease-in-out;
	}

	.v-enter-from, .v-leave-to {
		@apply opacity-0;
	}
</style>