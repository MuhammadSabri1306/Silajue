<script setup>
// import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

defineEmits(["decode", "loaded"]);

/*const onDecode = text => {
    console.log(`Decode text from QR code is ${text}`)
};

const onLoaded = () => {
   console.log(`Ready to start scanning barcodes`)
};*/
</script>
<template>
   <StreamBarcodeReader class="scanner" @decode="val => $emit('decode', val)" @loaded="$emit('loaded')" />
</template>
<style scoped>
   
.scanner :deep(*):not(.laser) {
   @apply w-full h-full;
}

</style>