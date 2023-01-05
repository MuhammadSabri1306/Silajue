<script setup>
import { computed } from "vue";
import { getPostSuggestions } from "@/modules/sample-products";
import BgImageAsync from "@/components/BgImageAsync.vue";

const props = defineProps({
	suggests: { type: Array, default: [] }
});

const list = computed(() => props.suggests);
const getUrl = slug => "/blog/detail/" + slug;
</script>
<template>
	<div v-if="list.length > 0" class="grid grid-cols-1 gap-8">
		<router-link v-for="item in list" :to="getUrl(item.slug)" class="grid grid-cols-[1fr_2fr] gap-2">
			<div class="flex items-center">
				<BgImageAsync class="aspect-[1.2/1] w-full" :src="item.image" />
			</div>
			<div class="flex items-center">
				<h6 class="font-semibold text-gray-800">{{ item.title }}</h6>
			</div>
		</router-link>
	</div>
</template>