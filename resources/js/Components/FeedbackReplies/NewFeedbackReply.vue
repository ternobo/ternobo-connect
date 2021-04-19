<template>
	<div class="sendfeedback clearfix" v-if="$store.state.user != null">
		<div class="input-group-btn mb-0">
			<img class="feedback-profile" :src="$store.state.user.profile" />
			<textarea-autosize v-model="text" class="form-control autoresize border-0 shadow" :minHeight="63" placeholder="نظر شما چیست؟" name="text" maxlength="2500"></textarea-autosize>
		</div>
		<transition name="fade">
			<div class="justify-content-end mt-3" v-if="showSubmit">
				<loading-button @click.native="submit" :loading="loading" class="btn btn-primary">ارسال</loading-button>
			</div>
		</transition>
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
