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
					<li>Pembayaran dapat dilakukan via <b>QRIS</b> maupun <b>Transfer Bank</b>.</li>
					<li>Rekening untuk pembayaran dapat dilihat di menu <b>Metode Pembayaran</b>.</li>
					<li class="hidden lg:list-item">Setelah melakukan pembayaran, silahkan klik status invoice anda ( <span class="bg-red-200 text-gray-900 text-sm font-medium px-2 capitalize">Belum Verifikasi</span> ) pada kolom Invoice.</li>
					<li class="lg:hidden">Setelah melakukan pembayaran, silahkan klik status <span class="bg-red-200 text-gray-900 text-sm font-medium px-2 capitalize">Belum Verifikasi</span> pada invoice anda.</li>
					<li>Setelah kami memverifikasi invoice, status akan berganti menjadi <span class="bg-green-300 text-gray-900 text-sm font-medium px-2 capitalize">Aktif</span>. Silahkan klik tombol <b>Tiket Pesanan</b> untuk menampilkan Tiket Pesanan anda.</li>
					<li>Tiket Pesanan tersebut dapat anda bawa ke <b>Bank Sperma</b> kami untuk diperlihatkan kepada petugas. Pesanan anda sudah dapat diambil setelah petugas memverifikasi Tiket Pesanan anda.</li>
					<li>Anda dapat menghubungi kami jika mengalami kesulitan dalam bertransaksi.</li>
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