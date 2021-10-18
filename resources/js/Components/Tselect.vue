<template>
	<div class="tselect" tabindex="0" :class="{ disabled: disabled, active: showItems }" :dir="direction" @blur="hideDropdown" @focus="openDropdown" v-click-outside="close">
		<div class="tselect_title" :class="{ active: showItems }" ref="titleSection" @click="toggleDropdown">
			<div class="title-text" :class="{ 'w-100': search }">
				<div v-if="search" class="w-100">
					<input type="text" v-model="searchInput" @keydown="handelArrow" :placeholder="!selectedItem ? placeholder : getItemLabel(selectedItem)" @focus="openDropdown" class="form-control border-0 font-12 text-grey px-0 bg-transparent" />
				</div>
				<div v-else>
					<span v-if="!selectedItem"> <slot></slot><span v-if="required" class="text-action">*</span> </span>
					<span v-else>
						<slot name="icon" v-bind:icon="selectedItem.icon">
							<i class="material-icons verical-middle" v-if="selectedItem.hasOwnProperty('icon')">{{ selectedItem.icon }}</i>
						</slot>
						<span> {{ getItemLabel(selectedItem) }} </span>
					</span>
				</div>
			</div>
			<i class="material-icons tselect_arrow">keyboard_arrow_down</i>
		</div>
		<transition name="slide">
			<div class="tselect-items" :style="{ width: dropdownWidth }" ref="itemsElement" v-if="showItems">
				<div class="items" v-if="items && listItems.length > 0">
					<div class="tselect_item" ref="tselect_item" @keydown="handelArrow" tabindex="0" v-for="item in listItems" :class="{ active: isChecked(item) }" :key="getItemValue(item)" @keydown.enter="selectItem(item)" @click="selectItem(item)">
						<label class="tselect_item--text">
							<slot name="itemIcon" v-bind:icon="item.icon">
								<i class="material-icons verical-middle" v-if="item.hasOwnProperty('icon')">{{ item.icon }}</i>
							</slot>
							{{ getItemLabel(item) }}
						</label>
					</div>
				</div>
				<div class="items p-3" v-else>
					<span class="font-10">{{ noItem }}</span>
				</div>
				<div class="tselect_new-item" v-if="showNewItem">
					<div class="d-flex w-100 px-1">
						<input v-model="newItemInput" type="text" class="add-category-field form-control bg-transparent px-2" />
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
		showItems() {
			if (!this.showItems) {
				this.searchInput = "";
			}
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
	computed: {
		listItems() {
			return this.searchInput.length > 0 ? this.items.filter((item) => item.includes(this.searchInput)) : this.items;
		},
	},
	props: {
		placeholder: {
			type: String,
			default: "search",
			required: false,
		},
		search: {
			type: Boolean,
			default: false,
			required: false,
		},
		required: {
			type: Boolean,
			default: false,
			required: false,
		},
		noItem: {
			type: String,
			default: "موردی یافت نشد",
			required: false,
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		newItemPlaceholder: {
			type: String,
			default: "New Item",
			required: false,
		},
		value: {
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
			isOpening: false,

			searchInput: "",

			focus: false,

			focusIndex: 0,
		};
	},
	name: "Tselect",
	methods: {
		handelArrow(e) {
			console.log(e.key);
			if (e.key == "ArrowUp") {
				e.preventDefault();
				if (this.$refs["tselect_item"].length > 0 && this.focusIndex > 0) {
					this.focusIndex--;
					this.$refs["tselect_item"][this.focusIndex].focus();
				}
			} else if (e.key == "ArrowDown") {
				e.preventDefault();
				if (this.$refs["tselect_item"].length > this.focusIndex) {
					this.$refs["tselect_item"][this.focusIndex].focus();
					this.focusIndex++;
				}
			}
		},
		prevFocus(e) {},
		close() {
			this.showItems = false;
			this.$refs.titleSection.classList.remove("active");
		},
		isChecked(item) {
			if (this.selectedItem) {
				return this.getItemValue(this.selectedItem) === this.getItemValue(item);
			}
			return false;
		},
		getItemLabel(item) {
			if (typeof item == "object") {
				return item[this.labelOption];
			}
			return item;
		},
		getItemValue(item) {
			if (typeof item == "object") {
				return item[this.valueOption];
			}
			return item;
		},
		selectItem(item) {
			console.log("hi");
			this.selectedItem = item;
			this.$emit("input", item);
			this.showItems = false;
			this.$refs.titleSection.classList.remove("active");
			this.$emit("change");
		},
		newItem() {
			this.$emit("new-item", this.newItemInput);
			this.newItemInput = undefined;
		},
		hideDropdown() {
			setTimeout(() => {
				if (!this.disabled) {
					this.showItems = false;
				}
				this.focusIndex = 0;
				this.focus = false;
			}, 200);
		},
		openDropdown() {
			this.focus = true;
			if (!this.disabled) {
				this.isOpening = true;
				this.showItems = true;
				const width = this.$refs.titleSection.offsetWidth;
				this.dropdownWidth = width + "px";
				this.focusIndex = 0;
				setTimeout(() => {
					this.$nextTick(() => {
						this.isOpening = false;
					});
				}, 400);
			}
		},
		toggleDropdown() {
			if (this.focus) {
				if (!this.disabled && !this.isOpening) {
					const width = this.$refs.titleSection.offsetWidth;
					this.showItems = !this.showItems;
					this.dropdownWidth = width + "px";
					this.focusIndex = 0;
				}
			}
		},
	},
};
</script>