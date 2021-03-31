<template>
	<div class="position-relative" v-click-outside="hideList">
		<button class="btn btn-action-light rounded-circle add-action-btn" :class="{ active: showList }" @click="toggleList"><i class="material-icons font-20">add</i></button>
		<transition name="fade">
			<div class="editors-actions-list" style="left: -290px; top: 0" v-if="showList">
				<div class="text-type-list">
					<div class="editor-list-item">
						<strong>تیتر</strong>
						<i class="material-icons" :class="{ disabled: !activeOptions.includes('title') }" @click="emitAcion('title')">title</i>
					</div>
					<div class="editor-list-item">
						<strong>متن</strong>
						<i class="material-icons" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('text')">text_fields</i>
					</div>
				</div>
				<div class="text-type-list">
					<div class="editor-list-item">
						<strong>رسانه</strong>
						<i class="material-icons-outlined" :class="{ disabled: !activeOptions.includes('media') }" @click="emitAcion('media')">image</i>
					</div>
					<div class="editor-list-item">
						<strong class="opacity-0">رسانه</strong>
						<i class="material-icons-outlined disabled">play_circle_outline</i>
					</div>
					<div class="editor-list-item">
						<strong class="opacity-0">صدا</strong>
						<i class="material-icons-outlined disabled">audiotrack</i>
					</div>
					<div class="editor-list-item">
						<strong class="opacity-0">رسانه</strong>
						<i class="material-icons-outlined disabled">mic_none</i>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: { activeOptions: { default: [] } },
	methods: {
		emitAcion(type) {
			if (this.activeOptions.includes(type)) {
				this.showList = false;
				console.log(type);

				this.$emit("select", type);
			}
		},
		toggleList(e) {
			this.showList = !this.showList;
		},
		hideList() {
			this.showList = false;
		},
	},
	data() {
		return {
			showList: false,
			xPosition: 0,
			yPosition: 0,
		};
	},
};
</script>

<style>
</style>