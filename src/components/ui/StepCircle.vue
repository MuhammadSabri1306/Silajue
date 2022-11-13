<script setup>

const props = defineProps({
	maxItem: { type: Number, required: true },
	active: { type: Number, required: true }
});

</script>
<template>
	<div class="flex justify-center items-center gap-2">
		<button v-for="n in maxItem" type="button" :class="{ 'active': n===active }" class="step-circle-item"></button>
	</div>
</template>
<style scoped>

.step-circle-item {
	@apply cursor-default w-3 h-3 rounded-full border border-gray-300 bg-transparent;
}

.step-circle-item.active {
	@apply rounded-full border-primary-600 bg-primary-600;
}

</style>