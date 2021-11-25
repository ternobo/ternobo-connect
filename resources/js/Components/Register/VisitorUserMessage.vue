<template>
	<div class="card px-9 pt-9 pb-0" style="width: 480px">
		<div class="card-header">
			<img draggable="false" height="64" src="/emoji/72x72/1f389.png" class="mb-5" />
			<br />
			<span class="text-black font-demibold font-24">{{ __.get("landing.welcome") }}</span>
		</div>
		<div class="card-body mt-5 p-0">
			<p v-html="__.get('landing.invite-description.p1')"></p>
			<p v-html="__.get('landing.invite-description.p2')"></p>
			<p v-html="__.get('landing.invite-description.p3')"></p>
		</div>
		<div class="login-button-container w-100 h-auto">
			<a class="btn btn-lg btn-primary w-100" href="/feed">{{ __.get("application.continue") }}</a>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>