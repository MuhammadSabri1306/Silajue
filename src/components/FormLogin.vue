<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import http from "@/modules/http-common";
import { useDataForm } from "@/modules/data-form";

const { data, v$ } = useDataForm({
	email: { required, email },
	password: { required }
});

const userStore = useUserStore();
const viewStore = useViewStore();
const router = useRouter();
const route = useRoute();

const showLoader = ref(false);
const hasSubmitted = ref(false);

const getProfileAvatar = token => {

	const headers = { "Authorization": "Bearer " + token };
	http.get("/user", { headers })
		.then(response => {
			const detailUser = response.data.data;
			if(!detailUser)
				return console.warn(response.data);

			userStore.updateUser({ avatar: detailUser.avatar });
		})
		.catch(err => console.error(err));

};

const onLogin = async () => {

	hasSubmitted.value = true;
	const ready = await v$.value.$validate();

	if(!ready)
		return;

	showLoader.value = true;
	http.post("/login", { email: data.email, password: data.password, role: "user" })
		.then(response => {

			if(!response.data.success) {
				viewStore.showToast("login", false);
				console.warn(response);
				return;
			}

			let { id, name, token, role } = response.data.success;
			userStore.updateUser({ id, name, token, role });
			getProfileAvatar(token);
			viewStore.showToast("login", true);

			const baseRedirect = (role === "admin" || role === "operator") ? "/app" : "/";
			setTimeout(() => router.push(route.query.redirect || baseRedirect), 500);

		})
		.catch(err => {
			console.error(err);
			showLoader.value = false;
			viewStore.showToast("login", false);
		});

};

</script>
<template>
	<div class="rounded-2xl bg-white py-8 px-6 w-full md:w-[25rem]">
		<h3 class="text-4xl font-bold mb-6 mt-4 form-title">Log In</h3>
		<form @submit.prevent="onLogin">
			<div class="grid grid-cols-1 gap-4">
				<div :class="{ 'invalid': v$.email.$invalid && hasSubmitted }" class="login-input-group">
					<label for="inputEmail" class="text-shadow-white">Email</label>
					<input v-model="v$.email.$model" type="email" id="inputEmail" class="pl-[10rem] focus-shadow" required>
				</div>
				<div :class="{ 'invalid': v$.password.$invalid && hasSubmitted }" class="login-input-group">
					<label for="inputPass" class="text-shadow-white">Password</label>
					<input v-model="v$.password.$model" type="password" id="inputPass" class="pl-[10rem] focus-shadow" required>
				</div>
			</div>
			<div class="h-3 my-4">
				<LoaderHorizontalLine v-if="showLoader" />
			</div>
			<div class="flex items-end mb-8 mx-2 md:mx-4">
				<a href="#" class="text-xs mb-1 font-semibold drop-shadow-[0_1px_5px_#fff] hover:text-black">Lupa password?</a>
				<button type="submit" class="ml-auto font-medium text-base xl:text-base px-6 rounded py-2 font-semibold text-white bg-primary-700 hover:bg-primary-600">Log In</button>
			</div>
			<p class="text-xs text-center mb-2 font-medium drop-shadow-[0_1px_5px_#fff]">Belum pernah register? <RouterLink to="/register" class="font-bold hover:text-black">Buat Akun</RouterLink></p>
		</form>
	</div>
</template>

<style scoped>

.form-title {
	text-shadow: 1px 3px theme(colors.secondary);
}

.login-input-group label {
	@apply block mb-2;
}

.login-input-group input,
.login-input-group textarea {
	@apply block w-full px-4 py-2 text-sm focus:shadow-none rounded transition-colors bg-gray-100 border;
}

.login-input-group.invalid {
	@apply border-danger-500;
}

.login-input-group > label {
	@apply pl-4 pr-2 py-2 text-sm text-black/80;
}

</style>