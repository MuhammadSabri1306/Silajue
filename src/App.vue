<script setup>
import { watch } from "vue";
import { useViewStore } from "@/stores/view";
import { useToast } from "primevue/usetoast";

const viewStore = useViewStore();
const toast = useToast();

const watcherSrc = () => viewStore.toastContent;
const watcherCall = toastContent => toast.add(toastContent);
watch(watcherSrc, watcherCall);
</script>
<template>
    <div>
        <router-view></router-view>
        <Toast position="bottom-right" class="z-[9999]" />
    </div>
</template>