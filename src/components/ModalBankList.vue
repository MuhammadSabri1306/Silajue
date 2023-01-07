<script setup>
import { ref } from "vue";
import Modal from "@/components/ui/Modal.vue";

const activeTab = ref(0);
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="px-8 pt-8 pb-4 flex">
				<button type="button" @click="activeTab = 0" :class="{ 'active': activeTab === 0 }" class="btn-tab">
					<h3>QRIS</h3>
				</button>
				<button type="button" @click="activeTab = 1" :class="{ 'active': activeTab === 1 }" class="btn-tab">
					<h3>Transfer Bank</h3>
				</button>
			</div>
		</template>
		<template #body>
			<div>
				<div v-show="activeTab === 1" class="p-4">
					<div class="flex justify-center mb-8">
						<img src="/assets/img/logo-banks-sulselbar.svg" alt="Logo Bank Sulselbar" class="w-1/2 h-auto">
					</div>
					<p class="font-semibold text-center">No. Rekening</p>
					<p class="text-lg mb-4 text-center">130 001 000006731 9</p>
					<p class="font-semibold text-center">atas nama</p>
					<p class="text-lg mb-8 text-center">RKUD Provinsi Sulawesi Selatan</p>
				</div>
				<div v-show="activeTab === 0">
					<img src="/assets/img/qris.webp" alt="QRIS UPT PIBPS DISNAKKESWAN" class="max-w-full">
				</div>
			</div>
		</template>
	</Modal>
</template>
<style scoped>
	
.btn-tab {
	@apply px-4 py-2 border-b-2 border-gray-200 text-lg transition-colors text-gray-700 bg-white hover:bg-gray-100;
}

.btn-tab.active {
	@apply border-primary-700 text-primary-700;
}

</style>