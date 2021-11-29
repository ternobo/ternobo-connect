<template>
	<div class="monitization-request-page">
		<monetization-container :status="status" />
	</div>
</template>

<script>
import MonetizationContainer from "../../Components/Monetization/MonetizationContainer.vue";
import AppLayout from "../../Layouts/AppLayout.vue";
export default {
	components: { MonetizationContainer },
	layout: AppLayout,
	props: ["status"],
};
</script>