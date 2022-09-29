<template>
	<Transition name="transtion-down-to-top">
		<slot></slot>
	</Transition>
</template>
<style>
	.transtion-down-to-top-enter-active,
	.transtion-down-to-top-leave-active {
		transition-property: top;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	.transtion-down-to-top-enter-from,
	.transtion-down-to-top-leave-to {
		@apply -top-full;
	}
</style>