<template>
	<div class="content-editor--container">
		<div class="elements">
			<draggable class="list-group" v-model="editorItems" tag="div" v-bind="dragOptions" @start="drag = true" @end="drag = false">
				<transition-group type="transition" :name="!drag ? 'flip-list' : null">
					<div class="editor-item" v-for="(element, index) in editorItems" :key="'item_type_' + element.type">
						<div class="actions">
							<i class="material-icons-outlined hover-danger" @click="deleteElem(index)">delete_outline</i>
							<i class="material-icons-outlined hand-hover">unfold_more</i>
						</div>
						<component :is="components[element.type]" />
					</div>
				</transition-group>
			</draggable>
			<div class="d-flex editor-actions" :class="{ 'align-items-center': editorItems.length < 1 }">
				<actions-button @select="addElement($event)" :active-options="availableOptions" />
				<div class="placeholder-element clickable" v-if="editorItems.length < 1" @click="addElement('text')">
					<span class="text-superlight font-14">اگر در خویش میل نوشتن سراغ کردی باید سه چیز در تو باشد. شناختی، هنری و سحری (جبران خلیل جبران)</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ActionsButton from "./ActionsButton.vue";
import TextInput from "./Elements/TextInput.vue";
import TitleInput from "./Elements/TitleInput.vue";

export default {
	watch: {},
	methods: {
		deleteElem(index) {
			this.editorItems.splice(index, 1);
		},
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
		availableOptions() {
			let addedOptions = this.editorItems.map((item) => item.type);
			return ["text", "title", "media"].filter((item) => !addedOptions.includes(item));
		},
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	components: { ActionsButton },
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
