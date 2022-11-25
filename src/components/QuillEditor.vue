<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
	components: { QuillEditor }
};
</script>
<template>
	<QuillEditor theme="snow" toolbar="essential" contentType="html" />
</template>