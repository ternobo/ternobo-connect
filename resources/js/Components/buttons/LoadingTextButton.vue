<template>
	<button class="btn btn-text" :class="{ loading: loading }" @click="$emit('click', $event)" :disabled="loading || disabled">
		<span :class="{ 'opacity-0': loading }">
			<slot> </slot>
		</span>
		<loading-spinner class="position-absolute" v-if="loading" :height="24" :width="24" />
	</button>
</template>

<script>
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
	components: { LoadingSpinner },
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