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
import BgImageAsync from "@/components/BgImageAsync.vue";
import ModalUploadBlogImg from "@/components/ModalUploadBlogImg.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

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

const setupData = () => {};

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
		});
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

const back = () => router.back();

const deleteBlog = () => {
	const url = "/blog/" + blogId.value;
	const headers = { "Authorization": "Bearer " + userStore.token };

	http.delete(url, { headers })
		.then(() => {
			blogStore.fetchBlog(true);
			viewStore.showToast("deleteBlog", true);
			router.push("/app/blog");
		})
		.catch(err => {
			console.error(err);
			viewStore.showToast("deleteBlog", false);
		});
};

const confirmDialog = ref(null);
const deleteConfirm = async () => {
	try {
		const confirm = await confirmDialog.value.confirm();
		confirm && deleteBlog();
	} catch(err) {
		// console.log(err);
	}
};
</script>
<template>
	<DashbLayout :activeNav="4">
		<template #main>
			<div>
				<h3 class="page-title">Halaman Blog</h3>
				<div class="flex items-end mb-8">
					<button type="button" @click="back" class="btn-icon text-gray-600 rounded px-3 py-2 mr-auto transition-colors bg-white hover:bg-gray-100">
						<font-awesome-icon icon="fa-solid fa-arrow-left-long" fixed-width />
						<span class="text-sm ml-2">Kembali</span>
					</button>
					<button type="button" @click="deleteConfirm" class="pl-2 pr-3 py-1 rounded text-red-100 border flex items-center justify-center transition-colors bg-red-500 hover:bg-red-600">
						<span class="text-lg"><font-awesome-icon icon="fa-solid fa-xmark" fixed-width /></span>
						<span class="text-xs font-semibold">Hapus</span>
					</button>
				</div>
				<form v-if="isLoaded" @submit.prevent="onSubmit">
					<div class="lg:grid grid-cols-2 mb-8">
						<div class="flex justify-center items-start">
							<a role="button" v-if="thumbImg" @click="showImgModal = true" class="border bg-gray-100 block w-full relative group">
								<BgImageAsync :src="thumbImg" class="aspect-video w-full" />
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
					<div class="lg:grid grid-cols-2 mb-8">
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
						<button type="submit" :class="{ 'py-2': !showLoadingIcon, 'py-3': showLoadingIcon }" class="btn-icon rounded px-4 text-white gap-1 hover-margin bg-primary-600 hover:bg-primary-500">
							<span v-show="showLoadingIcon"><font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width /></span>
							<span>Simpan</span>
						</button>
					</div>
				</form>
				<ModalUploadBlogImg v-if="showImgModal" @close="showImgModal = false" @change="changeImg" />
				<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
					<template #text>
						<p class="text-sm font-medium text-gray-700">Anda akan menghapus Artikel. Lanjutkan?</p>
					</template>
					<template #btnConfirm="{ clicked }">
						<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Artikel</button>
					</template>
				</ConfirmDialog>
			</div>
		</template>
	</DashbLayout>
</template>