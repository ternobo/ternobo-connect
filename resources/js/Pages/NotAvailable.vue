<template>
	<div class="not-available">
		<div class="card p-52px">
			<h1 class="text-center font-20 font-bold mb-9">{{ __.get("application.profile-not-available") }}</h1>
			<img src="/images/profile-not-available.svg" />
		</div>
	</div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout.vue";
export default {
	layout: AppLayout,
};
</script>

<style lang="scss">
.not-available {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.card {
		padding: 52px;
	}

	img {
		height: 303px;
		width: 312px;
	}
}
</style>