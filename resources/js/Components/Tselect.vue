<template>
	<div class="tselect" :dir="direction" v-click-outside="close">
		<div class="tselect_title" ref="titleSection" @click="openDropdown">
			<div class="title-text">
				<span v-if="!selectedItem">
					<slot></slot>
				</span>
				<span v-else>
					<i class="material-icons verical-middle" v-if="selectedItem.hasOwnProperty('icon')">{{ selectedItem.icon }}</i>
					<span> {{ selectedItem[labelOption] }} </span>
				</span>
			</div>
			<i class="material-icons tselect_arrow">keyboard_arrow_down</i>
		</div>
		<transition name="slide">
			<div class="tselect-items" :style="{ width: dropdownWidth }" ref="itemsElement" v-if="showItems">
				<div class="items">
					<div class="tselect_item" v-for="item in items" :class="{ active: isChecked(item) }" :key="item[valueOption]" @click="selectItem(item)">
						<label class="tselect_item--text">
							<i class="material-icons verical-middle" v-if="item.hasOwnProperty('icon')">{{ item.icon }}</i>
							{{ item[labelOption] }}
						</label>
					</div>
				</div>
				<div class="tselect_new-item" v-if="showNewItem">
					<div class="d-flex w-100 px-1">
						<input v-model="newItemInput" type="text" placeholder="دسته بندی جدید را وارد کنید" class="add-category-field form-control bg-transparent font-12 px-2" />
						<button :disabled="!(newItemInput != null && newItemInput.length > 0)" @click="newItem" :style="{ width: '20px' }" class="btn add-btn d-flex justify-content-center align-items-center">
							<i class="material-icons font-14">add</i>
						</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	created() {
		this.selectedItem = this.value;
	},
	watch: {
		value(newValue) {
			this.selectedItem = newValue;
		},
	},
	directives: {
		"click-outside": {
			bind: function (el, binding) {
				// Define ourClickEventHandler
				const ourClickEventHandler = (event) => {
					if (!el.contains(event.target) && el !== event.target) {
						// as we are attaching an click event listern to the document (below)
						// ensure the events target is outside the element or a child of it
						binding.value(event); // before binding it
					}
				};
				// attached the handler to the element so we can remove it later easily
				el.__vueClickEventHandler__ = ourClickEventHandler;

				// attaching ourClickEventHandler to a listener on the document here
				document.addEventListener("click", ourClickEventHandler);
			},
			unbind: function (el) {
				// Remove Event Listener
				document.removeEventListener("click", el.__vueClickEventHandler__);
			},
		},
	},
	props: {
		newItemPlaceholder: {
			type: String,
			default: "New Item",
			required: false,
		},
		value: {
			type: Object,
			default: undefined,
			required: false,
		},
		items: {
			type: Array,
			default: undefined,
			required: true,
		},
		valueOption: {
			type: String,
			default: "value",
			required: false,
		},
		labelOption: {
			type: String,
			default: "name",
			required: false,
		},
		showNewItem: {
			type: Boolean,
			default: false,
			required: false,
		},
		direction: {
			type: String,
			default: "ltr",
			required: false,
		},
	},
	data() {
		return {
			showItems: false,
			dropdownWidth: "0px",
			newItemInput: undefined,
			selectedItem: undefined,
		};
	},
	name: "Tselect",
	methods: {
		close(event) {
			this.showItems = false;
			this.$refs.titleSection.classList.remove("active");
		},
		isChecked(item) {
			if (this.selectedItem !== undefined) {
				return this.selectedItem[this.valueOption] === item[this.valueOption];
			}
			return false;
		},
		selectItem(item) {
			this.selectedItem = item;
			this.$emit("input", item);
			this.showItems = false;
			this.$refs.titleSection.classList.remove("active");
		},
		newItem() {
			this.$emit("new-item", this.newItemInput);
			this.newItemInput = undefined;
		},
		openDropdown() {
			this.$refs.titleSection.classList.toggle("active");
			const width = this.$refs.titleSection.offsetWidth;
			this.showItems = !this.showItems;
			this.dropdownWidth = width + "px";
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
