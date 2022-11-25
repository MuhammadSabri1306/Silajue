<script setup>
import { ref, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";

const chartSelledProduct = {
	options: reactive({}),
	series: reactive([]),
	loaded: ref(false),
	setup: ({ categories, series }) => {
		chartSelledProduct.options = {
			chart: { id: "chartSelledProduct" },
			xaxis: { categories },
			yaxis: {
				labels: { formatter: val => val.toFixed(0) }
			}
		};
		chartSelledProduct.series = series;
	}
};

const chartIncome = {
	options: reactive({}),
	series: reactive([]),
	loaded: ref(false),
	setup: ({ categories, data }) => {
		chartIncome.options = {
			chart: { id: "chartIncome" },
			xaxis: { categories },
			yaxis: {
				labels: { formatter: val => val.toFixed(0) }
			}
		};
		chartIncome.series = [{ name: "IDR", data }];
	}
};

const countProduct = reactive({
	data: 0,
	loaded: false
});

const countPost = reactive({
	data: 0,
	loaded: false
});

const countUser = reactive({
	data: 0,
	loaded: false
});

chartSelledProduct.setup({
	categories: ["Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov"],
	series: [
		{ name: "Produk Terjual", data: [0, 0, 0, 0, 0, 0, 0, 3] },
		{ name: "Jumlah Pengguna", data: [0, 0, 0, 0, 0, 0, 0, 4] }
	]
});
chartSelledProduct.loaded.value = true;

chartIncome.setup({
	categories: ["Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov"],
	data: [0, 0, 0, 0, 0, 0, 0, 192000]
});
chartIncome.loaded.value = true;

countProduct.data = 19;
countProduct.loaded = true;

countPost.data = 1;
countPost.loaded = true;

countUser.data = 4;
countUser.loaded = true;
</script>
<template>
	<DashbLayout>
		<template #main>
			<div>
				<h3 class="page-title">Dashboard</h3>
				<div class="chart-wrapper">
					<div v-if="chartSelledProduct.loaded" class="chart bg-white">
						<VueApexCharts width="500" type="bar" :options="chartSelledProduct.options" :series="chartSelledProduct.series" />
					</div>
				</div>
				<div class="chart-wrapper">
					<div v-if="countProduct.loaded" class="chart card-chart hover-opacity bg-blue-700">
						<h6 class="count-title">Jumlah Produk</h6>
						<p class="count-number">{{ countProduct.data }}</p>
					</div>
					<div v-if="countPost.loaded" class="chart card-chart hover-opacity bg-emerald-500">
						<h6 class="count-title">Jumlah Post</h6>
						<p class="count-number">{{ countPost.data }}</p>
					</div>
					<div v-if="countUser.loaded" class="chart card-chart hover-opacity bg-amber-500">
						<h6 class="count-title">Jumlah Penguna</h6>
						<p class="count-number">{{ countUser.data }}</p>
					</div>
				</div>
				<div class="chart-wrapper">
					<div v-if="chartIncome.loaded" class="chart card-chart bg-white">
						<h6 class="chart-title">Pendapatan</h6>
						<VueApexCharts width="600" type="line" :options="chartIncome.options" :series="chartIncome.series" />
					</div>
				</div>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
.chart-wrapper {
	@apply mb-16 flex flex-wrap gap-8;
}

.chart {
	@apply grow flex flex-col justify-center items-center;
}

.card-chart {
	@apply rounded-2xl border shadow-lg p-4;
}

.chart-title {
	@apply text-xs font-semibold text-gray-800 mb-4 mr-auto whitespace-nowrap;
}

.count-title {
	@apply text-xs font-semibold text-white opacity-90 my-4 whitespace-nowrap text-center;
}

.count-number {
	@apply text-6xl text-white mb-8 whitespace-nowrap text-center;
}

.hover-opacity {
	@apply cursor-default transition-opacity duration-300 opacity-100 hover:opacity-90; 
}


</style>