<template>
	<Transition :duration="300" name="transition-bottom-up">
		<slot></slot>
	</Transition>
</template>
<style>
	.transition-bottom-up-enter-active,
	.transition-bottom-up-leave-active {
		transition: bottom .3s ease-in-out;
	}

	.transition-bottom-up-enter-from,
	.transition-bottom-up-leave-to {
		@apply -bottom-full;
	}
</style>