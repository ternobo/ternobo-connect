<template>
	<div class="auto-complete-container input-group-icon">
		<input :type="type" v-bind="{ ...$attrs, ...$props }" autocomplete="off" ref="input" v-model="val" @input="onInput" class="form-control" />
		<i class="material-icons clickable" @click="$emit('search')">{{ icon }}</i>
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
		};
	},
	mounted() {
		this.top = this.$refs.input.getBoundingClientRect().y + this.$refs.input.getBoundingClientRect().height / 2;
		this.left = this.$refs.input.getBoundingClientRect().x;
		this.width = this.$refs.input.getBoundingClientRect().width;
		this.paddingTop = this.$refs.input.getBoundingClientRect().height / 2 + 12;
	},
	methods: {
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