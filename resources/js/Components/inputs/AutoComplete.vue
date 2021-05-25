<template>
	<div class="auto-complete-container input-group-icon">
		<input :type="type" v-bind="{ ...$attrs, ...$props }" autocomplete="off" v-on="$listeners" ref="input" v-model="input" @input="onInput" class="form-control" />
		<i class="material-icons" @click="$emit('search')">{{ icon }}</i>
		<ul v-if="suggestions.length > 0" :style="{ top: `${top}px`, left: `${left}px`, width: `${width}px` }">
			<li v-for="(suggestion, index) in suggestions" @click="suggestionClick(suggestion)" :key="`search_suggestion_${index}`">{{ suggestion }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			suggestions: [],
			input: "",

			top: 0,
			left: 0,
			width: 0,
		};
	},
	mounted() {
		this.top = this.$refs.input.getBoundingClientRect().y + this.$refs.input.getBoundingClientRect().height + (this.suggestionPosition != undefined ? this.suggestionPosition : 0);
		this.left = this.$refs.input.getBoundingClientRect().x;
		this.width = this.$refs.input.getBoundingClientRect().width;
	},
	methods: {
		suggestionClick(suggestion) {
			this.input = suggestion;
			this.suggestions = [];
		},
		onInput() {
			this.$emit("input", this.input);
			axios
				.post("/search", {
					q: this.input,
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