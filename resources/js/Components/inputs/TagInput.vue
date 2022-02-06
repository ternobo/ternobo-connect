<template>
	<div class="tag-input-container">
		<span class="font-demibold font-18"> {{ __.get("content/posts.tags") }} </span>
		<div class="d-flex tag-input mt-3" :class="{ focus: tags != null && tags != undefined && tags.length > 0 }">
			<div class="tags">
				<tag-input-item v-for="(tag, index) in tags" :tag="tag" @delete="removeTag(index)" :key="'newpost_tag_' + tag + '_' + index"></tag-input-item>
			</div>
			<input :type="type" @keyup.enter="addTag()" :disabled="tags != null && tags != null && tags.length == 3" :class="[inputClass, { invalid: invalid }]" @blur="check" v-model="input" :maxlength="maxlength" class="text-input text-input--md input" />

			<div class="autocomplete-dropdown" v-if="suggestions.length > 0 && this.input != null && this.input.length > 0">
				<ul style="left: 0; top: 48px">
					<li v-for="(tag, index) in suggestions" @click="addTag(tag.tag)" :key="'suggested_tag_' + tag.id + '_' + index">
						<img width="16" class="me-1" :src="`${assetURL(tag.community.icon)}`" v-if="tag.is_community_tag" />
						<span :class="{ communityTag: tag.is_community_tag }">{{ tag.tag }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import TagInputItem from "./TagInputItem.vue";
export default {
	components: { TagInputItem },
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
					this.suggestionsList = [];
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
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (newVal != null && newVal.length > 0) {
					axios.get("/search/tags", { params: { q: newVal } }).then((response) => {
						let data = response.data;
						if (data.data.length > 0) {
							this.suggestionsList = data.data;
						}
					});
				}
			}, 250);
		},
	},
	computed: {
		suggestions() {
			return this.suggestionsList.filter((tag) => {
				return !this.tags.includes(tag.tag);
			});
		},
	},
	data() {
		return {
			tags: [],
			suggestionsList: [],
			input: null,
			invalid: false,

			timeout: null,
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
			default: [],
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
