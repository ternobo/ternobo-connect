<template>
	<button class="loading-button" :class="{ loading: loading }" @click="$emit('click', $event)" :disabled="loading || disabled">
		<span :class="{ 'opacity-0': loading }">
			<slot> </slot>
		</span>
	</button>
</template>

<script>
export default {
	name: "LoadingButton",
	props: {
		loading: {
			type: Boolean,
			default: false,
			required: false,
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
};
</script>