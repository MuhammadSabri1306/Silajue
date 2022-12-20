<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import FormLogin from "@/components/FormLogin.vue";
import FormRegister from "@/components/form-register/Form.vue";
import Footer from "@/components/basic-layout/Footer.vue";

const route = useRoute();
const isLoginPage = computed(() => route.name == "login");
</script>
<template>
	<div>
		<main>
			<div class="w-full md:w-[80%] lg:w-[50vw] flex">
				<div class="m-auto max-w-full md:max-w-[40rem] py-12">
					<h5 class="text-6xl md:text-7xl text-blue-600 font-bold text-shadow-white">SILAJUE</h5>
					<h6 class="text-gray-900 font-semibold md:text-xl drop-shadow-[0_0_2px_#fff]">Sistem Layanan Penjualan Online</h6>
				</div>
			</div>
			<div class="w-full md:w-auto lg:pr-20">
				<FormLogin v-if="isLoginPage" />
				<FormRegister v-else />
			</div>
		</main>
		<Footer class="footer" />
	</div>
</template>
<style scoped>
	
main {
	background: url('/assets/img/bg-new.webp') center,
		linear-gradient(to bottom, transparent, rgb(68 68 68) 100%);
	@apply flex flex-col lg:flex-row justify-center lg:justify-around items-center gap-8 p-8 min-h-[100vh] bg-cover bg-center bg-no-repeat bg-fixed bg-blend-lighten;
}

main > div {
	@apply z-[2];
}

.footer {
	@apply shadow-[0_0_8rem_1rem_#111827];
}

</style>