<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import Toast from "@/components/ui/Toast.vue";

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
        <Toast />
    </div>
</template>