<template>
	<div class="confetti-wrapper">
		<div :class="`confetti-${i}`" v-for="i in 300" :key="`confetti_key_item_${i}`"></div>
	</div>
</template>

<script>
export default {};
</script>