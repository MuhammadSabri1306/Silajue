<script setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import { useToast } from "primevue/usetoast";

const viewStore = useViewStore();
const toast = useToast();

const watcherSrc = () => viewStore.toastContent;
const watcherCall = toastContent => toast.add(toastContent);
watch(watcherSrc, watcherCall);

const userStore = useUserStore();
userStore.checkUserCookie();

const router = useRouter();
router.beforeEach((to, from) => {
    const needLogin = (to.meta.needAdminRole && !userStore.isRoleAdmin) || (to.meta.needLogin && userStore.isRolePublic);
    if(needLogin)
        return { path: "/login", query: { redirect: to.fullPath } };
});
</script>
<template>
    <div>
        <router-view></router-view>
        <Toast position="bottom-right" class="z-[9999]" />
    </div>
</template>