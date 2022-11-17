<script setup>
import { ref, reactive } from "vue";
import { getPostSuggestions } from "@/modules/sample-products";
import BgImageAsync from "@/components/BgImageAsync.vue";

const props = defineProps(["id"]);

const suggests = reactive([]);
const isSuggestLoaded = ref(false);

const onFetchSuccess = response => {
	if(!response.blog)
		return;
	
	response.blog.forEach(item => suggests.push(item));
	isSuggestLoaded.value = true;
};

const onFetchError = err => console.error(err);

if(!props.id)
	getPostSuggestions(props.id).then(onFetchSuccess).catch(onFetchError);
else
	getPostSuggestions().then(onFetchSuccess).catch(onFetchError);
</script>
<template>
	<div v-if="isSuggestLoaded" class="grid grid-cols-1 gap-8">
		<div v-for="item in suggests" class="grid grid-cols-[1fr_2fr] gap-2">
			<div class="flex items-center">
				<BgImageAsync class="aspect-[1.2/1] w-full" :src="item.img" />
			</div>
			<div class="flex items-center">
				<h6 class="font-semibold text-gray-800">{{ item.title }}</h6>
			</div>
		</div>
	</div>
</template>