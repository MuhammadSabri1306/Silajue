<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { getFeedbackOnProduct } from "@/modules/sample-products";
import BgImageAsync from "@/components/BgImageAsync.vue";

const props = defineProps({
	productId: { required: true }
});

const feedback = ref([]);
getFeedbackOnProduct(props.productId)
	.then(response => {
		if(!response.feedback)
			return;
		response.feedback.forEach(item => feedback.value.push(item));
	})
	.catch(err => console.error(err));

const userStore = useUserStore();
const showCommentForm = computed(() => !userStore.isRolePublic);
</script>
<template>
	<div class="feedback">
		<p v-if="feedback.length < 1" class="text-gray-400 mb-8">Belum ada review pada produk ini. Jadi yang pertama berkomentar.</p>
		<div v-else class="grid grid-cols-1 gap-8 mb-16">
			<div v-for="item in feedback" class="feedback-card">
				<div class="flex justify-center items-center">
					<BgImageAsync :src="item.avatar" class="feedback-avatar" />
				</div>
				<div class="feedback-text">
					<p class="feedback-name">{{ item.name }}</p>
					<p class="feedback-message">{{ item.comment }}</p>
				</div>
			</div>
		</div>
		<form v-if="showCommentForm">
			<div class="input-group mb-8">
				<label for="comment">Bagaimana pendapat anda terkait produk ini?</label>
				<textarea id="comment" placeholder="Masukkan review anda..." rows="6"></textarea>
			</div>
			<div class="flex justify-end">
				<button type="button" class="px-4 py-2 inline-flex items-center rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">
					<span><font-awesome-icon icon="fa-regular fa-paper-plane" fixed-width /></span>
					<span class="ml-1">Kirim</span>
				</button>
			</div>
		</form>
		<div v-else class="flex">
			<div class="p-4">
				<p class="text-gray-500 mb-4">Login untuk memberikan komentar.</p>
				<router-link to="/login" class="block text-center px-4 py-2 rounded text-white hover-margin bg-primary-600 hover:bg-primary-500">Login</router-link>
			</div>
		</div>
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
	@apply grid grid-cols-[auto_1fr] gap-4;
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

</style>