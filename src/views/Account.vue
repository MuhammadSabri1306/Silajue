<script setup>
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";

const route = useRoute();
const router = useRouter();

const isRegisterPage = computed(() => route.name === "register");
const btnSubmitText = computed(() => isRegisterPage.value ? "Sign Up" : "Log In");

const data = reactive({
	name: "",
	email: "",
	password: "",
	address: ""
});

const userStore = useUserStore();

const formElm = ref(null);
const showLoader = ref(false);
const message = ref("");

const onLogin = () => {
	showLoader.value = true;
	userStore.login(data.email, data.password, status => {
		if(!status.success) {
			showLoader.value = false;
			message.value = "Failed to log in!";
			return;
		}
		router.push("/");
	});
};

const onRegister = () => {
	showLoader.value = true;
	userStore.register(data.name, data.email, data.password, data.address, status => {
		if(!status.success) {
			showLoader.value = false;
			message.value = "Failed to sign up!";
			return;
		}
		router.push("/");
	});
};

const onFormSubmit = () => {
	message.value = "";

	if(isRegisterPage.value)
		return onRegister();

	return onLogin();
};
</script>
<template>
	<div class="flex flex-col lg:flex-row justify-center lg:justify-around items-center flex-wrap gap-8 p-8 min-h-[100vh] bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/img/bg-market.webp');">
		<div class="w-full md:w-[80%] lg:w-[50vw]">
			<img src="/assets/img/silajue-text-left.webp" class="w-full">
		</div>
		<div class="lg:pr-20">
			<div class="rounded-2xl bg-white/50 py-8 px-6">
				<h3 class="text-4xl font-bold mb-6 mt-4">{{ isRegisterPage ? 'Sign Up' : 'Log In' }}</h3>
				<form ref="formElm" @submit.prevent="onFormSubmit">
					<div class="grid grid-cols-1 gap-4">
						<div v-if="isRegisterPage" class="login-input-group mb-2">
							<label for="inputName" class="text-shadow-white">Name</label>
							<div><input v-model="data.name" type="text" name="name" id="inputName" class="pl-[10rem] focus-shadow" required></div>
						</div>
						<div class="login-input-group">
							<label for="inputEmail" class="text-shadow-white">Email</label>
							<div><input v-model="data.email" type="email" name="email" id="inputEmail" class="pl-[10rem] focus-shadow" required></div>
						</div>
						<div class="login-input-group">
							<label for="inputPass" class="text-shadow-white">Password</label>
							<div><input v-model="data.password" type="password" name="password" id="inputPass" class="pl-[10rem] focus-shadow" required></div>
						</div>
						<div v-if="isRegisterPage" class="login-input-group">
							<label for="inputAddress" class="text-shadow-white">Address</label>
							<div><input v-model="data.address" type="text" name="address" id="inputAddress" class="pl-[10rem] focus-shadow" required></div>
						</div>
					</div>
					<div class="h-3 my-4">
						<LoaderHorizontalLine v-if="showLoader" />
						<span v-else-if="message.length > 0" class="text-sm font-bold text-red-700 text-shadow-white">{{ message }}</span>
					</div>
					<div class="flex justify-end">
						<button type="submit" class="font-medium text-base xl:text-base px-6 rounded-[50rem] py-2 font-semibold bg-primary-500 hover:bg-primary-400">{{ isRegisterPage ? 'Sign Up' : 'Log In' }}</button>
					</div>
				</form>
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