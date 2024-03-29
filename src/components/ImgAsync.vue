<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(["loaded"]);
const props = defineProps({
	src: { type: String, default: "" },
	size: { type: Number, default: 20 }
});

const imgSrc = ref("");
const styleImg = computed(() => ({ backgroundImage: `url('${ imgSrc.value }')` }));
const dotSize = props.size;

onMounted(() => {
	const targetImg = new Image();

	targetImg.onload = () => {
		imgSrc.value = props.src;
		emit("loaded");
	};

	targetImg.src = props.src;
});

</script>
<template>
	<div class="bg-cover bg-center bg-no-repeat" :style="styleImg">
		<Transition :duration="300" name="opacity">
			<div v-if="imgSrc.length < 1" class="absolute left-0 top-0 w-full h-full flex justify-center items-center bg-white">
				<!-- <div class="w-full h-full bg-gradient-to-bl from-gray-600 to-gray-400"></div>
				<div class="rotating-dots">
					<div></div><div></div><div></div>
				</div> -->
			</div>
		</Transition>
		<div class="absolute left-0 top-0 w-full h-full">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<style scoped>

.opacity-enter-active, .opacity-leave-active {
	transition: opacity .3s ease-in-out;
}

.opacity-enter-from, .opacity-leave-to {
	opacity: 0;
}

@-webkit-keyframes rotating-dots {
	0% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
	}
	50%, 100% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
	}
}

@keyframes rotating-dots {
	0% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(0deg);
	}
	50%, 100% {
		-webkit-transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
		transform: translate(calc(var(--translate) * 1%), 0) rotateY(calc(var(--rotation, 0) * 1deg)) rotate(180deg);
	}
}

@-webkit-keyframes rotating-dots-flash {
	0%, 50% {
		visibility: visible;
	}
	50.0001%, 100% {
		visibility: hidden;
	}
}

@keyframes rotating-dots-flash {
	0%, 50% {
		visibility: visible;
	}
	50.0001%, 100% {
		visibility: hidden;
	}
}

.rotating-dots {
	--duration: 1;
	--size: v-bind('dotSize');;
	height: calc(var(--size) * 1px);
	position: absolute;
	width: calc(var(--size) * 1px);
}

.rotating-dots div {
	-webkit-animation: rotating-dots calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite;
	animation: rotating-dots calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite;
	height: 100%;
	position: absolute;
	-webkit-transform: translate(calc(var(--translate) * 1%), 0);
	transform: translate(calc(var(--translate) * 1%), 0);
	width: 100%;
}

.rotating-dots div:after, .rotating-dots div:before {
	background: var(--primary);
	border-radius: 100%;
	content: '';
	height: 100%;
	position: absolute;
	width: 100%;
}

.rotating-dots div:after {
	-webkit-animation: rotating-dots-flash calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite steps(2);
	animation: rotating-dots-flash calc(var(--duration) * 1s) calc(var(--delay, 0) * 1s) infinite steps(2);
	-webkit-transform: translate(-100%, 0);
	transform: translate(-100%, 0);
}

.rotating-dots div:before {
	-webkit-transform: translate(100%, 0);
	transform: translate(100%, 0);
}

.rotating-dots div:nth-of-type(1) {
	--translate: -100;
	--primary: #fff;
}

.rotating-dots div:nth-of-type(2) {
	--delay: calc((var(--duration) / 2) * -1);
	--rotation: 180;
	--translate: 100;
	--primary: #fff;
}

</style>