<template>
	<Transition name="transtion-top-down">
		<slot></slot>
	</Transition>
</template>
<style>
	.transtion-top-down-enter-active,
	.transtion-top-down-leave-active {
		transition-property: top;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	.transtion-top-down-enter-from,
	.transtion-top-down-leave-to {
		@apply -top-full;
	}
</style>