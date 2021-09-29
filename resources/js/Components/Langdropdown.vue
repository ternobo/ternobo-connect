<template>
	<div class="tselect lang-select" :dir="direction" v-click-outside="close">
		<div class="tselect_title rounded-0" ref="titleSection" @click="openDropdown">
			<div class="title-text w-100">
				<div class="d-flex align-items-center">
					<img :src="value.icon" class="ms-2" style="width: 24px; height: 24px" />
					<span>{{ value.label }}</span>
				</div>
			</div>
			<i class="material-icons tselect_arrow">keyboard_arrow_down</i>
		</div>
		<transition name="slide">
			<div class="tselect-items" ref="itemsElement" v-if="showItems">
				<div class="items">
					<language-link class="tselect_item w-100" lang="en">
						<div class="d-flex justify-content-between align-items-center w-100">
							<span class="font-14">
								<span>English</span>
								<span class="text-light">US</span>
							</span>
							<img src="/emoji/72x72/1f1fa-1f1f8.png" style="width: 24px; height: 24px" />
						</div>
					</language-link>
					<language-link class="tselect_item w-100" lang="fa">
						<div class="d-flex justify-content-between align-items-center w-100">
							<span class="font-14">
								<span>فارسی</span>
							</span>
							<img src="/images/iran-flag.png" style="width: 24px; height: 24px" />
						</div>
					</language-link>
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
		direction: {
			type: String,
			default: "ltr",
			required: false,
		},
		value: {
			required: false,
		},
	},
	data() {
		return {
			showItems: false,
		};
	},
	methods: {
		close(event) {
			this.showItems = false;
			this.$refs.titleSection.classList.remove("active");
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
