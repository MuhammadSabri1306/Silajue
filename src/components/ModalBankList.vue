<script setup>
import Modal from "@/components/ui/Modal.vue";
</script>
<template>
	<Modal ref="modal" :large="true">
		<template #header>
			<div class="p-8">
				<h3 class="text-lg text-gray-700">Daftar Bank</h3>
			</div>
		</template>
		<template #body>
			<div class="pb-4">
				<table>
					<thead>
						<tr><th>BANK</th><th>No. Rekening</th></tr>
					</thead>
					<tbody>
						<tr>
							<td class="bank-logo">
								<img src="/assets/img/bri-logo.webp" alt="logo Bank BRI">
							</td>
							<td class="bank-number">******************</td>
						</tr>
						<tr>
							<td class="bank-logo">
								<img src="/assets/img/bni_logo.webp" alt="logo Bank BRI">
							</td>
							<td class="bank-number">******************</td>
						</tr>
						<tr>
							<td class="bank-logo">
								<img src="/assets/img/mandiri_logo.webp" alt="logo Bank BRI">
							</td>
							<td class="bank-number">******************</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</Modal>
</template>
<style scoped>

table {
	@apply w-full table-auto border-collapse;
}

th, td {
	@apply px-4 py-4 text-center align-middle;
}

th, tr:not(:last-child) td {
	@apply border-b;
}

.bank-logo {
	@apply flex justify-center items-center;
}

.bank-logo img {
	@apply w-auto max-h-[2rem];
}

</style>