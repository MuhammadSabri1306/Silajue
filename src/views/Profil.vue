<script setup>
import { ref, computed } from "vue";

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
	<div class="bg-white py-16">
		<div class="container">
			<form @submit.prevent="onSubmit">
				<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
					<div class="p-8 flex justify-center md:justify-end">
						<div class="flex flex-col items-center">
							<div class="w-56 lg:w-72 aspect-square rounded-full bg-gray-200 mb-8 bg-cover bg-center" :style="profileImgStyle">&nbsp;</div>
							<div class="relative group">
								<button class="px-6 py-2 rounded-[50rem] text-base leading-none text-black font-medium text-shadow-white bg-primary-500 group-hover:bg-primary-600">Upload Foto</button>
								<input type="file" name="img" class="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" @change="onInputImgChange">
							</div>
						</div>
					</div>
					<div>
						<div class="mb-8">
							<label class="text-lg font-medium">Nama</label>
							<div class="grid mt-2 lg:mt-3">
								<input type="text" name="nama" class="py-2 px-4 w-full rounded-[50rem] bg-gray-200" placeholder="Masukkan nama anda">
							</div>
						</div>
						<div class="mb-8">
							<label class="text-lg font-medium">Email</label>
							<div class="grid mt-2 lg:mt-3">
								<input type="email" name="email" class="py-2 px-4 w-full rounded-[50rem] bg-gray-200" placeholder="Masukkan email anda">
							</div>
						</div>
						<div class="mb-8">
							<label class="text-lg font-medium">Password</label>
							<div class="grid mt-2 lg:mt-3">
								<input type="password" name="password" class="py-2 px-4 w-full rounded-[50rem] bg-gray-200" placeholder="Masukkan password baru anda">
							</div>
						</div>
						<div>
							<label class="text-lg font-medium">Alamat</label>
							<div class="grid mt-2 lg:mt-3">
								<input type="text" name="alamat" class="py-2 px-4 w-full rounded-[50rem] bg-gray-200" placeholder="Masukkan alamat anda">
							</div>
						</div>
						<div class="flex justify-end p-16">
							<button type="submit" class="font-bold text-base xl:text-base text-shadow-white px-6 rounded-2xl py-2 bg-primary-500 hover:bg-primary-600 btn-focus-primary">Update</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>