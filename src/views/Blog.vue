<script setup>
import { computed } from "vue";
import { useBlogStore } from "@/stores/blog";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import CardBlog from "@/components/CardBlog.vue";
import SectionBlogSuggest from "@/components/SectionBlogSuggest.vue";

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
			<main class="bg-white">
				<header class="py-16 bg-yellow-400/70 flex flex-col">
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
				<div class="bg-white md:bg-gray-100 py-16">
					<div class="md:container">
						<div class="bg-white grid grid-cols-1 md:grid-cols-[2fr_1fr]">
							<div class="pb-8 md:pr-8">
								<p class="text-2xl font-semibold text-gray-900 mb-4 md:bg-yellow-400/50 py-4 px-8 md:px-12 text-center">Artikel terbaru</p>
								<div class="grid grid-cols-1 gap-12">
									<CardBlog v-for="item in blogList" :id="item.id" :date="item.created_at" :title="item.title" :img="item.image" :desc="item.description" :slug="item.slug" />
								</div>
							</div>
							<div class="flex flex-col pb-8 md:pt-8">
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
				</div>
			</main>
		</template>
	</BasicLayout>
</template>