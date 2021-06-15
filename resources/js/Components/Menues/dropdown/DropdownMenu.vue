<template>
	<div class="dropdown ternobo-dropdown-container b-dropdown btn-group" v-click-outside="hideMenu">
		<button class="btn btn-dropdown" @click="showMenu = !showMenu"><slot v-bind:active="showMenu" name="button"></slot></button>
		<transition name="fade">
			<ul role="menu" ref="menu" tabindex="-1" class="dropdown-menu" :class="[`ternobo-dropdown-${variant}`]" style="display: block" v-if="showMenu">
				<slot></slot>
			</ul>
		</transition>
	</div>
</template>

<script>
export default {
	props: ["variant"],
	watch: {
		showMenu() {
			this.$emit("toggle", this.showMenu);
			if (this.showMenu) {
				this.$nextTick(() => {
					this.$refs.menu.querySelectorAll("[role=menuitem]").forEach((item) => {
						item.addEventListener("click", () => {
							this.showMenu = false;
						});
					});
				});
			}
		},
	},
	data() {
		return {
			showMenu: false,
		};
	},
	methods: {
		hideMenu() {
			this.showMenu = false;
		},
	},
};
</script>

<style>
</style>