<template>
	<div class="d-flex tag-input" :class="{ focus: tags != null && tags != undefined && tags.length > 0 }">
		<div class="tags">
			<div class="tag-item" v-for="(tag, index) in tags" @click="removeTag(index)" :key="'newpost_tag_' + tag + '_' + index">
				{{ tag }}
			</div>
		</div>
		<input :type="type" placeholder=" " @keyup.enter="addTag()" :disabled="tags != null && tags != null && tags.length == 3" :class="[inputClass, { invalid: invalid }]" @blur="check" v-model="input" :maxlength="maxlength" class="input" />
		<label class="d-flex align-items-center">
			برچسب‌ها
			<small class="max-text ms-1">حداکثر 3 برچسب</small>
		</label>

		<div class="tags-suggestion" v-if="suggestions.length > 0 && this.input != null && this.input.length > 0">
			<div class="tags flex-wrap">
				<div class="tag-item" v-for="(suggestion, index) in suggestions" @click="addTag(suggestion.text)" :key="'suggested_tag_' + suggestion + '_' + index">
					{{ suggestion.text }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		removeLastTag() {
			if (this.input == null || this.input.length < 1) {
				this.tags.pop();
				this.$emit("input", this.tags);
			}
		},
		removeTag(index) {
			this.tags.splice(index, 1);
			this.$emit("input", this.tags);
		},
		addTag(item = null) {
			if (item != null) {
				if (this.tags.indexOf(item) == -1) {
					this.tags.push(item);
					this.input = null;
					this.$emit("input", this.tags);
					this.suggestions = [];
				}
			} else if (this.input != null) {
				if (this.tags.indexOf(this.input) == -1) {
					this.tags.push(this.input);
					this.input = null;
					this.$emit("input", this.tags);
				}
			}
		},
		check() {
			if (((this.val == null || this.val.length < 1) && this.required) || this.notValid) {
				this.invalid = true;
			} else {
				this.invalid = false;
			}
		},
	},
	created() {
		this.tags = this.value;
	},
	watch: {
		value() {
			this.tags = this.value;
		},
		input(newVal) {
			if (newVal != null && newVal.length > 0) {
				axios.get(this.$APP_URL + "/gettags?term=" + newVal + "&q=" + newVal).then((response) => {
					let data = response.data;
					if (data.results.length > 0) {
						this.suggestions = data.results;
					}
				});
			}
		},
	},
	data() {
		return {
			tags: [],
			suggestions: [],
			input: null,
			invalid: false,
		};
	},
	props: {
		notValid: {
			type: Boolean,
			default: false,
			required: false,
		},
		value: {
			type: Array,
			required: false,
		},
		required: {
			type: Boolean,
			default: false,
			required: false,
		},
		type: {
			type: String,
			default: "text",
			required: false,
		},
		maxlength: {
			type: Number,
			default: 15000,
			required: false,
		},
		inputClass: {
			type: String,
			default: "",
			required: false,
		},
		placeholder: {
			type: String,
			default: undefined,
			required: false,
		},
	},
};
</script>
