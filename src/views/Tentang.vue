<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import OrganizationStructure from "@/components/OrganizationStructure.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<section class="py-16">
				<div class="blob-1">
					<img src="/assets/img/blob1.svg">
				</div>
				<div class="blob-2">
					<img src="/assets/img/blob2.svg">
				</div>
				<div class="relative">
					<div class="container mt-8 mb-8">
						<h6 class="text-4xl font-bold text-gray-900">Tentang Kami</h6>
						<div class="border-t my-4"></div>
						<div class="flex gap-4 items-center mb-8">
							<img src="/assets/img/logo-pemprov-sulsel.webp" alt="Logo Pemprov. Sulawesi Selatan" class="h-24">
							<img src="/assets/img/logo-ib.png" alt="Logo Inseminasi Buatan" class="h-28">
						</div>
						<h3 class="text-3xl font-light text-gray-900 text-shadow-white mb-2">UPT Pelayanan Inseminasi Buatan dan Produk Semen</h3>
						<h5 class="text-lg text-gray-900 font-bold text-shadow-white">Dinas Peternakan dan Kesehatan Hewan</h5>
						<h5 class="text-lg text-primary-500 font-bold text-shadow-white">Provinsi Sulawesi Selatan</h5>
					</div>
					<div class="container mb-16 basic-paragraph">
						<p>Program Peningkatan Program Sapi dan Kerbau sebagai Komoditas Andalan Negeri <b>(Sikomandan)</b> diluncurkan oleh Kementrian RI diawal tahun 2020. Program ini dimaksud untuk menungkatkan populasi sapi dan kerbau untuk pemenuhan kebutuhan dalam negeri. Langkah peningkatan kelahiran antara lain diimplementasikan  dengan gerakan optimalisasi Inseminasi Buatan (IB). Kebutuhan semen beku untuk program tersebut lebih dari 5 juta dosis per tahun.</p>
						<p>Pemerintah Provinsi Sulawesi Selatan melalui <b>UPT-PIBPS</b> terus berupaya untuk meningkatkan produksi dan pendistribusian semen beku disertai dengan peningkatan mutu dan kuatlitas secara berkesinambungan.</p>
						<p>UPT-PIBPS atau <b>UPT Pelayanan Inseminasi Buatan dan Produk Semen</b> itu sendiri didirikan pada tahun 2018 yang merupakan perwujudan desentralisasi urusan Pemerintah Pusat ke Provinsi/Daerah dalam pelayanan Inseminasi Buatan untuk meningkatkan efisiensi dan efektifitas proses semen beku, penyediaan nitrogen cair, dan  pendistribusiannya.</p>
					</div>
					<div class="container mb-36">
						<h5 class="text-lg text-gray-900 font-bold text-shadow-white mb-8">Strategi Pelayanan</h5>
						<div class="flex flex-wrap justify-center gap-8 ml-4 md:ml-0">
							<div class="card">
								<div class="card-badge">
									<span>1</span>
								</div>
								<span>Diverifikasi sumber genetik unggul dengan penyediaan pejantan/pemacak bangsa lokal maupun eksotik.</span>
							</div>
							<div class="card">
								<div class="card-badge">
									<span>2</span>
								</div>
								<span>Penyediaan dan penerapan manajemen pakan, kesehatan dan kesejahtraan bagi pejantan/pemacak.</span>
							</div>
							<div class="card">
								<div class="card-badge">
									<span>3</span>
								</div>
								<span>Penerapan teknologi mutakhir dan penggunaan peralatan modern dalam pengelolaan semen.</span>
							</div>
							<div class="card">
								<div class="card-badge">
									<span>4</span>
								</div>
								<span>Tenaga Profesional, terlatih dan bertanggungjawab serta pelibatan tenaga ahli dari institusi pendidikan/litbang.</span>
							</div>
							<div class="card">
								<div class="card-badge">
									<span>5</span>
								</div>
								<span>Pelayanan prima, akuntabel, berkompeten, harmonis, loyal, adaptif, dan kolaboratif (berAKHLAK).</span>
							</div>
						</div>
					</div>
					<div class="container mb-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
						<div>
							<h5 class="text-lg text-gray-900 font-bold text-shadow-white mb-8 text-center">Struktur Organisasi</h5>
							<OrganizationStructure />
						</div>
						<div class="basic-paragraph">
							<h3 class="text-3xl font-light text-primary-500 text-shadow-white text-center lg:text-left mb-8">“The Frozen Drop Prosperity”</h3>
							<p><b>UPT-PIBPS</b> senantiasa mengutamakan peran pelayanan dalam penyediaan semen beku bagi akseptor baik dalam maupun luar provinsi. Potensi akseptor dalam SulSel sendiri mencapai 613 ekor, sementara kapasitas produksi UPT-PIBPS adalah antara 100 - 250 ribu dosis per tahun.</p>
							<p>Kami telah memperoleh sertifikasi Standar Nasional Indonesia baik dari segi manajemen dan standar kualiatas semen yang diproduksi. Penanganan  semen segar hingga menjadi semen beku dilakukan dengan teknologi modern dan oleh tenaga terlatih dan profesional.</p>
						</div>
					</div>
				</div>
			</section>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
section {
	@apply bg-gray-100 relative;
}

.blob-1,
.blob-2 {
	@apply absolute;
}

.blob-1 {
	@apply top-0 right-0;
}

.blob-1 img,
.blob-2 img {
	@apply w-96;
}

.blob-2 {
	@apply bottom-0 left-0;
}

.basic-paragraph p {
	@apply mb-8 leading-relaxed;
}

.card {
	@apply w-full md:w-[30%] relative bg-white rounded-2xl shadow-lg text-gray-600 pr-4 pb-4 pt-6 pl-6 border border-primary-500 text-sm font-medium flex items-center;
}

.card-badge {
	@apply text-xl font-bold p-4 leading-none text-white bg-primary-500 rounded-full w-10 h-10 absolute -top-4 -left-4 flex justify-center items-center;
}

</style>