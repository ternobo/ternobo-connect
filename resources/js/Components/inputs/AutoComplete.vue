<template>
	<div class="auto-complete-container input-group-icon">
		<input :type="type" v-bind="{ ...$attrs, ...$props }" autocomplete="off" ref="input" @focus="focus = true" @blur="blur" v-model="val" @input="onInput" class="form-control" :class="inputClass" />
		<i class="material-icons clickable" @click="iconClick">{{ icon }}</i>
		<ul v-if="suggestions.length > 0 && focus" :style="{ top: `${top}px`, left: `${left}px`, width: `${width}px`, 'padding-top': `${paddingTop}px` }">
			<li v-for="(suggestion, index) in suggestions" @click="suggestionClick(suggestion)" :key="`search_suggestion_${index}`">
				<slot name="suggestionItem" v-bind:suggestion="suggestion"><i class="material-icons-outlined">search</i>{{ suggestion }}</slot>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {
			suggestions: [],
			val: "",

			top: 0,
			left: 0,
			width: 0,
			paddingTop: 0,
			focus: false,
		};
	},
	mounted() {
		this.top = this.$refs.input.getBoundingClientRect().y + this.$refs.input.getBoundingClientRect().height / 2;
		this.left = this.$refs.input.getBoundingClientRect().x;
		this.width = this.$refs.input.getBoundingClientRect().width;
		this.paddingTop = this.$refs.input.getBoundingClientRect().height / 2 + 12;
		this.val = this.value;
	},
	watch: {
		suggestions() {
			this.$nextTick(() => {
				this.top = this.$refs.input.getBoundingClientRect().y + this.$refs.input.getBoundingClientRect().height / 2 + this.suggestionPosition?.y;
				this.left = this.$refs.input.getBoundingClientRect().x + this.suggestionPosition?.x;
				this.width = this.$refs.input.getBoundingClientRect().width;
				this.paddingTop = this.$refs.input.getBoundingClientRect().height / 2 + 12;
			});
		},
	},
	methods: {
		blur() {
			setTimeout(() => {
				this.focus = false;
			}, 400);
		},
		iconClick() {
			if (this.val.length > 0) {
				this.$emit("search");
			} else {
				this.$refs.input.focus();
			}
		},
		suggestionClick(suggestion) {
			this.val = suggestion;
			this.suggestions = [];
			this.$emit("input", this.val);
			setTimeout(() => {
				this.$emit("suggestionclick", suggestion);
			}, 500);
		},
		onInput() {
			this.$emit("input", this.val);
			if (this.val.length > 0) {
				axios
					.post(this.endpoint, {
						q: this.val,
					})
					.then((response) => {
						if (response.data.result) {
							this.suggestions = response.data.suggestions;
						}
					});
			}
		},
	},
	props: {
		inputClass: {
			default: "fill",
		},
		value: {},
		icon: {
			default: "",
		},
		type: {
			default: "text",
		},
		suggestionPosition: {
			default: () => {
				return { x: 0, y: 0 };
			},
		},
		endpoint: {
			default: "/search",
		},
	},
};
</script>

<style>
</style>