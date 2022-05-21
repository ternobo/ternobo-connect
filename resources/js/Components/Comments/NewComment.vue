<template>
	<div class="sendcomment clearfix" v-if="$store.state.user != null">
		<rich-input :maxCharacter="2200" class="form-control" ref="input" :placeholder="__.get('content/comments.comment-ph')" v-model="text"></rich-input>
		<div class="d-flex w-100 mt-4 align-items-center justify-content-between">
			<div class="d-flex align-items-center">
				<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-xxxsm me-4 mb-0" imgClass="profile-xxxsm" :src="$store.state.user.profile" />
			</div>
			<loading-button @click.native="submit" :disabled="!showSubmit" :loading="loading" class="btn btn-transparent cta-text font-14">{{ __.get("content/comments.post") }}</loading-button>
		</div>
	</div>
</template>

<script>
import EmojiPicker from "../EmojiPicker/EmojiPicker.vue";
import MaterialTextAreaEmoji from "../inputs/MaterialTextAreaEmoji.vue";
import Mentionable from "../Mentionable.vue";
import RichInput from "../inputs/RichInput.vue";
export default {
	props: {
		post: {
			type: Number,
			default: undefined,
			required: true,
		},
		replyTo: {
			default: undefined,
			required: false,
		},
	},
	provide: {
		replaceMention(key, value) {
			const classes = key == "@" ? "mention-item" : "text-action tag-item";
			const element = document.createElement("span");
			element.className = classes;
			element.innerHTML = key + value;
			element.contentEditable = false;
			return element;
		},
	},
	data() {
		return {
			loading: false,
			text: null,
		};
	},
	computed: {
		showSubmit() {
			return this.text?.content?.filter((item) => item.content?.length > 0).length > 0;
		},
	},
	methods: {
		submit() {
			if (this.showSubmit) {
				this.loading = true;
				const data = {
					text: this.text,
				};
				if (this.replyTo !== undefined) {
					data.reply_to = this.replyTo;
				}
				axios
					.post(this.$APP_URL + "/posts/" + this.post + "/comments", data)
					.then((response) => {
						if (response.data.result) {
							this.text = null;
							this.$refs.input.reset();
							this.$emit("submit", response.data.comment);
						} else {
							this.handleError(response.data.errors);
						}
					})
					.catch((ex) => console.log(ex))
					.then(() => (this.loading = false));
			}
		},
	},
	name: "NewComment",
	components: {
		MaterialTextAreaEmoji,
		EmojiPicker,
		Mentionable,
		RichInput,
	},
};
</script>

<style></style>
