<template>
	<div class="d-flex flex-column">
		<strong>{{ message.sender.name }}</strong>
		<pre>{{ message.text }}</pre>
	</div>
</template>

<script>
export default {
	props: ["message"],
};
</script>
