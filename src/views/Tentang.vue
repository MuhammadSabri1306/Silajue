<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="bg-white py-16">
				<div class="container pt-8">
					<h6 class="text-4xl font-bold text-black/90">Tentang Kami</h6>
					<div class="border-t py-4 mt-4">
						<div class="bg-gray-100 px-12 py-16 rounded-sm">
							<h6 class="text-lg font-semibold mb-2 text-black/90">Apa itu Silajue?</h6>
							<p class="mb-8 text-black/80">Sistem Silajue adalah sebuah sistem layanan penjualan digital yang dibangun khusus untuk pejualan semen beku di Dinas Kesehatan Hewan Dan Peternakan Provinsi Sulawesi Selatan.</p>
							<h6 class="text-lg font-semibold mb-2 text-black/90">Target pengguna</h6>
							<p class="mb-8 text-black/80">Target pengguna kami adalah para peternak yang membutuhkan semen beku.</p>
							<h6 class="text-lg font-semibold mb-2 text-black/90">Visi Kami</h6>
							<p class="text-black/80">Visi kami adalah mewujudkan pelayanan yang prima dan meningkatkan produksi ternak di Sulawesi Selatan.</p>
							<div class="flex mt-16 justify-center items-center">
								<img src="/assets/img/logo.png" class="w-[20rem]">
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>