<template>
	<div>
		<div class="text p-0">
			<div class="textarea">
				<editor @itemAdd="updateIcon()" @itemRemoved="updateIcon()" ref="editor" :content.sync="slides[activeIndex].content" />
			</div>
		</div>
		<div class="new-post-slider-scrollable" ref="slidesList" :class="{ hasArrow: this.slides.length > maxSlides }">
			<i class="material-icons arrow" v-if="this.slides.length > maxSlides && direction == 'rtl'" @click="updateTransform(-200)">keyboard_arrow_right</i>
			<i class="material-icons arrow" v-else-if="this.slides.length > maxSlides" @click="updateTransform(200)">keyboard_arrow_left</i>
			<div class="scrollable-list" @wheel="onWheel">
				<div class="new-post-slider" :style="{ transform: `translateX(${transformBy}px)` }">
					<draggable v-bind="dragOptions" draggable=".slide-item" class="drag-container" v-model="slides">
						<slide-item v-for="(slide, index) in slides" :hideDelete="slides.length <= 1" :key="`slides_${slide.id}`" :class="{ active: slide.id == slides[activeIndex].id }" @delete="deleteItem(index)">
							<i @click="selectSlide(index)" class="material-icons-outlined">{{ slide.icon }}</i>
						</slide-item>
					</draggable>
					<div class="add-slide" @click="addSlide" v-if="slides.length < 12"><i class="material-icons">add</i></div>
				</div>
			</div>
			<i class="material-icons arrow" v-if="this.slides.length > maxSlides && direction == 'rtl'" @click="updateTransform(200)">keyboard_arrow_left</i>
			<i class="material-icons arrow" v-else-if="this.slides.length > maxSlides" @click="updateTransform(-200)">keyboard_arrow_right</i>
		</div>
	</div>
</template>

<script>
import Editor from "../Editor/Index";
import SlideItem from "./SlideItem.vue";
import uuidv4 from "uuid";
import { mapState } from "vuex";

export default {
	watch: {
		slides: {
			deep: true,
			handler(newValue) {
				this.$emit("input", newValue);
				if (this.slides.length <= this.maxSlides) {
					this.transformBy = 0;
				}
			},
		},
	},
	props: {
		value: {
			default: null,
		},
	},
	methods: {
		onWheel(e) {
			if (this.slides.length > this.maxSlides) {
				this.updateTransform(e.deltaY);
			}
		},
		getData() {
			return this.slides.filter((item) => item.content.length > 0);
		},
		updateTransform(value) {
			let maxTransform = Math.min(Math.ceil((this.slides.length + 1) / this.maxSlides), this.maxSlides);
			if (value + this.transformBy <= 0 && value + this.transformBy >= -(maxTransform * 200)) {
				this.transformBy += value;
			}
		},
		deleteItem(index) {
			if (index == this.activeIndex) {
				if (index == 0 && this.slides.length == 1) {
					let slide = this.slides[index];
					slide.content = [];
					this.$set(this.slides, index, slide);
					this.$nextTick(() => {
						this.updateIcon();
					});
				} else if (index == 0) {
					this.selectSlide(index + 1);
				} else {
					this.selectSlide(index - 1);
				}
			}
			if (this.slides.length > 1) {
				this.$nextTick(() => {
					let deletedItem = this.slides.splice(index, 1)[0];
					this.$emit("delete", deletedItem.id);
				});
			}
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
				this.selectSlide(this.slides.length - 1);
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
		...mapState(["shared"]),
		direction() {
			return this.shared.direction;
		},
		dragOptions() {
			return {
				animation: 200,
				group: "slides",
				disabled: false,
				ghostClass: "ghost",
			};
		},
		activeIndex() {
			const index = this.slides.findIndex((item) => item.active);
			return index != -1 ? index : 0;
		},
	},
	mounted() {
		this.loadTimeout = setTimeout(() => {
			this.maxSlides = Math.floor(this.$refs.slidesList.getBoundingClientRect().width / 76) - 1;
		}, 1000);
	},
	destroyed() {
		clearTimeout(this.loadTimeout);
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

			loadTimeout: false,
		};
	},
	components: { SlideItem, Editor },
};
</script>

<style>
</style>