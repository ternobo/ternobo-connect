<template>
	<div class="d-flex flex-column align-items-center">
		<p>
			{{ __.get("settings.ts-des-2") }}
		</p>
		<div class="twfa-select-way-buttons">
			<button class="btn" @click="$emit('action', 'app')"><i class="material-icons">devices</i> {{ __.get("settings.method-app") }}</button>
			<button class="btn" @click="$emit('action', 'phone')"><i class="material-icons-outlined">sms</i> {{ __.get("settings.method-sms") }}</button>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>