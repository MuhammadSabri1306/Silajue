<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import { formatIdr } from "@/modules/currency-format";
import http from "@/modules/http-common";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const productStore = useProductStore();
productStore.fetchInvoice();

const route = useRoute();
const invoiceId = computed(() => route.params.id);
const currInvoice = computed(() => productStore.invoiceById(invoiceId.value));

const userStore = useUserStore();
const viewStore = useViewStore();
const router = useRouter();
const deleteInvoice = () => {
	const url = "/invoice/" + invoiceId.value;
	const headers = { "Authorization": "Bearer " + userStore.token };
	http.delete(url, { headers })
		.then(() => {
			productStore.fetchInvoice(true);
			viewStore.showToast("deleteInvoice", true);
			router.push("/app/invoice");
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("deleteInvoice", false);
		});
};

const confirmDelete = ref(null);
const deleteConfirm = async () => {
	if(!invoiceId.value)
		return;

	try {
		const confirm = await confirmDelete.value.confirm();
		confirm && deleteInvoice();
	} catch(err) {
		return;
	}
};

const statusBgClass = {
	"selesai": "bg-gray-300",
	"aktif": "bg-green-300",
	"pengajuan verifikasi": "bg-yellow-200",
	"belum verifikasi": "bg-red-200"
};

const updateInvoiceStatus = status => {
	const headers = { "Authorization": "Bearer " + userStore.token };
	const body = { status };

	http.post("/invoice/status/" + invoiceId.value, body, { headers })
		.then(() => {
			productStore.fetchInvoice(true);
			console.log(productStore.invoiceById(invoiceId.value))
			viewStore.showToast("updateInvoiceStatus", true);
			// router.push("/app/invoice");
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("updateInvoiceStatus", false);
		});
};

