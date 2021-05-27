<template>
	<div class="tselect" tabindex="0" :class="{ disabled: disabled, active: showItems }" :dir="direction" @blur="toggleDropdown" @focus="openDropdown" v-click-outside="close">
		<div class="tselect_title" ref="titleSection" @click="openDropdown">
			<div class="title-text">
				<span v-if="!selectedItem"> <slot></slot><span v-if="required" class="text-action">*</span> </span>
				<span v-else>
					<slot name="icon">
						<i class="material-icons verical-middle" v-if="selectedItem.hasOwnProperty('icon')">{{ selectedItem.icon }}</i>
					</slot>
					<span> {{ getItemLabel(selectedItem) }} </span>
				</span>
			</div>
			<i class="material-icons tselect_arrow">keyboard_arrow_down</i>
		</div>
		<transition name="slide">
			<div class="tselect-items" :style="{ width: dropdownWidth }" ref="itemsElement" v-if="showItems">
				<div class="items" v-if="items && items.length > 0">
					<div class="tselect_item" v-for="item in items" :class="{ active: isChecked(item) }" :key="getItemValue(item)" @click="selectItem(item)">
						<label class="tselect_item--text">
							<i class="material-icons verical-middle" v-if="item.hasOwnProperty('icon')">{{ item.icon }}</i>
							{{ getItemLabel(item) }}
						</label>
					</div>
				</div>
				<div class="items p-3" v-else>
					<span class="font-10">{{ noItem }}</span>
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
		};
	},
	name: "Tselect",
	methods: {
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
			if (!this.disabled) {
				this.$refs.titleSection.classList.add("active");
				const width = this.$refs.titleSection.offsetWidth;
				this.showItems = true;
				this.dropdownWidth = width + "px";
			}
		},
		toggleDropdown() {
			if (!this.disabled) {
				this.$refs.titleSection.classList.toggle("active");
				const width = this.$refs.titleSection.offsetWidth;
				this.showItems = !this.showItems;
				this.dropdownWidth = width + "px";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
