<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product";

const emit = defineEmits(["change"]);
const props = defineProps({
	defaultValue: { type: String, default: "red" },
	position: { type: String, default: "bottom" }
});

const productStore = useProductStore();
const getColors = () => {
	const data = [];
	for(let key in productStore.colors) {
		data.push({ key, ...productStore.colors[key] });
	}
	return data;
};

const colors = getColors();
let defaultIndex = colors.findIndex(item => item.key == props.defaultValue);
defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;

const optionsBody = ref(null);
const selectedIndex = ref(defaultIndex);
const showOptions = ref(false);

const onOptionsBlur = event => {
	if(optionsBody.value.contains(event.relatedTarget))
		return;
	showOptions.value = false;
};

const onOptionsClick = index => {
	showOptions.value = false;
	if(index === selectedIndex.value)
		return;

	selectedIndex.value = index;
	emit("change", colors[index].key);
};
</script>
<template>
	<div class="relative">
		<button type="button" @click="showOptions = !showOptions" @focusout="onOptionsBlur" class="select-toggler">
			<div :class="[colors[selectedIndex].bg]" class="color-circle"></div>
			<span class="color-text">{{ colors[selectedIndex].title }}</span>
			<span class="ml-auto text-gray-500">
				<font-awesome-icon icon="fa-solid fa-caret-down" fixed-width />
			</span>
		</button>
		<Transition name="fade">
			<ul v-show="showOptions" ref="optionsBody" @focusout="onOptionsBlur" :class="{ 'body-post-top': position == 'top' }" class="option-body" tabindex="-1">
				<li v-for="(item, index) in colors">
					<button type="button" @click="onOptionsClick(index)" :class="{ 'active': index === selectedIndex }" class="option-item px-4 py-2 text-left">
						<div :class="item.bg" class="color-circle"></div>
						<span class="color-text">{{ item.title }}</span>
					</button>
				</li>
			</ul>
		</Transition>
	</div>
</template>
<style scoped>

.select-toggler {
	@apply border rounded text-gray-700 border-gray-200 hover:border-gray-400 focus:border-gray-400;
}

.option-body {
	@apply absolute w-full flex flex-col bg-white rounded border shadow-sm overflow-y-auto;
}

.option-body.body-post-top {
	@apply bottom-full;
}

.option-item > li:not(:last-child) {
	@apply border-b;
}

.select-toggler,
.option-item {
	@apply flex items-center block w-full text-sm px-4 py-2 capitalize;
}

.option-item {
	@apply text-gray-600 transition-colors bg-transparent hover:bg-gray-100;
}

.option-item.active {
	@apply text-primary-600;
}

.select-toggler .color-circle,
.option-item .color-circle {
	@apply w-6 h-6 rounded-full mr-2 border;
}

.option-item .color-text {
	@apply block text-gray-700 text-sm font-medium;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-2 mb-2;
}

.fade-enter-from.body-post-top,
.fade-leave-to.body-post-top {
	@apply mt-2 -mb-2;
}

</style>