<template>
	<div class="login-content">
		<div class="about-ternobo">
			<h1 class="font-weight-bold mb-42px font-20">{{ __.get("landing.welcome") }}</h1>
			<p class="line-height-32px" :style="{ marginBottom: '40px' }">
				{{ __.get("landing.about-ternobo") }}
			</p>
			<img class="position-absolute" src="/images/register-illustration.svg" width="450" v-if="$root.isDesktop" />
		</div>
		<div class="login-form">
			<div class="login-form w-100">
				<div class="login-card card w-100">
					<div class="card-body">
						<label class="font-weight-bold font-20 mb-40px text-dark">{{ __.get("register.invited-by", { fname: user.first_name }) }}</label>
						<div class="d-flex flex-column align-items-center">
							<lazy-image :src="user.profile" imgClass="profile-md" class="profile-md mb-4" />
							<strong class="font-demibold font-20px">{{ user.name }}</strong>
						</div>

						<div class="login-button-container h-auto">
							<button class="btn btn-primary" @click="$emit('next')">{{ __.get("application.get-started") }}</button>
						</div>
					</div>
				</div>
			</div>
			<img src="/images/register-illustration.svg" class="mt-7" width="450" v-if="!$root.isDesktop" />
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