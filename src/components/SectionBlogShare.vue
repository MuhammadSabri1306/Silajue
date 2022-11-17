<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useBlogShare } from "@/modules/blog-share";

const route = useRoute();
const { shareBlogTo, setupUrl } = useBlogShare();

setupUrl(document.location.href);
watch(
	() => route.params,
	() => setupUrl(document.location.href)
);
</script>
<template>
	<div class="grid grid-cols-3">
		<button type="button" class="bg-blue-600 text-white" @click="shareBlogTo('fb')">
			<font-awesome-icon icon="fa-brands fa-facebook-f" fixed-width />
		</button>
		<button type="button" class="bg-green-500 text-white" @click="shareBlogTo('wa')">
			<font-awesome-icon icon="fa-brands fa-whatsapp" fixed-width />
		</button>
		<button type="button" class="bg-blue-400 text-white" @click="shareBlogTo('twitter')">
			<font-awesome-icon icon="fa-brands fa-twitter" fixed-width />
		</button>
	</div>
</template>
<style scoped>

button {
	@apply p-4 text-2xl;
}

</style>