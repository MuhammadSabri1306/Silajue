<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
	id: Number,
	title: String,
	price: String,
	img: String
});

const routeDetail = computed(() => "/produk/detail/" + props.id);
const routeEdit = computed(() => "/produk/form/" + props.id);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);

const styleImg = computed(() => ({ backgroundImage: `url('${ props.img }')` }));
</script>
<template>
	<router-link :to="routeDetail" class="aspect-square rounded-t-2xl relative overflow-hidden transition-all scale-100 hover:scale-95">
		<div class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat" :style="styleImg"></div>
		<div class="absolute bottom-0 left-0 w-full rounded-tl-[50px] px-8 py-3 bg-primary-500">
			<p>{{ title }}</p>
			<p class="font-semibold text-lg whitespace-nowrap">{{ price }}</p>
		</div>
		<div v-if="isAdmin" class="absolute top-0 right-0">
			<div class="p-2 flex items-center">
				<router-link :to="routeEdit" class="text-base rounded-md p-2 text-black/60 bg-primary-500 hover:bg-primary-600 focus-solid">
					<font-awesome-icon icon="fa-solid fa-pen" fixed-width />
				</router-link>
				<button class="text-base rounded-md p-2 ml-2 text-black/60 bg-danger-500 hover:bg-danger-600 focus-solid-danger">
					<font-awesome-icon icon="fa-solid fa-trash-can" fixed-width />
				</button>
			</div>
		</div>
	</router-link>
</template>