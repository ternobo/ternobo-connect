<template>
	<div class="card p-3">
		<div class="d-flex flex-wrap justify-content-between">
			<div class="d-flex flex-wrap user-detail">
				<lazy-image img-class="profile-md" :loadingColor="skeletonOptions.profileColor" :src="user.profile" />
				<div class="ms-2 d-flex flex-column" style="max-width: 200px">
					<strong>{{ user.name }} <i v-if="user.is_verified" class="verificationcheck">check_circle</i></strong>
					<small>{{ user.short_bio }}</small>
				</div>
			</div>
			<div class="buttons" style="align-self: center">
				<DeleteConnection @delete="onDelete" :connection-id="connectionId"></DeleteConnection>
				<AcceptConnection @accept="onAccept" :connection-id="connectionId"></AcceptConnection>
			</div>
		</div>
	</div>
</template>

<script>
import AcceptConnection from "../buttons/AcceptConnection";
import DeleteConnection from "../buttons/DeleteConnection";
export default {
	methods: {
		onDelete() {
			this.$el.remove();
		},
		onAccept() {
			this.$emit("accpeted");
			this.$el.parentElement.remove();
		},
	},
	props: {
		user: {
			type: Object,
			default: undefined,
			required: true,
		},
		connectionId: {
			default: undefined,
			required: true,
		},
	},
	components: {
		DeleteConnection,
		AcceptConnection,
	},
};
</script>

<style>
</style>
