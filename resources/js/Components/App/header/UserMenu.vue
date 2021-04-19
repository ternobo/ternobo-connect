<template>
	<div class="usermenu card" v-if="$store.state.user != null">
		<div class="card-header px-2 d-flex bg-white border-bottom">
			<wire-link :href="'/' + this.$store.state.user.username" class="d-flex aling-items-center">
				<img class="profile-sm" :src="this.$store.state.user.profile" />
				<span class="mx-2 d-flex flex-column justify-content-center">
					<strong class="text-black"
						>{{ this.$store.state.user.name }}
						<i v-if="this.$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i>
					</strong>
					<small>{{ this.$store.state.user.short_bio }}</small>
				</span>
			</wire-link>
		</div>
		<div class="card-body p-0">
			<ul class="list-group list-group-flush">
				<li class="list-group-item headermenu-item d-flex flex-column px-2 pt-3">
					<wire-link href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </wire-link>
				</li>
				<li class="list-group-item border-top-0 headermenu-item d-flex flex-column pb-3 px-2">
					<wire-link href="/feedbacks" class="m-0"><i class="material-icons-outlined">emoji_objects</i> بازخورد ها </wire-link>
				</li>
				<li class="list-group-item headermenu-item d-flex flex-column px-2 pb-2">
					<form action="/logout" method="POST">
						<button type="submit" class="text-right bg-transparent hover-danger m-0 border-0 text-grey"><i class="material-icons">power_settings_new</i> خروج</button>
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
