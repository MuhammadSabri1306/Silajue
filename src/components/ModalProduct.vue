<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { required, minLength } from "@vuelidate/validators";
import { useProductStore } from "@/stores/product";
import { formatIdr } from "@/modules/currency-format";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";

const emit = defineEmits(["cancel"]);
const props = defineProps({
	id: Number,
	name: String,
	price: Number,
	type: String,
	category: String
});

const { data, v$ } = useDataForm({
	itemCount: { required, minLength: minLength(1) }
});
data.itemCount = 1;

const textPrice = computed(() => formatIdr(props.price));
const textTotal = computed(() => formatIdr(props.price * data.itemCount));

const productStore = useProductStore();
const toast = useToast();

const addToCart = () => {
	const isSuccess = productStore.addToCart(props.id, props.title, props.price, data.itemCount);
	if(isSuccess) {
		toast.add({
			severity:"success",
			summary: "Keranjang",
			detail:"Berhasil menambahkan item."
		});
	} else {
		toast.add({
			severity:"error",
			summary: "Keranjang",
			detail:"Terjadi masalah saat menghubungi server."
		});
	}
};
</script>
<template>
	<Modal @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-600">Tambahkan ke keranjang</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div class="px-8 py-4">
					<div class="grid grid-cols-[auto_1fr] text-gray-700 text-sm font-medium mb-4 gap-2">
						<span>Nama</span>
						<span class="font-bold">: {{ name }}</span>
						<span>Kategori</span>
						<span class="font-bold">: {{ category }}</span>
						<span>Tipe</span>
						<span class="font-bold">: {{ type }}</span>
					</div>
					<div class="flex items-center gap-x-4 gap-y-2 my-8">
						<label for="inputCount" class="text-sm font-medium text-gray-700 whitespace-nowrap">Jumlah item</label>
						<div class="grow grid grid-cols-1">
							<input type="number" v-model="data.itemCount" class="px-4 py-2 border border-gray-200 hover:border-gray-400 focus:border-gray-400 text-center text-2xl font-black w-full rounded" id="inputCount" required min="1">
						</div>
					</div>
					<div class="grid grid-cols-[auto_1fr] text-gray-700 text-sm font-medium mb-4 gap-2">
						<div class="flex items-center">
							<span>Harga</span>
						</div>
						<div class="flex justify-end items-center">
							<span class="font-bold text-right">{{ textPrice }}</span>
						</div>
						<div class="flex items-center">
							<span>Total</span>
						</div>
						<div class="flex justify-end items-center">
							<span class="font-bold text-2xl whitespace-nowrap text-green-600 text-right">{{ textTotal }}</span>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-1 p-4">
					<button type="button" class="flex justify-center items-center text-white rounded px-3 py-2 hover-margin bg-green-600 hover:bg-green-500">
						<span class="text-2xl mr-2"><font-awesome-icon icon="fa-solid fa-cart-plus" /></span>
						<span class="text-base">Masukkan ke Keranjang</span>
					</button>
				</div>
			</div>
		</template>
	</Modal>
</template>