<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import CardPostLg from "@/components/CardPostLg.vue";
import CardPost from "@/components/CardPost.vue";
import { getSamplePost, getPostSuggestions } from "@/modules/sample-products";

const route = useRoute();

const posts = reactive([]);
getSamplePost().then(dataPosts => {
	dataPosts.forEach(pItem => posts.push(pItem));
});

const suggestions = reactive([]);
getPostSuggestions(1).then(dataPosts => {
	dataPosts.forEach(pItem => suggestions.push(pItem));
});

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isRoleAdmin);
window.userStore = () => userStore;
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<div class="flex justify-between items-end">
				<h6 class="text-4xl font-bold">Blog</h6>
				<form class="block relative">
					<input type="search" name="keyword" class="w-full bg-white pl-4 pr-14 py-2 rounded-[50rem] bg-gray-200" placeholder="Cari...">
					<button type="submit" class="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-full text-lg">
						<font-awesome-icon icon="fa-solid fa-magnifying-glass" fixed-width />
					</button>
				</form>
			</div>
			<div class="border-t pt-4 mt-4 pb-32">
				<div v-if="isAdmin" class="flex justify-end mb-8">
					<router-link to="/produk/form" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 focus-solid"><font-awesome-icon icon="fa-solid fa-plus" fixed-width /> Tambah Post</router-link>
				</div>
				<CardPostLg v-if="posts.length > 0" :id="posts[0].id" :title="posts[0].title" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque urna turpis donec nunc ultrices aenean enim purus magna. Eget convallis ultricies arcu adipiscing vulputate nunc. Leo quis ac sed leo euismod." :img="posts[0].img" />
				<div class=" grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
					<CardPost v-for="item in suggestions" :id="item.id" :title="item.title" :description="item.description" :img="item.img" />
				</div>
			</div>
		</div>
	</div>
</template>