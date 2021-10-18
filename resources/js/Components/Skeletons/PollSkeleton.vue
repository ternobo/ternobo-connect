<template>
	<div class="poll-viewer">
		<h2 class="font-20 mb-6 line-height-34px">
			<skeleton width="120px" height="24px"></skeleton>
		</h2>
		<ul class="poll-options--list">
			<li>
				<skeleton class="w-100" height="2.75rem"></skeleton>
			</li>
			<li>
				<skeleton class="w-100" height="2.75rem"></skeleton>
			</li>
		</ul>
	</div>
</template>

<script>
import Skeleton from "../Skeleton/Skeleton.vue";
export default {
	components: { Skeleton },
};
</script>

<style>
</style>