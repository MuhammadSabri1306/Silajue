<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TopbarProduct from "@/components/TopbarProduct.vue";
import SectionInvoiceLg from "@/components/SectionInvoiceLg.vue";
import SectionInvoiceSm from "@/components/SectionInvoiceSm.vue";
import ModalInvoiceVerification from "@/components/ModalInvoiceVerification.vue";
import ModalInvoiceGuide from "@/components/ModalInvoiceGuide.vue";
import ModalBankList from "@/components/ModalBankList.vue";
import FabProduct from "@/components/FabProduct.vue";

const errMessage = ref(null);
const isInvoiceLoaded = ref(false);

const productStore = useProductStore();
productStore.fetchInvoiceUser(false, () => isInvoiceLoaded.value = true);

const verfProductId = ref(null);
const showVerfModal = ref(false);

const openVerfModal = invoiceId => {
	verfProductId.value = invoiceId;
	showVerfModal.value = true;
};

const onInvoiceVerified = () => {
	isInvoiceLoaded.value = false;
	productStore.fetchInvoice(true, () => isInvoiceLoaded.value = true);
	showVerfModal.value = false;
	verfProductId.value = null;
};

const showGuideModal = ref(false);
const showBankListModal = ref(false);
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="bg-gray-100 lg:bg-white py-16">
				<div class="container">
					<div class="flex flex-col md:flex-row items-start md:items-center justify-end gap-4">
						<button type="button" @click="showBankListModal = true" class="btn-help border hover-margin border-transparent border-bg-blue-600 bg-transparent hover:bg-blue-200">
							<span class="icon">
								<font-awesome-icon icon="fa-solid fa-building-columns" fixed-width />
							</span>
							<span>Daftar Bank</span>
						</button>
						<button type="button" @click="showGuideModal = true" class="btn-help border hover-margin border-transparent border-bg-green-600 bg-transparent hover:bg-green-200">
							<span class="icon">
								<font-awesome-icon icon="fa-regular fa-circle-question" fixed-width />
							</span>
							<span>Panduan</span>
						</button>
					</div>
				</div>
				<div v-if="errMessage" class="container">
					<h6 class="text-2xl font-semibold text-center text-gray-800">{{ errMessage }}</h6>
				</div>
				<div v-if="isInvoiceLoaded">
					<SectionInvoiceLg class="hidden lg:block" @verify="openVerfModal" />
					<SectionInvoiceSm class="lg:hidden" @verify="openVerfModal" />
				</div>
				<ModalInvoiceVerification v-if="showVerfModal" :invoiceId="verfProductId" @close="showVerfModal = false" @verified="onInvoiceVerified" />
				<ModalInvoiceGuide v-if="showGuideModal" @close="showGuideModal = false" />
				<ModalBankList v-if="showBankListModal" @close="showBankListModal = false" />
				<FabProduct />
			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
.btn-help {
	@apply inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium shadow-none hover:shadow-sm text-gray-600 hover:text-gray-800;
}

.btn-help .icon {
	@apply text-xl;
}

</style>