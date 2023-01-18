<script setup>
import { ref, computed, watch } from "vue";
import { useViewStore } from "@/stores/view";

const viewStore = useViewStore();
const toastData = computed(() => viewStore.toastContent);
const openToast = ref(false);
const showToast = ref(false);

const duration = {
	show: 100,
	hide: 6000
};

watch(() => viewStore.toastCounter, () => {
	openToast.value = true;
	setTimeout(() => showToast.value = true, duration.show);
	setTimeout(() => {
		
		if(showToast.value)
			showToast.value = false;

	}, duration.show + duration.hide);
});
</script>
<template>
	<div v-if="openToast" class="toast">
		<Transition name="fade" @after-leave="openToast = false">
			<div v-show="showToast" :class="{ 'toast-success': toastData.success, 'toast-error': !toastData.success }" class="toast-body">
				<span class="toast-icon">
					<slot name="icon"></slot>
					<!-- heroicons > 24 > outline > CheckIcon -->
					<svg v-if="!$slots.icon && toastData.success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
					<!-- heroicons > 24 > outline > ExclamationTriangleIcon -->
					<svg v-if="!$slots.icon && !toastData.success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
					</svg>
				</span>
				<p class="toast-content">
					<span class="toast-title">{{ toastData.title }}</span>
					<span class="toast-message">{{ toastData.message }}</span>
				</p>
				<button type="button" @click="showToast = false" class="toast-close">
					<!-- heroicons > 24 > outline > XMarkIcon -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.toast {
	@apply max-w-[100vw] max-h-screen w-[468px] p-4 md:p-8 fixed z-[9999] bottom-0 right-0;
}

.toast-body {
	@apply backdrop-blur-sm shadow-lg rounded px-4 py-6 border flex gap-4 items-start;
}

.toast-success {
	@apply bg-green-600/80 border-green-600;
}

.toast-error {
	@apply bg-red-600/80 border-red-600;
}

.toast-icon svg {
	@apply w-10 h-10;
}

.toast-icon,
.toast-content,
.toast-close {
	@apply text-white;
	text-shadow: 0 0 2px rgba(0,0,0,0.6);
}

.toast-icon {
	@apply opacity-60;
}

.toast-content {
	@apply grow flex flex-col gap-2;
}

.toast-title {
	@apply font-bold;
}

.toast-message {
	@apply text-sm;
}

.toast-close {
	@apply p-2 transition-opacity opacity-70 hover:opacity-100;
}

.toast-close svg {
	@apply w-6 h-6;
}

.fade-enter-active,
.fade-leave-active {
	transition: margin-top 0.3s, margin-bottom 0.3s, opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply mt-4 -mb-4 opacity-0;
}

</style>