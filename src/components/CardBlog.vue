<script setup>
import { computed } from "vue";
import { useDateId } from "@/modules/date-id";
import BgImageAsync from "@/components/BgImageAsync.vue";

const props = defineProps({
	id: { required: true },
	date: { type: String },
	title: { type: String },
	img: { type: String },
	desc: { type: String },
	slug: { type: String }
});

const url = computed(() => "/blog/detail/" + props.slug);
const formatDate = computed(() => {
	const dateId = useDateId(new Date(props.date));
	return dateId.toDateStr();
});

const shortDesc = computed(() => {
	return props.desc.replace(/(<([^>]+)>)/gi, "").slice(0, 200) + "...";
});

</script>
<template>
	<article class="card-blog">
		<div class="h-padding">
			<h1 class="text-3xl font-semibold text-gray-900">{{ title }}</h1>
		</div>
		<div class="my-8">
			<BgImageAsync class="aspect-video" :src="img" />
		</div>
		<div class="h-padding">
			<p class="text-sm font-medium text-gray-700 mb-2">
				<font-awesome-icon icon="fa-regular fa-clock" />
				<span class="ml-2">{{ formatDate }}</span>
			</p>
			<div class="mb-4 text-gray-700" v-html="shortDesc"></div>
			<div class="flex">
				<router-link :to="url" class="card-link">
					<span>Selengkapnya</span>
				</router-link>
			</div>
		</div>
	</article>
</template>
<style scoped>
	
.card-blog {
	@apply py-4;
}

.card-blog .h-padding {
	@apply px-8 md:px-12;
}

.card-link {
	@apply block text-lg font-semibold text-primary-700 py-1 relative before:absolute before:h-0.5 before:top-full before:left-0 before:bg-primary-700 before:transition-all before:w-0 hover:before:w-full;
}

</style>