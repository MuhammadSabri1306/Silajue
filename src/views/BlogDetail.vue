<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import CardPostLg from "@/components/CardPostLg.vue";
import CardPost from "@/components/CardPost.vue";
import { getSamplePost, getPostSuggestions } from "@/modules/sample-products";

const route = useRoute();

const post = reactive({
	title: "",
	content: "",
	img: ""
});

const styleImg = computed(() => ({ backgroundImage: `url('${ post.img }')` }));

route.params.id && getSamplePost(route.params.id).then(dataPost => {
	post.title = dataPost.title;
	post.content = dataPost.content;
	post.img = dataPost.img;
});

console.log("test");
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-4xl font-bold">Blog</h6>
			<div class="border-t pt-4 mt-4 pb-32">
				<div class="mb-12">
					<div class="bg-cover bg-center bg-no-repeat aspect-[2.4/1]" :style="styleImg"></div>
				</div>
				<p class="text-4xl font-bold mb-4">{{ post.title }}</p>
				<div class="post-content">
					<div v-html="post.content"></div>
				</div>
			</div>
		</div>
	</div>
</template>