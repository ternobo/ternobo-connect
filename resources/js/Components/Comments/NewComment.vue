<template>
	<div class="sendcomment clearfix" v-if="$store.state.user != null">
		<div class="input-container">
			<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-sm ml-3 mb-0" imgClass="profile-sm" :src="$store.state.user.profile" />
			<MaterialTextArea v-model="text" input-class="w-100" maxlength="1000" class="material--sm w-100" placeholder="نظر شما چیست؟" name="text"></MaterialTextArea>
		</div>
		<transition name="slide">
			<loading-button @click.native="submit" v-if="showSubmit" :loading="loading" class="btn btn-primary">ارسال</loading-button>
		</transition>
	</div>
</template>

<script>
import MaterialTextArea from "../inputs/MaterialTextArea";
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
		MaterialTextArea,
	},
};
</script>

<style></style>
