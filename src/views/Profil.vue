<script setup>
import { ref, computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";

const profileImg = ref(null);
const profileImgStyle = computed(() => {
	if(!profileImg.value)
		return {};

	return {
		backgroundImage: `url(${ profileImg.value })`
	};
});

const onSubmit = event => null;

const onInputImgChange = (event) => {
	const reader = new FileReader();
	
	reader.onload = () => {
		profileImg.value = reader.result;
		console.log(profileImgStyle.value);
	};

	reader.readAsDataURL(event.target.files[0]);
};

</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="bg-white py-16">
				<div class="container">
					<form @submit.prevent="onSubmit">
						<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
							<div class="p-8 flex justify-center md:justify-end">
								<div class="flex flex-col items-center">
									<div class="w-56 lg:w-72 aspect-square rounded-full bg-gray-200 mb-8 bg-cover bg-center" :style="profileImgStyle">&nbsp;</div>
								</div>
							</div>
							<div>
								<div class="input-group mb-8">
									<label>Nama Lengkap</label>
									<input type="text" name="nama" placeholder="Masukkan nama anda">
								</div>
								<div class="input-group mb-8">
									<label>Email</label>
									<input type="email" name="email" placeholder="Masukkan email anda">
								</div>
								<div class="input-group">
									<label>Alamat</label>
									<textarea id="textAlamat" rows="3"></textarea>
								</div>
								<div class="flex justify-end p-16">
									<button type="submit" class="text-base text-shadow-black text-white px-6 rounded py-2 bg-primary-700 hover:bg-primary-600 btn-focus-primary">Update</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>