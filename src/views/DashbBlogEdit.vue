<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import http from "@/modules/http-common";
import { useUserStore } from "@/stores/user";
import { useBlogStore } from "@/stores/blog";
import { useViewStore } from "@/stores/view";
import DashbLayout from "@/components/dashboard-layout/Layout.vue";
import ModalUploadBlogImg from "@/components/ModalUploadBlogImg.vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const userStore = useUserStore();
const blogStore = useBlogStore();
const viewStore = useViewStore();

const route = useRoute();
const blogId = computed(() => route.params.id);

const isLoaded = ref(false);
const showLoadingIcon = ref(false);
const showImgModal = ref(false);
const thumbImg = ref(null);

const { data, v$ } = useDataForm({
	img: { value: null },
	title: { value: null, required },
	description: { value: null, required }
});

const changeImg = file => {
	data.img = file;
	showImgModal.value = false;

	const reader = new FileReader();
	reader.onload = event => thumbImg.value = event.target.result;
	reader.readAsDataURL(data.img);
};

blogStore.fetchBlog(false, () => {
	const index = blogStore.blogs.findIndex(item => item.id == blogId.value);
	if(index < 0)
		return;

	const currBlog = blogStore.blogs[index];
	thumbImg.value = currBlog.image;
	data.title = currBlog.title;
	data.description = currBlog.description;
	isLoaded.value = true;
});

const quillEditor = ref(null);
const router = useRouter();

const saveBlog = formData => {
	const headers = { "Authorization": "Bearer " + userStore.token };

	showLoadingIcon.value = true;
	http.post("/blog/" + blogId.value, formData, { headers })
		.then(response => {
			viewStore.showToast("saveBlog", true);
			blogStore.fetchBlog(true);
			showLoadingIcon.value = false;
			router.push("/app/blog");
		})
		.catch(err => {
			viewStore.showToast("saveBlog", false);
		})
};

const onSubmit = async () => {
	data.description = quillEditor.value.getHTML();
	const isValid = await v$.value.$validate();
	
	if(!isValid) {
		return;
	}

	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	if(data.img)
		formData.append("image", data.img);
	saveBlog(formData);
};
</script>
<template>
	<DashbLayout :activeNav="4">
		<template #main>
			<div>
				<h3 class="page-title">Halaman Blog</h3>
				<form v-if="isLoaded" @submit.prevent="onSubmit">
					<div class="grid grid-cols-2 mb-8">
						<div class="flex justify-center items-start">
							<a role="button" v-if="thumbImg" @click="showImgModal = true" class="border bg-gray-100 block w-full relative group">
								<img :src="thumbImg" class="max-w-full h-auto" />
								<div class="absolute w-full h-full top-0 left-0 bg-gray-300/90 flex transition-opacity opacity-0 group-hover:opacity-100">
									<span class="font-semibold text-gray-700 m-auto">Ganti</span>
								</div>
							</a>
							<a role="button" v-else @click="showImgModal = true" class="border bg-gray-100 flex justify-center items-center aspect-video w-full font-semibold text-gray-700 p-4 transition-colors bg-gray-100 hover:bg-gray-300">
								<span class=" m-auto">Upload Gambar Blog</span>
							</a>
						</div>
						<span></span>
					</div>
					<div class="grid grid-cols-2 mb-8">
						<div class="input-group">
							<label for="inputTitle">Judul</label>
							<input type="text" v-model="v$.title.$model" id="inputTitle">
						</div>
					</div>
					<div class="input-group mb-8">
						<label>Konten</label>
						<QuillEditor ref="quillEditor" :content="data.description" theme="snow" toolbar="essential" contentType="html" />
					</div>
					<div class="flex justify-end">
						<button type="submit" :class="{ 'py-2': !showLoadingIcon, 'py-3': showLoadingIcon }" class="btn-icon px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
							<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
							<span>Simpan</span>
						</button>
					</div>
				</form>
				<ModalUploadBlogImg v-if="showImgModal" @close="showImgModal = false" @change="changeImg" />
			</div>
		</template>
	</DashbLayout>
</template>