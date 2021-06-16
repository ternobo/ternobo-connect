<template>
	<div class="card">
		<div class="card-body p-0 d-flex flex-column">
			<skeleton class="card-img-top page-cover page-cover-info-card" :style="{ height: '90px', width: '100%' }"></skeleton>
			<div class="d-flex align-items-center justify-content-center" style="margin-top: -50px">
				<skeleton circle :color="skeletonOptions.profileColor" :style="{ height: '100px', width: '100px' }" :styles="{ height: '100px', width: '100px' }"></skeleton>
			</div>
			<div class="userinfo-card card-body d-flex flex-column align-items-center pt-4">
				<skeleton :style="{ height: '24px', width: '150px' }" :color="skeletonOptions.profileColor"></skeleton>
			</div>
		</div>
		<div class="pt-4 d-flex justify-content-center" style="padding-bottom: 32px; padding-left: 32px; padding-right: 32px">
			<skeleton :style="{ height: '40px', width: '100%' }"></skeleton>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>