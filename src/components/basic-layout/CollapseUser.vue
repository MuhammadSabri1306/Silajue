<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import Avatar from "@/components/ui/Avatar.vue";

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
const avatarUser = computed(() => userStore.profile.avatar);
</script>
<template>
	<div class="relative">
		<a role="button" @click.stop="expandUserMenu = !expandUserMenu" class="collapse-toggler hover-margin">
			<Avatar :name="nameUser" :img="avatarUser" />
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
				<a role="button" @click.stop="$emit('navigate', '/invoice')" class="collapse-item">
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