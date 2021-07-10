<template>
	<div class="sendcomment clearfix" v-if="$store.state.user != null">
		<div class="input-container">
			<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-xsm me-3 mb-0" imgClass="profile-xsm" :src="$store.state.user.profile" />
			<div class="material-input-group-btn">
				<MaterialTextAreaEmoji v-model="text" input-class="w-100" maxlength="1000" class="material--xsm w-100" :placeholder="__.get('content/comments.comment-ph')" name="text"></MaterialTextAreaEmoji>
				<div class="end-content">
					<emoji-picker />
					<loading-button @click.native="submit" :disabled="!showSubmit" :loading="loading" class="btn">{{ __.get("application.send") }}</loading-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import EmojiPicker from "../EmojiPicker/EmojiPicker.vue";
import MaterialTextAreaEmoji from "../inputs/MaterialTextAreaEmoji.vue";
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
	data() {
		return {
			loading: false,
			text: "",
		};
	},
	computed: {
		showSubmit() {
			return this.text.length > 0;
		},
	},
	methods: {
		submit() {
			if (this.text.length > 0) {
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
							this.text = "";

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
	},
};
</script>

<style></style>
