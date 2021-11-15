<template>
	<div class="monitization-request-page">
		<monitization-container :status="status" />
	</div>
</template>

<script>
import MonitizationContainer from "../../Components/Monitization/MonitizationContainer.vue";
import AppLayout from "../../Layouts/AppLayout.vue";
export default {
	components: { MonitizationContainer },
	layout: AppLayout,
	props: ["status"],
};
</script>

<style>
</style>