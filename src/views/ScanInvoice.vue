<script setup>
import { ref, defineAsyncComponent  } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import Footer from "@/components/basic-layout/Footer.vue";
import Loader from "@/components/Loader.vue";

const Scanner = defineAsyncComponent(() => import("@/components/InvoiceScanner.vue"));
const showScanner = ref(false);

const router = useRouter();
const viewStore = useViewStore();
const userStore = useUserStore();

const onDecode = noInvoice => {
	const headers = { "Authorization": "Bearer " + userStore.token };
	showScanner.value = false;

	http.get("/invoice/detail/" + noInvoice, { headers })
		.then(response => {
			const dataItem = response.data.data;
			if(!dataItem)
				return viewStore.showToast("scanInvoice", false);
			
			const invoiceId = dataItem.id;
			router.push("/app/invoice/" + invoiceId);
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("scanInvoice", false);
		});
};
</script>
<template>
	<div class="min-h-screen flex flex-col bg-gray-100">
		<nav class="border-b shadow bg-white">
			<div class="px-6 md:px-8 lg:px-12">
				<div class="flex items-center">
					<router-link to="/" class="nav-brand text-shadow-white group">
						<h6 class="transition-all ml-0 group-hover:ml-4">E-Market <span class="text-primary-600">Silajue</span></h6>
						<p class="transition-all ml-0 group-hover:ml-8">Pasar Bibit Ternak Daring</p>
					</router-link>
					<router-link to="/app" class="ml-auto btn btn-icon transition-colors text-gray-600 hover:text-gray-800">
						<span class="text-lg">
							<font-awesome-icon icon="fa-solid fa-arrow-left-long" />
						</span>
						<span class="text-sm font-semibold ml-2">Kembali</span>
					</router-link>
				</div>
			</div>
		</nav>
		<main class="grow">
			<div class="container">
				<div class="pt-8 pb-12 lg:px-8 my-12 rounded-xl bg-white shadow-lg">
					<p class="font-bold text-primary-600 mb-2 flex items-center justify-center">
						<span class="mr-2">
							<font-awesome-icon icon="fa-solid fa-qrcode" />
						</span>
						<span>Scan Tiket Disini</span>
					</p>
					<div v-show="showScanner" class="scanner">
						<Scanner @decode="onDecode" @loaded="showScanner = true" />
					</div>
					<Loader v-if="!showScanner" />
				</div>
			</div>
		</main>
		<Footer />
	</div>
</template>
<style scoped>

.nav-brand {
	@apply text-gray-900 flex flex-col mr-auto py-4 pr-4 md:pl-4
}

.nav-brand h6 {
	@apply text-xl lg:text-2xl font-bold;
}

.nav-brand p {
	@apply text-xs md:text-sm leading-none;
}

</style>