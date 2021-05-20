<template>
	<div class="usermenu card" v-if="$store.state.user != null">
		<div class="card-header">
			<wire-link :href="'/' + this.$store.state.user.username" class="d-flex aling-items-center">
				<img class="profile-xsm" imgClass="profile-xsm" :src="this.$store.state.user.profile" />
				<span class="userinfo">
					<strong class="user-name">
						{{ this.$store.state.user.name }}
						<i v-if="this.$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i>
					</strong>
					<small class="user-short-bio">{{ this.$store.state.user.short_bio }}</small>
				</span>
			</wire-link>
		</div>
		<div class="card-body p-0">
			<ul class="list-group list-group-flush">
				<wire-link href="/donations" as="li" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">savings</i> حمایت‌ها</a>
				</wire-link>
				<wire-link href="/settings" as="li" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </a>
				</wire-link>
				<wire-link href="/feedbacks" as="li" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">emoji_objects</i> بازخورد ها </a>
				</wire-link>
				<li class="list-group-item border-top headermenu-item">
					<form action="/logout" method="POST">
						<button type="submit" class="text-right bg-transparent hover-danger m-0 p-0 border-0 text-grey"><i class="material-icons">power_settings_new</i> خروج</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "UserMenu",
};
</script>
