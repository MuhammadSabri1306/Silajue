<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "@/components/basic-layout/Layout.vue";
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
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="bg-white py-16">
				<div class="container pt-8">
					<h6 class="text-4xl font-bold">Blog</h6>
				</div>
				<div class="md:container">
					<div class="border-t pt-4 mt-4">
						<div class="mb-12">
							<div class="bg-cover bg-center bg-no-repeat aspect-[1/1] md:aspect-[2.4/1]" :style="styleImg"></div>
						</div>
					</div>
				</div>
				<div class="container">
					<p class="text-4xl font-bold mb-4 text-gray-900">{{ post.title }}</p>
					<div class="post-content pb-32">
						<div v-html="post.content"></div>
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>
<style>
	
.post-content p,
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
	@apply mb-8 text-gray-800;
}

.post-content {
	@apply text-gray-800;
}

</style>