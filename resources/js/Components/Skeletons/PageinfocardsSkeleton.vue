<template>
	<div class="row">
		<div class="col-md-3 py-2" v-for="i in count" :key="`skeletoon__${i}`">
			<pageinfocard-skeleton></pageinfocard-skeleton>
		</div>
	</div>
</template>

<script>
import PageinfocardSkeleton from "./PageinfocardSkeleton.vue";
export default {
	components: { PageinfocardSkeleton },
	props: ["count"],
};
</script>

<style>
</style>