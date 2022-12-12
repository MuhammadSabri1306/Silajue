<script setup>
// import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
/*
defineEmits(["loaded"]);

const onDecode = text => {
    console.log(`Decode text from QR code is ${text}`)
};

const onLoaded = () => {
   console.log(`Ready to start scanning barcodes`)
};*/
</script>
<template>
   <StreamBarcodeReader class="scanner" @decode="onDecode" @loaded="$emit('loaded')" />
</template>
<style scoped>
   
.scanner :deep(*):not(.laser) {
   @apply w-full h-full;
}

</style>