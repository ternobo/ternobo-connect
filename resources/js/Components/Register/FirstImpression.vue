<template>
	<div class="login-content">
		<div class="about-ternobo" v-if="$root.isDesktop">
			<h1 class="font-weight-bold mb-32px font-20">{{ __.get("landing.welcome") }}</h1>
			<p class="line-height-32px" :style="{ marginBottom: '40px' }">
				{{ __.get("landing.about-ternobo") }}
			</p>
			<img class="position-absolute" src="/images/register-illustration.svg" width="750" v-if="appDirection == 'rtl'" />
			<img class="position-absolute" src="/images/Illustration_register_ltr.svg" width="750" v-else />
		</div>
		<div class="login-form">
			<div class="login-form w-100">
				<div class="login-card card w-100">
					<div class="card-body">
						<label class="font-weight-bold font-20 mb-40px text-dark">{{ __.get("register.invited-by", { fname: user.first_name }) }}</label>
						<div>
							<lazy-image :src="user.profile" imgClass="profile-md" class="profile-md mb-4" />
							<strong class="font-demibold font-20px">{{ user.name }}</strong>
						</div>

						<div class="login-button-container h-auto">
							<button class="btn btn-primary" @click="$emit('next')">{{ __.get("register.start-signup") }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["user"],
};
</script>

<style>
</style>