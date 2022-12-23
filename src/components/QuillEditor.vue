<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const editor = ref(null);
const getContent = () => editor.value.getHTML();

defineExpose({ getContent });
</script>
<template>
	<QuillEditor ref="editor" theme="snow" toolbar="essential" contentType="html" />
</template>
<style>

.ql-editor p {
	@apply text-sm text-gray-600 !important;
}

</style>