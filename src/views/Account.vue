<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import FormLogin from "@/components/FormLogin.vue";
import FormRegister from "@/components/form-register/Form.vue";
import FooterLight from "@/components/basic-layout/FooterLight.vue";

const route = useRoute();
const isLoginPage = computed(() => route.name == "login");
</script>
<template>
	<div>
		<div class="flex flex-col lg:flex-row justify-center lg:justify-around items-center flex-wrap gap-8 p-8 min-h-[100vh] bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('/assets/img/bg-market.webp');">
			<div class="w-full md:w-[80%] lg:w-[50vw]">
				<img src="/assets/img/silajue-text-left.webp" class="w-full opacity-90">
			</div>
			<div class="w-full md:w-auto lg:pr-20">
				<FormLogin v-if="isLoginPage" />
				<FormRegister v-else />
			</div>
		</div>
		<FooterLight />
	</div>
</template>