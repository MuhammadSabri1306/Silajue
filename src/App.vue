<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "./components/BasicLayout.vue";

const route = useRoute();
const basicLayoutViews = ["beranda", "profil", "tentang", "produk", "produkDetail", "produkForm", "blog", "blogDetail", "blogForm", "panduan"];
const useBasicLayout = computed(() => basicLayoutViews.indexOf(route.name) >= 0);
</script>
<template>
    <BasicLayout v-if="useBasicLayout">
        <template #main>
            <router-view></router-view>
        </template>
    </BasicLayout>
    <router-view v-else></router-view>
</template>