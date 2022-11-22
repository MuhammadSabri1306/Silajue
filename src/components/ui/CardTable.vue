<script setup>
defineProps({
	hoverable: { type: Boolean, default: false }
});
</script>
<template>
	<div class="card-table" :class="{ 'card-table-hoverable': hoverable }">
		<table>
			<thead>
				<slot name="thead"></slot>
			</thead>
			<tbody>
				<slot name="tbody"></slot>
			</tbody>
		</table>
	</div>
</template>
<style scoped>
	
.card-table {
	@apply shadow-sm border text-sm lg:text-base rounded-2xl lg:rounded-lg overflow-hidden;
}

.card-table table {
	@apply border-collapse min-w-full lg:w-full;
}

.card-table :deep(th) {
	@apply bg-gray-100 px-4 lg:px-8 py-4 text-left text-gray-900 border-b;
}

.card-table :deep(td) {
	@apply bg-white px-6 lg:px-8 py-6 lg:py-4 text-left font-medium text-gray-700;
}

.card-table-hoverable :deep(tr):hover td {
	@apply bg-gray-100/70;
}

.card-table :deep(tr):not(:last-child) td {
	@apply border-b;
}

</style>