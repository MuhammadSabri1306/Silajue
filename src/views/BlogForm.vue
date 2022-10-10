<script setup>
import { reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getSamplePost } from "@/modules/sampleProducts";

const route = useRoute();

const pageContent = computed(() => {
	const title = route.params.id ? "Edit Content" : "Tambah Content";
	const btnSubmit = route.params.id ? "Update Content" : "Tambah Content";

	return { title, btnSubmit };
});

const data = reactive({
	title: "",
	content: ""
});

if(route.params.id) {
	getSamplePost(route.params.id).then(post => {
		data.title = post.title;
		data.content = post.content;
	});
}
</script>
<template>
	<div class="bg-white py-16">
		<div class="container pt-8">
			<h6 class="text-2xl font-bold">{{ pageContent.title }}</h6>
			<div class="border-t pt-12 mt-4 pb-32">
				<form @submit.prevent>
					<div class="grid grid-cols-[1fr_0.7fr] gap-4">
						<div class="form-input-group col-span-2">
							<label for="inputTitle" class="text-shadow-white">Judul Content</label>
							<input type="text" id="inputTitle" v-model="data.title" class="pl-[10rem] focus-shadow">
						</div>
						<div class="form-textarea-group col-span-2">
							<label for="textContent" class="text-shadow-white">Isi Content</label>
							<textarea id="textContent" v-model="data.content" rows="10" class="focus-shadow"></textarea>
						</div>
					</div>
					<div class="flex justify-end mt-8">
						<button type="submit" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 btn-focus-primary">{{ pageContent.btnSubmit }}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>