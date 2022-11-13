<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";

defineEmits(['logout', 'navigate']);

const expandUserMenu = ref(false);
const onUserMenuLostFocus = event => {
	expandUserMenu.value = false;
};

onMounted(() => {
	document.addEventListener("click", onUserMenuLostFocus);
});

onUnmounted(() => {
	document.removeEventListener("click", onUserMenuLostFocus);
});

const userStore = useUserStore();
const nameUser = computed(() => userStore.profile.name);
</script>
<template>
	<div class="relative">
		<a role="button" @click.stop="expandUserMenu = !expandUserMenu" class="collapse-toggler hover-margin">
			<span class="icon-user"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 m-auto"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" /></svg></span>
		</a>
		<Transition name="fade">
			<div v-show="expandUserMenu" class="navbar-collapse">
				<p class="collapse-title">{{ nameUser }}</p>
				<a role="button" @click.stop="$emit('navigate', '/user')" class="collapse-item">
					<div class="icon text-primary-500">
						<font-awesome-icon icon="fa-regular fa-face-smile" fixed-width />
					</div>
					<div>
						<h6 class="text-primary-700">Profil</h6>
						<p>Lihat Profil saya</p>
					</div>
				</a>
				<a role="button" @click.stop="" class="collapse-item">
					<div class="icon text-green-500">
						<font-awesome-icon icon="fa-solid fa-receipt" fixed-width />
					</div>
					<div>
						<h6 class="text-green-700">Invoice</h6>
						<p>Detail pesanan saya</p>
					</div>
				</a>
				<a role="button" @click.stop="$emit('logout')" class="collapse-item">
					<div class="icon text-red-500">
						<font-awesome-icon icon="fa-regular fa-share-from-square" fixed-width />
					</div>
					<div>
						<h6 class="text-red-700">Log Out</h6>
						<p>Keluar dari Akun saya</p>
					</div>
				</a>
			</div>
		</Transition>
	</div>
</template>
<style scoped>

.collapse-toggler {
	@apply block w-8 h-8 rounded-full overflow-hidden flex;
}

.icon-user {
	@apply text-primary-700 hover:text-primary-600;
}

.img-user {
	@apply bg-no-repeat bg-center bg-cover opacity-80 hover:opacity-100 focus:opacity-100;
}

.navbar-collapse {
	@apply absolute top-full right-0 min-w-[16rem] mt-2 bg-white rounded border shadow-lg overflow-hidden grid grid-cols-1;
}

.navbar-collapse > *:not(:last-child) {
	@apply border-b;
}

.collapse-title {
	@apply text-sm font-bold text-center p-4 text-gray-700;
}

.collapse-item {
	@apply px-6 py-4 flex items-center opacity-80 hover:opacity-100 active:opacity-100 bg-white hover:bg-gray-100 focus:bg-gray-100;
}

.collapse-item > .icon {
	@apply text-2xl mr-4;
}

.collapse-item h6 {
	@apply text-lg lg:text-sm font-bold mb-1;
}

.collapse-item p {
	@apply text-xs font-semibold;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin-top 0.3s, margin-bottom 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-4 mb-4;
}

</style>