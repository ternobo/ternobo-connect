<template>
	<div class="content-editor--container">
		<draggable class="list-group" v-model="editorItems" tag="div" v-bind="dragOptions" @start="drag = true" @end="drag = false">
			<transition-group type="transition" :name="!drag ? 'flip-list' : null">
				<div class="editor-item" v-for="element in editorItems" :key="'item_type_' + element.type">
					<div class="actions">
						<i class="material-icons-outlined hover-danger">delete_outline</i>
						<i class="material-icons-outlined hand-hover">unfold_more</i>
					</div>
					<component :is="components[element.type]" />
				</div>
			</transition-group>
		</draggable>
	</div>
</template>

<script>
import TextInput from "./Elements/TextInput.vue";
import TitleInput from "./Elements/TitleInput.vue";

export default {
	watch: {},
	methods: {
		addElement(type) {
			switch (type) {
				case "text":
					this.editorItems.push({ type: "text", content: "" });
					break;
				case "title":
					this.editorItems.push({ type: "title", content: "" });
					break;
				case "media":
					this.editorItems.push({ type: "media", content: null });
					break;
			}
		},
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	components: { TextInput },
	data() {
		return {
			editorItems: [],
			drag: false,
			components: {
				text: TextInput,
				title: TitleInput,
			},
		};
	},
	mounted() {
		this.editorItems = this.contents;
	},
	props: {
		contents: {
			default: () => [],
		},
	},
};
</script>

<style>
</style>
