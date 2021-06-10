<template>
	<div class="container" style="height: 80vh; display: flex; align-items: center">
		<div class="row pt-4">
			<div class="col-md-6">
				<h2>{{ title }}</h2>
				<p>{{ description }}</p>
			</div>
			<div class="col-md-6">
				<img src="/images/notfound.svg" />
			</div>
		</div>
	</div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
export default {
	created() {},
	props: {
		status: Number,
	},
	computed: {
		title() {
			return {
				503: __.get("messages.http-title.503"),
				500: __.get("messages.http-title.500"),
				404: __.get("messages.http-title.404"),
				403: __.get("messages.http-title.403"),
			}[this.status];
		},
		description() {
			return {
				503: __.get("messages.http-description.503"),
				500: __.get("messages.http-description.500"),
				404: __.get("messages.http-description.404"),
				403: __.get("messages.http-description.403"),
			}[this.status];
		},
	},
	layout: AppLayout,
};
</script>

<style>
</style>
