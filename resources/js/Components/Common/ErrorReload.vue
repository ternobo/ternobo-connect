<template>
	<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading">
		<div class="d-flex flex-column justify-center align-items-center w-100 err">
			<i @click="$emit('reload')" class="hover-dark text-muted material-icons-outlined">refresh</i>
			<br />
			<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
		</div>
	</div>
</template>

<script>
export default {};
</script>