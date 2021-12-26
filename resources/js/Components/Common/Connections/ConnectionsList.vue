<template>
	<div class="connections-list">
		<div v-for="connection in connections" :key="'connections_' + connection.id" class="connection-item">
			<slot v-bind:connection="connection">
				<wire-link :href="'/' + connection.following.slug" class="userinfo">
					<lazy-image class="mb-0 profile-standard" imgClass="profile-standard" :src="connection.following.profile"></lazy-image>
					<div class="page-name d-flex flex-column">
						<strong> {{ connection.following.name }} <i v-if="connection.following.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
						<span class="shortbio"> {{ connection.following.short_bio }} </span>
					</div>
				</wire-link>
				<connetion-buttons :page="connection.following" :blocked="connection.following.blocked"></connetion-buttons>
			</slot>
		</div>
		<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMoreConnection"></infinite-loading>
	</div>
</template>

<script>
export default {
	props: ["connections", "next_page_url", "loadMoreConnection"],
};
</script>

<style>
</style>