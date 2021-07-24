<template>
	<div class="blocked-user">
		<div class="blockcontainer-title">
			<i class="material-icons">block</i>
			<span>{{ __.get("user-profile.blocked-title", { fname: fname }) }}</span>
		</div>
		<span>{{ __.get("user-profile.blocked-description") }}</span>
	</div>
</template>

<script>
export default {
	props: ["fname"],
};
</script>

<style>
</style>