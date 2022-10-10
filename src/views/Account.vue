<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isRegisterPage = computed(() => route.name === "register");
const btnSubmitText = computed(() => isRegisterPage.value ? "Sign Up" : "Log In")
</script>
<template>
	<div class="flex flex-col lg:flex-row justify-center lg:justify-around items-center flex-wrap gap-8 p-8 min-h-[100vh] bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/img/bg-market.webp');">
		<div class="w-full md:w-[80%] lg:w-[50vw]">
			<img src="/assets/img/silajue-text-left.webp" class="w-full">
		</div>
		<div class="lg:pr-20">
			<div class="rounded-2xl bg-white/40 py-8 px-6">
				<h3 class="text-4xl font-bold mb-4">Sign Up</h3>
				<div class="grid grid-cols-1 gap-4">
					<div v-if="isRegisterPage" class="login-input-group mb-2">
						<label for="inputName" class="text-shadow-white">Name</label>
						<div><input type="text" id="inputName" class="pl-[10rem] focus-shadow"></div>
					</div>
					<div class="login-input-group">
						<label for="inputEmail" class="text-shadow-white">Email</label>
						<div><input type="email" id="inputEmail" class="pl-[10rem] focus-shadow"></div>
					</div>
					<div class="login-input-group">
						<label for="inputPass" class="text-shadow-white">Password</label>
						<div><input type="password" id="inputPass" class="pl-[10rem] focus-shadow"></div>
					</div>
					<div v-if="isRegisterPage" class="login-input-group">
						<label for="inputAddress" class="text-shadow-white">Address</label>
						<div><input type="text" id="inputAddress" class="pl-[10rem] focus-shadow"></div>
					</div>
				</div>
				<div class="flex justify-end mt-8">
					<button class="font-medium text-base xl:text-base px-6 rounded-[50rem] py-2 font-semibold bg-primary-500 hover:bg-primary-400">{{ btnSubmitText }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.login-input-group {
	@apply grid grid-cols-[auto_1fr] rounded-lg transition-colors bg-gray-100 border;
}

.login-input-group input {
	@apply block w-full h-full pr-4 pl-2 text-sm bg-transparent focus:shadow-none;
}

.login-input-group > label {
	@apply pl-4 pr-2 py-2 text-sm;
}
</style>