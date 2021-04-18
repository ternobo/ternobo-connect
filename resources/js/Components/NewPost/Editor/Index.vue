<template>
	<div class="content-editor--container">
		<div class="elements">
			<draggable class="list-group" v-model="editorItems" handle=".hand-hover" tag="div" v-bind="dragOptions" @start="drag = true" @end="drag = false">
				<div class="editor-item" :class="{ 'image-item': element.type == 'media' }" v-for="(element, index) in editorItems" :key="'item_type_' + element.type">
					<div class="actions">
						<i class="material-icons-outlined hover-danger" @click="deleteElem(index)">delete_outline</i>
						<i class="material-icons-outlined hand-hover">unfold_more</i>
					</div>
					<component :is="components[element.type]" :content.sync="editorItems[index].content" :max="2500" />
				</div>
			</draggable>
			<div class="d-flex editor-actions" v-if="availableOptions.length > 0" :class="{ 'align-items-center': editorItems.length < 1 }">
				<actions-button @select="addElement($event)" :active-options="availableOptions" />
				<div class="placeholder-element clickable" v-if="editorItems.length < 1" @click="addElement('text')">
					<span class="text-superlight font-14">اگر در خویش میل نوشتن سراغ کردی باید سه چیز در تو باشد. شناختی، هنری و سحری (جبران خلیل جبران)</span>
				</div>
			</div>
		</div>
		<div class="my-3 character-counter" v-if="hasText">
			<span class="counter tex-dark">{{ leftCharacter }}</span>
			<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
				<div class="progress-bar" role="progressbar" :style="{ width: textProgress }" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
		</div>
	</div>
</template>

<script>
import ActionsButton from "./ActionsButton.vue";
import TextInput from "./Elements/TextInput.vue";
import TitleInput from "./Elements/TitleInput.vue";
import Media from "./Elements/Media";
export default {
	watch: {
		editorItems: {
			deep: true,
			handler(newValue) {
				this.$emit("update:content", newValue);
			},
		},
	},
	methods: {
		getData() {
			return this.editorItems;
		},
		deleteElem(index) {
			this.editorItems.splice(index, 1);
			this.$emit("itemRemoved");
		},
		addElement(type) {
			switch (type) {
				case "text":
					this.editorItems.push({ type: "text", content: "" });
					this.$emit("itemAdd");
					break;
				case "title":
					this.editorItems.push({ type: "title", content: "" });
					this.$emit("itemAdd");
					break;
				case "media":
					let fileChooser = document.createElement("input");
					fileChooser.type = "file";
					fileChooser.onchange = (e) => {
						let file = e.target.files[0];
						if (file.type.startsWith("image") && !file.type.includes("svg+xml")) {
							this.editorItems.push({ type: "media", content: file });
							this.$emit("itemAdd");
						} else {
							this.toast("فقط امکان فایل‌های jpeg, png, jpg, gif مجاز است");
						}
					};
					fileChooser.click();
					break;
			}
		},
	},
	computed: {
		hasText() {
			return this.editorItems.filter((item) => item.type == "text").length > 0;
		},
		textItem() {
			if (this.hasText) {
				return this.editorItems.filter((item) => item.type == "text")[0];
			} else {
				return { content: "" };
			}
		},
		textProgress() {
			return (this.textItem.content.length / 2500) * 100 + "%";
		},
		leftCharacter() {
			return 2500 - this.textItem.content.length;
		},
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
				media: Media,
			},
		};
	},
	mounted() {
		this.editorItems = this.content;
	},
	props: {
		content: {
			default: () => [],
		},
	},
};
</script>

<style>
</style>
