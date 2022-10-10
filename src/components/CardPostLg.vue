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

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);

const routeDetail = computed(() => "/blog/detail/" + props.id);
const routeEdit = computed(() => "/blog/form/" + props.id);
const isImgLoaded = ref(false);
</script>
<template>
	<router-link :to="routeDetail" class="block rounded-t-2xl relative overflow-hidden transition-opacity opacity-100 hover:opacity-80">
		<div class="aspect-[2.4/1]">&nbsp;</div>
		<ImgAsync class="absolute top-0 left-0 w-full h-full" :size="15" :src="img" @loaded="isImgLoaded = true" />
		<div class="absolute left-0 w-full rounded-tl-[50px] bg-primary-500 px-8 md:px-8 py-3 md:py-6 transition-all duration-300 ease-in-out" :class="{ 'bottom-0': isImgLoaded, '-bottom-full': !isImgLoaded }">
			<p class="text-4xl font-bold mb-4">{{ title }}</p>
			<p>{{ description }}</p>
		</div>
		<div v-if="isAdmin" class="absolute top-0 right-0">
			<div class="p-2 flex items-center">
				<router-link :to="routeEdit" class="text-base border border-white/10 rounded-md p-2 text-black/60 bg-primary-500 hover:bg-primary-600 focus-solid">
					<font-awesome-icon icon="fa-solid fa-pen" fixed-width />
				</router-link>
				<button class="text-base border border-white/10 rounded-md p-2 ml-2 text-black/60 bg-danger-500 hover:bg-danger-600 focus-solid-danger">
					<font-awesome-icon icon="fa-solid fa-trash-can" fixed-width />
				</button>
			</div>
		</div>
	</router-link>
</template>