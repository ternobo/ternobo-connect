<template>
	<div class="sendcomment clearfix" v-if="$store.state.user != null">
		<div class="input-group-btn mb-0">
			<img :loadingColor="skeletonOptions.profileColor" class="profile-sm ml-3" :src="$store.state.user.profile" />
			<MaterialTextArea v-model="text" input-class="form-control autoresize" class="w-100" placeholder="نظر شما چیست؟" name="text" maxlength="2500"></MaterialTextArea>
		</div>
		<transition name="slide">
			<div class="justify-content-end mt-0" v-if="showSubmit">
				<loading-button @click.native="submit" :loading="loading" class="btn btn-primary">ارسال</loading-button>
			</div>
		</transition>
	</div>
</template>

<script>
import MaterialTextArea from "../inputs/MaterialTextArea";
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
		MaterialTextArea,
	},
};
</script>

<style></style>
