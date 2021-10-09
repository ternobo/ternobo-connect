<template>
	<div class="sendfeedback clearfix" v-if="$store.state.user != null">
		<div class="input-container">
			<lazy-image circle :loadingColor="skeletonOptions.profileColor" class="profile-xsm me-4 mb-0" imgClass="profile-xsm" :src="$store.state.user.profile" />
			<div class="material-input-group-btn">
				<MaterialTextArea v-model="text" input-class="w-100" maxlength="1000" class="material--xsm w-100" :placeholder="__.get('content/comments.comment-ph')" name="text"></MaterialTextArea>
				<loading-button @click.native="submit" :disabled="!showSubmit" :loading="loading" class="btn">{{ __.get("application.send") }}</loading-button>
			</div>
		</div>
	</div>
</template>

<script>
import TextareaAutosize from "../inputs/TextareaAutosize.vue";
export default {
	watch: {
		text(newValue) {
			if (newValue.length > 0) {
				this.showSubmit = true;
			} else {
				this.showSubmit = false;
			}
		},
	},
	props: {
		feedback: {
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
			showSubmit: false,
			text: "",
		};
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
					.post(this.$APP_URL + "/feedbacks/" + this.feedback + "/replies", data)
					.then((response) => {
						if (response.data.result) {
							this.text = "";

							this.$emit("submit", response.data.reply);
						} else {
							this.handleError(response.data.errors);
						}
					})
					.catch((ex) => console.log(ex))
					.then(() => (this.loading = false));
			}
		},
	},
	name: "NewFeedbackReply",
	components: {
		TextareaAutosize,
	},
};
</script>

<style></style>
