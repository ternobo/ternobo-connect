<template>
	<div class="dropdown b-dropdown btn-group">
		<button class="btn btn-dropdown"><slot name="button"></slot></button>
		<ul role="menu" tabindex="-1" class="dropdown-menu">
			<li role="presentation">
				<a role="menuitem" href="#" target="_self" class="dropdown-item">
					<i class="material-icons text-dark">link</i>
					<strong>رونوشت پیوند این محتوا</strong>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>