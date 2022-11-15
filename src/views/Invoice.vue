<script setup>
import { ref } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TopbarProduct from "@/components/TopbarProduct.vue";
import SectionInvoiceLg from "@/components/SectionInvoiceLg.vue";
import SectionInvoiceSm from "@/components/SectionInvoiceSm.vue";

const errMessage = ref(null);
const isProductLoaded = ref(true);
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="bg-gray-100 lg:bg-white py-16">
				<div v-if="errMessage" class="container">
					<h6 class="text-2xl font-semibold text-center text-gray-800">{{ errMessage }}</h6>
				</div>
				<div v-if="isProductLoaded">
					<SectionInvoiceLg class="hidden lg:block" />
					<SectionInvoiceSm class="lg:hidden" />
				</div>
			</div>
		</template>
	</BasicLayout>
</template>