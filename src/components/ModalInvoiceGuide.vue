<script setup>
import Modal from "@/components/ui/Modal.vue";
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="p-8">
				<h3 class="text-lg text-gray-700">Panduan Pembayaran</h3>
			</div>
		</template>
		<template #body>
			<div class="pb-4 px-10 md:px-16">
				<ol class="list-decimal">
					<li>Pembayaran dapat dilakukan via <b>Transfer Bank</b>.</li>
					<li>Daftar Bank dapat dilihat di menu <b>Lihat Daftar Bank</b>.</li>
					<li class="hidden lg:list-item">Setelah melakukan pembayaran, silahkan klik <b>Verifikasi</b> pada kolom <b>Status</b> di invoice anda.</li>
					<li class="lg:hidden">Setelah melakukan pembayaran, silahkan klik <b>Verifikasi</b> pada invoice anda.</li>
					<li>Setelah kami memverifikasi invoice, status akan berganti menjadi pengiriman. Pesanan akan dikirim ke alamat anda.</li>
					<li>Anda dapat menghubungi kami jika mengalami kesulitan dalam pemesanan.</li>
				</ol>
			</div>
		</template>
	</Modal>
</template>
<style scoped>

li {
	@apply mb-4;
}

</style>