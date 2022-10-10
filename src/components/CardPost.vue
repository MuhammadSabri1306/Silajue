<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import ImgAsync from "./ImgAsync.vue";

const props = defineProps({
	id: Number,
	title: String,
	description: String,
	img: String
});

const routeDetail = computed(() => "/blog/detail/" + props.id);
const routeEdit = computed(() => "/blog/form/" + props.id);

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);
const isImgLoaded = ref(false);
</script>
<template>
	<router-link :to="routeDetail" class="rounded-t-2xl relative overflow-hidden transition-all scale-100 hover:scale-95">
		<div class="aspect-square">&nbsp;</div>
		<ImgAsync class="absolute top-0 left-0 w-full h-full" :size="15" :src="img" @loaded="isImgLoaded = true" />
		<div class="absolute bottom-0 left-0 w-full rounded-tl-[50px] px-8 py-3 bg-primary-500">
			<p class="text-2xl font-bold mb-2">{{ title }}</p>
			<p class="text-sm">{{ description }}</p>
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