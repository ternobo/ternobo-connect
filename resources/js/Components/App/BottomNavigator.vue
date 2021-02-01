<template>
	<div class="bottom-nav d-lg-none d-flex">
		<wire-link :class="{ active: $root.url === '/notifications' }" href="/notifications">
			<i class="navheader-icon" :class="{ unread: $store.shared.notifications_count > 0 }">{{ $root.url === "/notifications" ? "notifications" : "notifications_none" }}</i>
		</wire-link>
		<wire-link :class="{ active: $root.url === '/connections' }" href="/connections">
			<i class="navheader-icon">group</i>
		</wire-link>
		<wire-link :class="{ active: $root.url === '/feed' }" href="/feed">
			<i class="navheader-icon material-icons">home</i>
		</wire-link>
		<wire-link :class="{ active: $root.url === '/bookmarks' }" href="/bookmarks">
			<i class="navheader-icon">bookmarks</i>
		</wire-link>
		<wire-link :class="{ active: $root.url === '/' + $store.state.user.username }" :href="'/' + $store.state.user.username">
			<i class="navheader-icon">
				<img :src="$store.state.user.profile" style="width: 24px; height: 24px" class="rounded-circle" />
			</i>
		</wire-link>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
