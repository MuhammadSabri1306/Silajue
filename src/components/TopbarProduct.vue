<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { getSampleCategories } from "@/modules/sample-products";
import Dropdown from "@/components/ui/Dropdown.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";

const productStore = useProductStore();
productStore.fetchCategories();

const isSexing = ref(productStore.isSexing);
const showTopbar = computed(() => productStore.categories && productStore.categories.length > 0);
const sexingCategories = computed(() => productStore.sexingCategories);
const unsexingCategories = computed(() => productStore.unsexingCategories);

const categories = computed(() => {
	const temp = isSexing.value ? sexingCategories.value : unsexingCategories.value;
	const all = { id: -1, name: "Semua" };

	return [ all, ...temp ];
});

const router = useRouter();
const onDropdownChange = categoryId => {
	if(categoryId < 0)
		router.push("/product");
	else
		router.push("/product/category/" + categoryId);
};

const onSexingToggle = value => {
	isSexing.value = value;
	productStore.setSexing(value);
};

watch(() => productStore.isSexing, isProductSexing => isSexing.value = isProductSexing);
</script>
<template>
	<div v-if="showTopbar" class="topbar">
		<div class="container flex gap-4 py-4">
			<div class="input-group flex items-center">
				<label class="mr-2 hidden md:block">Kategori</label>
				<Dropdown v-if="showTopbar" :options="categories" :value="-1" labelKey="name" valueKey="id" @change="onDropdownChange" />
			</div>
			<div class="input-group flex items-center ml-auto">
				<label class="hidden-md mr-2">Sexing</label>
				<label class="hidden-sm mr-2">Unsexing</label>
				<SwitchToggle :value="isSexing" @toggle="onSexingToggle" />
				<label class="hidden-sm ml-2">Sexing</label>
			</div>
		</div>
	</div>
</template>
<style scoped>
	
.topbar {
	@apply bg-white border-t;
}

.topbar label {
	@apply mb-0;
}

.hidden-sm {
	@apply hidden md:block;
}

.hidden-md {
	@apply md:hidden;
}

</style>