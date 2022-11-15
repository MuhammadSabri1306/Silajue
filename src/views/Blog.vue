<script setup>
import { computed } from "vue";
import { useBlogStore } from "@/stores/blog";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import CardBlog from "@/components/CardBlog.vue";

const blogStore = useBlogStore();

const blogList = computed(() => {
	if(!blogStore.blogs)
		return [];
	return blogStore.blogs;
});

if(blogList.value.length < 1)
	blogStore.fetchBlog();
</script>
<template>
	<BasicLayout>
		<template #main>
			<main>
				<header class="py-16 bg-primary-600 flex flex-col">
					<h3 class="text-black text-4xl font-bold text-shadow-white text-center">Silajue Blog</h3>
					<h6 class="font-medium text-lg text-center text-gray-100 mb-8">Artikel dan Informasi dari kami.</h6>
					<div class="mx-auto">
						<form>
							<div class="flex">
								<div class="grid grow md:w-[30rem] mr-2">
									<input type="search" class="block w-full h-full px-6 text-sm font-semibold rounded transition-color bg-gray-200 hover:bg-white focus:bg-white" placeholder="Cari artikel...">
								</div>
								<button class="px-3 py-2 rounded text-xl transition-color text-white hover:text-black bg-black hover:bg-secondary">
									<font-awesome-icon icon="fa-solid fa-search" />
								</button>
							</div>
						</form>
					</div>
				</header>
				<div class="bg-gray-100 py-16">
					<div class="container">
						<div class="bg-white grid grid-cols-[2fr_1fr]">
							<div class="grid-cols-1 py-8">
								<CardBlog v-for="item in blogList" :id="item.id" :date="item.date" :title="item.title" :img="item.img" :desc="item.description" class="mb-12" />
							</div>
						</div>
					</div>
				</div>
			</main>
		</template>
	</BasicLayout>
</template>