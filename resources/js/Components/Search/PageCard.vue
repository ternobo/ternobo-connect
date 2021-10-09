<template>
	<div class="user">
		<div class="card mb-4">
			<div class="card-body py-2">
				<div class="people-sugestion border-0 d-flex justify-content-between align-items-center bg-white">
					<wire-link class="d-flex h-100 align-items-center w-100" :href="'/' + page.slug">
						<lazy-image class="mb-0 me-2 profile-sm" imgClass="profile-sm" :src="page.profile" />
						<div class="d-flex me-2 align-items-start flex-column justify-content-center">
							<span class="person-name"> {{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </span>
							<small class="text-muted"> {{ page.short_bio }}</small>
						</div>
					</wire-link>
					<ConnetionButtons :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["page"],
};
</script>

<style>
</style>