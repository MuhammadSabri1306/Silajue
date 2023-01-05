<script setup>
import { ref, watch } from "vue";
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
const viewKey = ref(0);

router.beforeEach((to, from) => {
    const needLogin = (to.meta.needAdminRole && !userStore.isRoleAdmin) || (to.meta.needOperatorRole && !userStore.isRoleOperator) || (to.meta.needLogin && userStore.isRolePublic);
    
    if(needLogin)
        return { path: "/login", query: { redirect: to.fullPath } };

    if(to.name === from.name)
        viewKey.value++;
});

</script>
<template>
    <div>
        <router-view :key="viewKey"></router-view>
        <Toast position="bottom-right" class="z-[9999]" />
    </div>
</template>