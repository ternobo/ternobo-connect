<template>
	<div>
		<AppHeader></AppHeader>
		<div id="app" class="container">
			<div :class="{ 'has-bnav': !$root.isDesktop }">
				<transition mode="out-in" name="fade">
					<slot></slot>
				</transition>
			</div>
			<bottom-navigator v-if="!$root.isDesktop"></bottom-navigator>
		</div>
	</div>
</template>

<script>
import BottomNavigator from "../Components/App/BottomNavigator.vue";
import AppHeader from "../Components/App/header/AppHeader";
export default {
	name: "AppLayout",
	components: {
		AppHeader,
		BottomNavigator,
	},
};
</script>

<style></style>
