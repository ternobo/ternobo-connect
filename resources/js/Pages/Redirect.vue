<template>
	<div class="leave-app">
		<div class="leaving-ternobo-container">
			<img class="logo" width="42" src="/images/logo.svg" />
			<div class="d-flex font-24">
				<i class="material-icons font-32 me-2 text-warning-dark">warning_amber</i>
				<span class="text-warning-dark">{{ __.get("application.warning") }}</span>
			</div>
			<div class="font-demibold">
				<p class="mb-0 text-dark">{{ __.get("redirect.description") }}</p>
				<p class="mb-0 text-muted">{{ __.get("redirect.warn") }}</p>
			</div>
			<a class="font-16 text-action" :href="link">{{ link }}</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ["link"],
};
</script>

<style lang="scss" scoped>
.leave-app {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}
.leaving-ternobo-container {
	max-width: 450px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	p {
		text-align: center;
	}
	> *:not(:last-child) {
		margin-bottom: 32px;
	}
}
</style>