<template>
	<div class="bottom-nav d-lg-none d-flex">
		<inertia-link :class="{ active: $root.url === '/notifications' }" href="/notifications">
			<i class="navheader-icon" :class="{ unread: $page.props.notifications_count > 0 }">{{ $root.url === "/notifications" ? "notifications" : "notifications_none" }}</i>
		</inertia-link>
		<inertia-link :class="{ active: $root.url === '/connections' }" href="/connections">
			<i class="navheader-icon">group</i>
		</inertia-link>
		<inertia-link :class="{ active: $root.url === '/feed' }" href="/feed">
			<i class="navheader-icon material-icons">home</i>
		</inertia-link>
		<inertia-link :class="{ active: $root.url === '/bookmarks' }" href="/bookmarks">
			<i class="navheader-icon">bookmarks</i>
		</inertia-link>
		<inertia-link :class="{ active: $root.url === '/' + $store.state.user.username }" :href="'/' + $store.state.user.username">
			<i class="navheader-icon">
				<img :src="$store.state.user.profile" style="width: 24px; height: 24px" class="rounded-circle" />
			</i>
		</inertia-link>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
