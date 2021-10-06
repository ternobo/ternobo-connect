<template>
	<div class="input-group-icon password-input">
		<input :type="showpassword ? 'text' : 'password'" class="form-control" v-model="password" :class="inputClass" />
		<i class="material-icons-outlined clickable text-muted" @click="showpassword = !showpassword">visibility{{ showpassword ? "_off" : "" }}</i>
	</div>
</template>

<script>
export default {
	watch: {
		password() {
			this.$emit("input", this.password);
		},
		value() {
			this.password = this.value;
		},
	},
	created() {
		this.password = this.value;
	},
	data() {
		return {
			showpassword: false,
			password: "",
		};
	},
	props: {
		value: { default: "" },
		inputClass: { default: "fill-light lg-input" },
	},
};
</script>

<style>
</style>