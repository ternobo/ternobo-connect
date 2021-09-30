<template>
	<div class="auto-complete-container input-group-icon">
		<input :type="type" v-bind="{ ...$attrs, ...$props }" autocomplete="off" ref="input" @focus="focus = true" @blur="focus = false" v-model="val" @input="onInput" class="form-control fill" />
		<i class="material-icons clickable" @click="iconClick">{{ icon }}</i>
		<i class="material-icons clickable delete-icon" @click="val = ''" v-if="val.length > 0 && !focus">close</i>
		<ul v-if="suggestions.length > 0" :style="{ top: `${top}px`, left: `${left}px`, width: `${width}px`, 'padding-top': `${paddingTop}px` }">
			<li v-for="(suggestion, index) in suggestions" @click="suggestionClick(suggestion)" :key="`search_suggestion_${index}`"><i class="material-icons-outlined">search</i>{{ suggestion }}</li>
		</ul>
	</div>
</template>

<script>
export default {
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
				this.top = this.$refs.input.getBoundingClientRect().y + this.$refs.input.getBoundingClientRect().height / 2;
				this.left = this.$refs.input.getBoundingClientRect().x;
				this.width = this.$refs.input.getBoundingClientRect().width;
				this.paddingTop = this.$refs.input.getBoundingClientRect().height / 2 + 12;
			});
		},
	},
	methods: {
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
			axios
				.post("/search", {
					q: this.val,
				})
				.then((response) => {
					if (response.data.result) {
						this.suggestions = response.data.suggestions;
					}
				});
		},
	},
	props: ["placeholder", "value", "icon", "type", "suggestionPosition"],
};
</script>

<style>
</style>