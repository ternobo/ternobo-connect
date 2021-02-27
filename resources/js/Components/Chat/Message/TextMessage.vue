<template>
	<div class="d-flex flex-column">
		<pre>{{ message.text }}</pre>
	</div>
</template>

<script>
export default {
	props: ["message"],
};
</script>
