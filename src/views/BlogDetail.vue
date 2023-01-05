<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useBlogStore } from "@/stores/blog";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import { useDateId } from "@/modules/date-id";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import BgImageAsync from "@/components/BgImageAsync.vue";
import SectionBlogShare from "@/components/SectionBlogShare.vue";
import SectionBlogSuggest from "@/components/SectionBlogSuggest.vue";

const showErrMessage = ref(false);
const isBlogLoaded = ref(false);
const isSuggestLoaded = ref(false);

const route = useRoute();
const blogSlug = computed(() => route.params.slug);

const blog = ref(null);
const blogDate = computed(() => {
	if(!blog.value)
		return null;

	const dateId = useDateId(new Date(blog.value.created_at));
	return dateId.toDateStr();
});

const viewStore = useViewStore();
const fetchCurrBlog = slug => {
	http.get("/blog/" + slug)
		.then(response => {
			const currBlog = response.data.data;
			if(!currBlog)
				return console.log(response.data);

			blog.value = currBlog;
			isBlogLoaded.value = true;
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("fetchData", false);
		});
};

fetchCurrBlog(route.params.slug);
watch(() => route.params.slug, fetchCurrBlog);

const blogStore = useBlogStore();

const blogList = computed(() => blogStore.blogs);
const mostRead = computed(() => blogStore.mostRead);
const editorPick = computed(() => blogStore.editorPick);

if(blogList.value.length < 1)
	blogStore.fetchBlog();
</script>
<template>
	<BasicLayout>
		<template #main>
			<main class="bg-white md:bg-gray-100">
				<header class="py-16 bg-yellow-300 flex flex-col">
					<h3 class="text-black text-4xl font-bold text-shadow-white text-center">Silajue Blog</h3>
					<h6 class="font-medium text-lg text-center text-gray-100 mb-8 text-shadow-black">Artikel dan Informasi dari kami.</h6>
					<div class="mx-auto">
						<form>
							<div class="flex">
								<div class="grid grow md:w-[30rem] mr-2">
									<input type="search" class="block w-full h-full px-6 text-sm font-semibold rounded transition-color bg-gray-200 hover:bg-white focus:bg-white" placeholder="Cari artikel...">
								</div>
								<button class="px-3 py-2 rounded text-xl transition-color text-white hover:text-black bg-black hover:text-yellow-300">
									<font-awesome-icon icon="fa-solid fa-search" />
								</button>
							</div>
						</form>
					</div>
				</header>
				<div v-if="showErrMessage" class="py-16 bg-white">
					<div class="container">
						<h3 class="text-4xl font-semibold text-gray-700">Terdapat kesalahan saat menghubungi server.</h3>
					</div>
				</div>
				<div v-if="isBlogLoaded" class="md:container py-16">
					<div class="bg-white grid grid-cols-1 md:grid-cols-[2fr_1fr]">
						<div class="grid-cols-1 py-4">
							<article class="bg-white py-16 px-4 md:px-8">
								<h1 class="text-4xl font-semibold text-gray-900 mb-8">{{ blog.title }}</h1>
								<div class="mb-8 -ml-4 md:-ml-8 -mr-4 md:mr-0">
									<BgImageAsync class="aspect-video" :src="blog.image" />
								</div>
								<p class="font-medium text-gray-700 mb-8">
									<font-awesome-icon icon="fa-regular fa-clock" />
									<span class="ml-2">{{ blogDate }}</span>
								</p>
								<div v-html="blog.description" class="blog-content"></div>
							</article>
						</div>
						<div class="pb-8 md:pt-8">
							<div class="mb-16">
								<p class="hidden md:block text-xl font-semibold text-gray-900 mb-4">Share</p>
								<SectionBlogShare class="fixed right-0 bottom-0 w-full md:static" />
							</div>
							<div class="pr-4 md:pr-8 pl-4 md:pl-0 mb-16">
								<p class="text-lg font-semibold text-gray-900 mb-4 bg-yellow-400/50 p-4">Paling banyak dibaca</p>
								<SectionBlogSuggest :suggests="mostRead" />
							</div>
							<div class="pr-4 md:pr-8 pl-4 md:pl-0">
								<p class="text-lg font-semibold text-gray-900 mb-4 bg-yellow-400/50 p-4">Pilihan editor</p>
								<SectionBlogSuggest :suggests="editorPick" />
							</div>
						</div>
					</div>
				</div>
			</main>
		</template>
	</BasicLayout>
</template>
<style scoped>

.blog-content {
	@apply text-gray-700;
}

.blog-content :deep(strong) {
	@apply font-bold;
}

</style>