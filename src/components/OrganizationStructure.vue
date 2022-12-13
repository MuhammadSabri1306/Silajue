<template>
	<div class="grid grid-cols-8">
		
		<div class="col-span-2"></div>
		<div class="col-span-4 card-wrapper justify-center">
			<a role="button" class="card-structure">
				<span class="font-semibold">Kepala Dinas</span>
			</a>
		</div>
		<div class="col-span-2"></div>

		<div class="col-span-4 line-v">&nbsp;</div>
		<div class="col-span-4"></div>

		<div class="col-span-2"></div>
		<div class="col-span-4 card-wrapper justify-center">
			<a role="button" class="card-structure">
				<span class="font-semibold">Kepala UPT</span>
			</a>
		</div>
		<div class="col-span-2"></div>

		<div class="col-span-4 line-v">&nbsp;</div>
		<div class="col-span-4"></div>

		<div class="col-span-3 row-span-2 card-wrapper justify-end">
			<a role="button" class="card-structure">
				<span>Kelompok<br>Jabatan Fungsional</span>
			</a>
		</div>
		<div class="line-v line-h"></div>
		<div class="line-h"></div>
		<div class="col-span-3 row-span-2 card-wrapper justify-start">
			<a role="button" class="card-structure">
				<span>Subag. Tata Usaha</span>
			</a>
		</div>

		<div class="col-start-4 col-end-5 line-v"></div>
		<div class="col-start-5 col-end-6 "></div>

		<div class="col-span-4 line-v">&nbsp;</div>
		<div class="col-span-4"></div>

		<div class="col-span-3 row-span-2 card-wrapper justify-end">
			<a role="button" class="card-structure">
				<span>Kepala Seksi<br>Pelayanan Inseminasi<br>Buatan (IB)</span>
			</a>
		</div>
		<div class="line-v line-h"></div>
		<div class="line-h"></div>
		<div class="col-span-3 row-span-2 card-wrapper justify-start">
			<a role="button" class="card-structure">
				<span>Kepala Seksi<br>Pemeliharaan Ternak<br>& Produksi Semen</span>
			</a>
		</div>

		<div class="col-start-4 col-end-5"></div>
		<div class="col-start-5 col-end-6 "></div>

	</div>
</template>
<style scoped>

.card-wrapper {
	@apply h-full flex items-stretch;
}

.card-structure {
	@apply p-4 relative rounded flex justify-center items-center bg-gray-900 transition-all duration-300 text-sm hover:text-base text-white hover:text-primary-500;
}

.card-structure span {
	@apply text-center;
}

.line-v,
.line-h {
	@apply border-gray-400;
}

.line-v {
	@apply border-r-2;
}

.line-h {
	@apply border-b-2;
}

</style>