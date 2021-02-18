<template>
	<div class="d-flex flex-column">
		<strong>{{ message.sender.name }}</strong>
		<span>
			{{ message.text }}
		</span>
	</div>
</template>

<script>
export default {
	props: ["message"],
};
</script>
