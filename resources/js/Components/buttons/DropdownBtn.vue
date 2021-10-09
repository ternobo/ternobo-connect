<template>
	<div class="bg-light-blue dropndown-btn" v-click-outside="close" style="height: fit-content" :class="{ active: open }">
		<button class="btn btn-icon btn-rounded btn-secondary" @click="open = !open">
			<i class="material-icons">add</i>
		</button>
		<transition name="fade">
			<ul class="items" v-if="open">
				<li v-for="item in items" :key="'dropdown_' + item.id" @click="itemClick(item)">
					{{ item.name }}
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
export default {
	methods: {
		close() {
			this.$nextTick(() => {
				if (this.open) {
					this.open = false;
				}
			});
		},
		itemClick(item) {
			this.$emit("click", item.id);
			this.open = false;
		},
	},
	data() {
		return {
			open: false,
		};
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.active {
	i {
		transform: rotate(-45deg);
	}
}
</style>
