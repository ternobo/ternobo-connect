<template>
	<div class="card">
		<div class="card-body">
			<div class="about-me--card-title-container mb-4">
				<h2 class="about-me--card-title">{{ __.get("user-profile.biography") }}</h2>
				<div class="character-counter" v-if="edit">
					<span class="counter tex-dark">{{ leftCharacter }}</span>
					<div class="progress me-1 mb-0" style="width: 100px; height: 5px">
						<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
			</div>
			<div>
				<div class="content" :class="{ 'text-superlight text-center': text == null || text.length < 1 }" v-if="!edit">
					<pre class="mb-0">{{ textToShow != null && textToShow.length > 0 ? textToShow : __.get("messages.no-data") }}</pre>
					<div class="show-more-text--clickable" v-if="showMore" @click="showFullText = !showFullText">{{ showFullText ? __.get("application.show-less") : __.get("application.show-more") }}</div>
				</div>
				<textarea-autosize class="form-control" :minHeight="83" maxlength="2500" v-else v-model="text"></textarea-autosize>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.text = this.value;
	},
	computed: {
		showMore() {
			return this.text != null && this.text.length > 300;
		},
		textToShow() {
			return this.showFullText || this.text.length < 300 ? this.text : this.text.split(" ").slice(0, 40).join(" ") + "...";
		},
	},
	watch: {
		text(newValue) {
			this.$emit("input", newValue);
			if (newValue != null) {
				this.progress = (newValue.length / 2500) * 100 + "%";
				this.leftCharacter = 2500 - newValue.length;
			}
		},
		value() {
			this.text = this.value;
		},
	},
	props: {
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},

		value: {
			type: String,
			default: false,
		},
	},
	data() {
		return {
			showFullText: false,

			text: null,
			leftCharacter: 2500,
			progress: 0,
		};
	},
};
</script>

<style></style>
