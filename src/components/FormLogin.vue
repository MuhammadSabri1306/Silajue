<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import LoaderHorizontalLine from "@/components/LoaderHorizontalLine.vue";
import { useDataForm } from "@/modules/data-form";

const router = useRouter();
const toast = useToast();

const { data, v$ } = useDataForm({
	email: { required, email },
	password: { required }
});

const userStore = useUserStore();
const showLoader = ref(false);
const hasSubmitted = ref(false);

const onLogin = async () => {
	hasSubmitted.value = true;
	const ready = await v$.value.$validate();

	if(!ready)
		return;

	showLoader.value = true;
	userStore.login(data.email, data.password, response => {
		if(response.success) {
			toast.add({
				severity:"success",
				summary: "Berhasil Login.",
				detail:"Anda akan diarahkan ke halaman beranda."
			});
			setTimeout(() => router.push("/"), 500);
			return;
		}

		showLoader.value = false;
		toast.add({
			severity:"error",
			summary: "Gagal Login",
			detail:"Username atau password yang anda masukkan tidak benar."
		});
	});
};

</script>
<template>
	<div class="rounded-2xl bg-white/70 py-8 px-6">
		<h3 class="text-4xl font-bold mb-6 mt-4 form-title">Log In</h3>
		<form @submit.prevent="onLogin">
			<div class="grid grid-cols-1 gap-4">
				<div :class="{ 'invalid': v$.email.$invalid && hasSubmitted }" class="login-input-group">
					<label for="inputEmail" class="text-shadow-white">Email</label>
					<div><input v-model="data.email" type="email" id="inputEmail" class="pl-[10rem] focus-shadow" required></div>
				</div>
				<div :class="{ 'invalid': v$.password.$invalid && hasSubmitted }" class="login-input-group">
					<label for="inputPass" class="text-shadow-white">Password</label>
					<div><input v-model="data.password" type="password" id="inputPass" class="pl-[10rem] focus-shadow" required></div>
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

.login-input-group {
	@apply grid grid-cols-[auto_1fr] rounded-lg transition-colors bg-gray-100 border border-transparent;
}

.login-input-group input {
	@apply block w-full h-full pr-4 pl-2 text-sm bg-transparent focus:shadow-none;
}

.login-input-group.invalid {
	@apply border-danger-500;
}

.login-input-group > label {
	@apply pl-4 pr-2 py-2 text-sm text-black/80;
}

</style>