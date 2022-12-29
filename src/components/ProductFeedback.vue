<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFeedbackStore } from "@/stores/feedback";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import http from "@/modules/http-common";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import Avatar from "@/components/ui/Avatar.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const props = defineProps({
	productId: { required: true }
});

const { data, v$ } = useDataForm({
	comment: { value: null, required }
});

const route = useRoute();
const router = useRouter();
const toLoginPage = () => router.push({ path: "/login", query: { redirect: route.fullPath } });

const userStore = useUserStore();
const viewStore = useViewStore();

const feedback = ref([]);
const fetchFeedback = () => {
	http.get("/feedback/product/" + props.productId)
		.then(response => {
			const data = response.data.data;
			if(!data)
				return console.log(response.data);
			feedback.value = data;
		})
		.catch(err => {
			console.error(err);
		});
};
fetchFeedback();

const showCommentForm = computed(() => !userStore.isRolePublic);
const hasSubmitted = ref(false);
const submitComment = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	try {
		const headers = { "Authorization": "Bearer " + userStore.token };
		const body = {
			produk_id: props.productId,
			comment: data.comment
		};
		const response = await http.post("/feedback/product", { headers });

		if(!response.data.success) {
			viewStore.showToast("addProductFeedback", false);
			console.log(response.data);
			return;
		}

		fetchFeedback();
		viewStore.showToast("addProductFeedback", true);
	}
	catch(err) {
		console.error(err);
		viewStore.showToast("addProductFeedback", false);
	}
};

const showBtnDelete = computed(() => userStore.isRoleAdmin);
const deleteFeedback = async (feedbackId) => {
	try {
		const headers = { "Authorization": "Bearer " + userStore.token };
		const response = await http.delete("/feedback/product/" + feedbackId, { headers });

		if(!response.data.success) {
			viewStore.showToast("deleteProductFeedback", false);
			console.log(response.data);
			return;
		}

		const index = feedback.value.findIndex(item => item.id === feedbackId);
		if(index < 0)
			return;

		feedback.value.splice(index, 1);
		viewStore.showToast("deleteProductFeedback", true);
	}
	catch(err) {
		console.error(err);
		viewStore.showToast("deleteProductFeedback", false);
	}
};

const confirmDialog = ref(null);
const deleteConfirm = feedbackId => {
	confirmDialog.value.confirm()
		.then(isConfirm => isConfirm && deleteFeedback(feedbackId))
		.catch(err => null);
};
</script>
<template>
	<div class="feedback">
		<p v-if="feedback.length < 1" class="text-gray-400 mb-8">Belum ada review pada produk ini. Jadi yang pertama berkomentar.</p>
		<div v-else class="grid grid-cols-1 gap-8 mb-16">
			<div v-for="item in feedback" class="feedback-card">
				<div class="flex justify-center items-center">
					<Avatar :name="item.user.name" :img="item.user.avatar" />
				</div>
				<div class="feedback-text">
					<p class="feedback-name">{{ item.user.name }}</p>
					<p class="feedback-message">{{ item.comment }}</p>
				</div>
				<button type="button" v-if="showBtnDelete" @click="deleteConfirm(item.id)" class="absolute top-0 right-0 p-2 transition-colors text-gray-400 hover:text-gray-500">
					<font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
				</button>
			</div>
		</div>
		<form v-if="showCommentForm" @submit.prevent="submitComment">
			<div class="input-group mb-8">
				<label for="comment">Bagaimana pendapat anda terkait produk ini?</label>
				<textarea v-model="v$.comment.$model" :class="{ 'invalid': hasSubmitted && v$.comment.$invalid }" id="comment" placeholder="Masukkan review anda..." rows="6"></textarea>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="px-4 py-2 inline-flex items-center rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">
					<span><font-awesome-icon icon="fa-regular fa-paper-plane" fixed-width /></span>
					<span class="ml-1">Kirim</span>
				</button>
			</div>
		</form>
		<div v-else class="flex">
			<div class="p-4">
				<p class="text-gray-500 mb-4">Login untuk memberikan komentar.</p>
				<div class="grid grid-cols-1">
					<button type="button" @click="toLoginPage" class="block text-center px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">Login</button>
				</div>
			</div>
		</div>
		<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
			<template #text>
				<p class="text-sm font-medium text-gray-700">Anda akan menghapus Feedback Produk. Lanjutkan?</p>
			</template>
			<template #btnConfirm="{ clicked }">
				<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Feedback</button>
			</template>
		</ConfirmDialog>
	</div>
</template>
<style scoped>
	
.feedback label {
	@apply text-lg mb-4 font-medium;
}

.feedback textarea {
	@apply text-base;
}

.feedback-card {
	@apply grid grid-cols-[auto_1fr] gap-4 relative;
}

.feedback-avatar {
	@apply w-16 h-16 rounded-full overflow-hidden;
}

.feedback-text {
	@apply flex flex-col justify-center;
}

.feedback-name {
	@apply font-bold text-gray-800;
}

.feedback-message {
	@apply text-sm text-gray-600;
}

.invalid {
	@apply border-red-400;
}

</style>