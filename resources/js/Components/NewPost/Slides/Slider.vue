<template>
	<div>
		<div class="text p-0">
			<div class="textarea">
				<editor @itemAdd="updateIcon()" @itemRemoved="updateIcon()" ref="editor" :content.sync="slides[activeIndex].content" />
			</div>
		</div>
		<div class="new-post-slider-scrollable" ref="slidesList" :class="{ hasArrow: this.slides.length > maxSlides }">
			<i class="material-icons arrow" v-if="this.slides.length > maxSlides" @click="updateTransform(-96)">keyboard_arrow_right</i>
			<div class="scrollable-list">
				<div class="new-post-slider" :style="{ transform: `translateX(${transformBy}px)` }">
					<slide-item v-for="(slide, index) in slides" :key="`slides_${slide.id}`" :hide-delete="index == 0" :class="{ active: slide.id == slides[activeIndex].id }" @delete="deleteItem(index)">
						<i @click="selectSlide(index)" class="material-icons-outlined">{{ slide.icon }}</i>
					</slide-item>
					<div class="add-slide" @click="addSlide"><i class="material-icons">add</i></div>
				</div>
			</div>
			<i class="material-icons arrow" v-if="this.slides.length > maxSlides" @click="updateTransform(96)">keyboard_arrow_left</i>
		</div>
	</div>
</template>

<script>
import Editor from "../Editor/Index";
import SlideItem from "./SlideItem.vue";
import uuidv4 from "uuid";

export default {
	watch: {
		slides: {
			deep: true,
			handler(newValue) {
				this.$emit("input", newValue);
			},
		},
	},
	props: {
		value: {
			default: null,
		},
	},
	methods: {
		getData() {
			return this.slides.filter((item) => item.content.length > 0);
		},
		updateTransform(value) {
			let maxTransform = Math.min(this.slides.length, 5);
			if (value + this.transformBy <= 0 && value + this.transformBy >= -(maxTransform * 96)) {
				this.transformBy += value;
			}
		},
		deleteItem(index) {
			if (index == this.activeIndex) {
				this.selectSlide(index - 1);
			}

			this.$nextTick(() => {
				let deletedItem = this.slides.splice(index, 1);
				this.$emit("delete", deletedItem[0].id);
			});
		},
		updateIcon() {
			this.slides.forEach((item) => {
				if (item.id == this.slides[this.activeIndex].id) {
					item.icon = "more_horiz";
					let items = item.content;
					for (let i = 0; i < items.length; i++) {
						let elem = items[i];
						if (elem.type == "media") {
							item.icon = "image";
							break;
						} else {
							item.icon = "text_fields";
						}
					}
				}
			});
		},
		addSlide() {
			if (this.slides.length < 12) {
				this.slides.push({ id: uuidv4(), content: [], icon: "more_horiz", active: false });
			}
		},
		selectSlide(index) {
			this.slides.forEach((item) => {
				item.active = false;
			});
			Object.assign(this.slides[index], { active: true });
			this.$nextTick(() => {
				this.$refs.editor.editorItems = this.slides[index].content;
			});
		},
	},
	computed: {
		activeIndex() {
			const index = this.slides.findIndex((item) => item.active);
			return index != -1 ? index : 0;
		},
	},
	mounted() {
		setTimeout(() => {
			this.maxSlides = Math.floor(this.$refs.slidesList.getBoundingClientRect().width / 76) - 1;
		}, 2000);
	},
	created() {
		if (this.value) {
			this.slides = this.value;
		}
	},
	data() {
		return {
			slides: [{ id: uuidv4(), content: [], icon: "more_horiz", active: true }],
			transformBy: 0,
			maxSlides: 6,
		};
	},
	components: { SlideItem, Editor },
};
</script>

<style>
</style>