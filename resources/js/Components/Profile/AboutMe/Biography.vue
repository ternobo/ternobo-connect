<template>
	<div class="card">
		<div class="card-body">
			<div class="about-me--card-title-container">
				<h2 class="about-me--card-title">بایوگرافی</h2>
				<div class="character-counter" v-if="edit">
					<span class="counter tex-dark">{{ leftCharacter }}</span>
					<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
						<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
			</div>
			<div>
				<div class="content" :class="{ 'font-12': !$root.isDesktop, 'text-superlight text-center': text == null || text.length < 1 }" v-if="!edit">
					{{ text != null && text.length > 0 ? text : "هیچ اطلاعاتی ثبت نشده" }}
				</div>
				<textarea-autosize class="form-control" v-else v-model="text"></textarea-autosize>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.text = this.value;
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
			text: null,
			leftCharacter: 2500,
			progress: 0,
		};
	},
};
</script>

<style></style>
