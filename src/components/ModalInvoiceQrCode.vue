<script setup>
import Modal from "@/components/ui/Modal.vue";
import QrcodeVue from "qrcode.vue";

defineProps({
	noInvoice: { type: String, required: true }
});
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="p-8">
				<h3 class="text-lg text-gray-700">Tiket Pesanan</h3>
			</div>
		</template>
		<template #body>
			<div class="px-8 pb-8 pt-4">
				<p class="text-sm font-bold text-gray-700 text-center">Tiket Pesanan Silajue</p>
				<div class="flex justify-center items-center p-4 my-4">
					<QrcodeVue :value="noInvoice" render-as="svg" :size="300" level="H" />
				</div>
				<p class="text-sm text-gray-600">Silahkan mengambil pesanan anda di Bank Sperma<span class="font-semibold"> UPT PIBPS </span>Dinas Peternakan dan Kesehatan Hewan Prov. Sulawesi Selatan. Harap memperlihatkan tiket ini kepada petugas.</p>
			</div>
		</template>
	</Modal>
</template>