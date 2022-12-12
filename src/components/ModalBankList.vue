<script setup>
import Modal from "@/components/ui/Modal.vue";
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="p-8">
				<h3 class="text-lg text-gray-700">Transfer Bank</h3>
			</div>
		</template>
		<template #body>
			<div class="p-4">
				<div class="flex justify-center mb-8">
					<img src="/assets/img/logo-banks-sulselbar.svg" alt="Logo Bank Sulselbar" class="w-1/2 h-auto">
				</div>
				<p class="font-semibold text-center">No. Rekening</p>
				<p class="text-lg mb-4 text-center">130 001 000006731 9</p>
				<p class="font-semibold text-center">atas nama</p>
				<p class="text-lg mb-8 text-center">RKUD Provinsi Sulawesi Selatan</p>
			</div>
		</template>
	</Modal>
</template>