const statusConfirm = ref(null);
const confirmMessage = ref(null);
const onConfirmInvoice = async (status) => {
	if(!invoiceId.value)
		return;

	try {
		confirmMessage.value = status;
		const confirm = await statusConfirm.value.confirm();
		confirm && updateInvoiceStatus(status);
	} catch(err) {
		confirmMessage.value = null;
	}
};
</script>
<template>
	<DashbLayout :activeNav="3">
		<template #main>
			<div>
				<h3 class="page-title">Invoice</h3>
				<div class="flex items-end mb-8">
					<button type="button" @click="$router.back()" class="btn-icon text-gray-600 rounded px-3 py-2 mr-auto transition-colors bg-white hover:bg-gray-100">
						<font-awesome-icon icon="fa-solid fa-arrow-left-long" fixed-width />
						<span class="text-sm ml-2">Kembali</span>
					</button>
					<button type="button" @click="deleteConfirm" class="pl-2 pr-3 py-1 rounded text-red-100 border flex items-center justify-center transition-colors bg-red-500 hover:bg-red-600">
						<span class="text-lg"><font-awesome-icon icon="fa-solid fa-xmark" fixed-width /></span>
						<span class="text-xs font-semibold">Hapus</span>
					</button>
				</div>
				<div v-if="currInvoice" class="relative">
					<div class="md:rounded-2xl md:bg-white md:shadow-lg border-t md:border overflow-hidden py-8 md:px-8 text-gray-700">
						<div class="flex items-start">
							<div>
								<h6 class="font-semibold text-lg text-gray-800 mb-2">{{ currInvoice.noInvoice }}</h6>
								<p class="font-bold mb-2">{{ currInvoice.dateTime }}</p>
								<p class="font-semibold">Status <span :class="statusBgClass[currInvoice.status]" class="cursor-default capitalize text-gray-900">{{ currInvoice.status }}</span></p>
							</div>
							<span class="text-6xl text-gray-300 ml-auto">
								<font-awesome-icon icon="fa-solid fa-bookmark" fixed-width />
							</span>
						</div>
						<div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p class="text-center font-semibold text-sm mb-2">Kartu Tanda Penduduk</p>
								<BgImageAsync :src="currInvoice.userIdCard" class="w-full aspect-video rounded-2xl" />
							</div>
							<div>
								<p class="text-center font-semibold text-sm mb-2">Bukti Transfer</p>
								<BgImageAsync :src="currInvoice.transferNote" class="w-full aspect-video rounded-2xl" />
							</div>
						</div>
						<div v-if="currInvoice.status == 'pengajuan verifikasi'" class="mb-16 flex flex-wrap justify-center items-center bg-gray-100 p-8">
							<button type="button" @click="onConfirmInvoice('aktif')" class="px-4 py-3 rounded btn-icon text-white hover-margin bg-green-600 hover:bg-green-500">
								<span class="text-2xl mr-2">
									<font-awesome-icon icon="fa-solid fa-check" />
								</span>
								<span>Aktifkan Invoice</span>
							</button>
						</div>
						<div v-if="currInvoice.status == 'aktif'" class="mb-16 flex flex-wrap justify-center items-center bg-gray-100 p-8 gap-8">
							<button type="button" @click="onConfirmInvoice('verifikasi')" class="px-4 py-3 rounded btn-icon text-white hover-margin bg-yellow-400 hover:bg-yellow-300">
								<span class="text-2xl mr-2">
									<font-awesome-icon icon="fa-solid fa-angle-left" />
								</span>
								<span>Kembali ke verifikasi</span>
							</button>
							<button type="button" @click="onConfirmInvoice('selesai')" class="px-4 py-3 rounded btn-icon text-white hover-margin bg-green-600 hover:bg-green-500">
								<span class="text-2xl mr-2">
									<font-awesome-icon icon="fa-solid fa-check" />
								</span>
								<span>Selesai</span>
							</button>
						</div>
						<h6 class="font-bold text-lg my-4"><span class="border-t-2 border-green-400/50 pr-8 py-2">Customer</span></h6>
						<div class="grid grid-cols-[auto_1fr] gap-2 mb-16">
							<p>Nama</p><p class="font-semibold">: {{ currInvoice.userName }}</p>
							<p>No. Telepon</p><p class="font-semibold">: {{ currInvoice.userPhoneNumber }}</p>
							<p>Email</p><p class="font-semibold">: {{ currInvoice.userEmail }}</p>
							<p>Alamat</p><p class="font-semibold">: {{ currInvoice.userAddress.full }}</p>
						</div>
						<h6 class="font-bold text-lg my-4"><span class="border-t-2 border-green-400/50 pr-8 py-2">Produk</span></h6>
						<div class="grid grid-cols-2 gap-8 mb-16">
							<div v-for="item in currInvoice.product">
								<div class="grid grid-cols-[auto_1fr] gap-2">
									<p>Nama Produk</p><p class="font-semibold">: {{ item.name }}</p>
									<p>Tipe Produk</p><p class="font-semibold capitalize">: {{ item.category.type }}</p>
									<p>Kategori</p><p class="font-semibold capitalize">: {{ item.category.name }}</p>
									<p>Jumlah Item</p><p class="font-semibold">: {{ item.itemCount }}</p>
									<p>Harga/Item</p><p class="font-semibold">: {{ formatIdr(item.category.price) }}</p>
								</div>
							</div>
						</div>
						<h6 class="font-bold text-lg my-4"><span class="border-t-2 border-green-400/50 pr-8 py-2">Total</span><span class="font-semibold"> : {{ formatIdr(currInvoice.totalPrice) }}</span></h6>
					</div>
				</div>
				<ConfirmDialog ref="confirmDelete" icon="fa-solid fa-circle-exclamation">
					<template #text>
						<p class="text-sm font-medium text-gray-700">Anda akan menghapus Invoice. Lanjutkan?</p>
					</template>
					<template #btnConfirm="{ clicked }">
						<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Invoice</button>
					</template>
				</ConfirmDialog>
				<ConfirmDialog ref="statusConfirm" icon="fa-solid fa-check">
					<template #text>
						<p class="text-sm font-medium text-gray-700">Anda akan mengupdate status ke {{ confirmMessage }}. Lanjutkan?</p>
					</template>
					<template #btnConfirm="{ clicked }">
						<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-green-600 hover:bg-green-500">Ya, lanjutkan</button>
					</template>
				</ConfirmDialog>
			</div>
		</template>
	</DashbLayout>
</template>
<style scoped>
	
p {
	@apply text-sm;
}

</style>