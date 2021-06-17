<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
			<div class="card">
				<div class="card-body">
					<div class="invite-links-header">
						<strong class="font-16 me-1">{{ __.get("invite-links.your-invite-links") }} </strong>
						<strong class="font-14 text-muted"> {{ __.get("invite-links.remaining-links", { number: inviteLinks.filter((item) => item.valid).length }) }}</strong>
					</div>
					<div class="invite-links">
						<div class="invite" :class="{ disabled: !inviteLink.valid }" v-for="inviteLink in inviteLinks" :key="`invite_link_${inviteLink.id}`">
							<i class="material-icons-outlined invite-icon" v-if="inviteLink.valid || inviteLink.used_by == null">confirmation_number</i>
							<input class="form-control border-0" :class="{ 'text-muted': !inviteLink.valid }" v-if="inviteLink.valid || inviteLink.used_by == null" style="background: #fff !important" type="text" readonly :value="`${$APP_URL}/register?code=${inviteLink.code}`" />
							<div v-else class="used_by_user_info">
								<lazy-image :src="inviteLink.used_by.profile" class="profile-xxsm" imgClass="profile-xxsm" circle></lazy-image>
								<span>{{ inviteLink.used_by.name }}</span>
							</div>
							<button class="btn btn-action-light p-1 rounded-0 w-100" :disabled="!inviteLink.valid" style="height: 32px; border-radius: 12px !important" v-clipboard="`${$APP_URL}/register?code=${inviteLink.code}`">{{ !inviteLink.valid ? __.get("invite-links.used") : __.get("invite-links.use") }}</button>
						</div>
					</div>
					<div class="invite-description">
						<strong class="font-16">{{ __.get("invite-links.what-is-inv") }}</strong>
						<ul>
							<li v-html="__.get('invite-links.answer-1')"></li>
							<li v-html="__.get('invite-links.answer-2')"></li>
						</ul>

						<div class="mt-3">
							<strong class="font-16">{{ __.get("invite-links.attention") }}</strong>
							<ul>
								<li v-html="__.get('invite-links.answer-3')"></li>
								<li v-html="__.get('invite-links.answer-4')"></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<sidebar-left v-if="!$root.isMobile">
			<app-footer class="sticky-aside"></app-footer>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppFooter from "../Components/App/AppFooter.vue";
import AppLayout from "../Layouts/AppLayout.vue";
import BaseLayout from "../Layouts/BaseLayout.vue";
export default {
	layout: AppLayout,
	components: { BaseLayout, AppFooter },
	props: ["inviteLinks"],
};
</script>

<style>
</style>