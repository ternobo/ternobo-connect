<template>
	<div class="modal-footer-button-group">
		<loading-button :loading="cancelLoading" :disabled="cancelDisabled" @click.native="$emit('cancel')" class="btn" :class="cancelClass">{{ cancelText }}</loading-button>
		<loading-button :loading="okLoading" :disabled="okDisabled" @click.native="$emit('ok')" class="btn btn-ok" :class="okClass">{{ okText }}</loading-button>
	</div>
</template>

<script>
export default {
	props: {
		okText: {
			default: __.get("application.save"),
		},
		cancelText: {
			default: __.get("application.cancel"),
		},
		okClass: {
			default: "btn-primary",
		},
		cancelClass: {
			default: "btn-text",
		},
		cancelLoading: {
			default: false,
		},
		okLoading: {
			default: false,
		},
		okDisabled: {
			default: false,
		},
		cancelDisabled: {
			default: false,
		},
	},
};
</script>