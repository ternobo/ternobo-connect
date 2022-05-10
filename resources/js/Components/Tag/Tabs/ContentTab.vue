<template>
	<div class="tag-page__content-tab">
		<div class="tag-page__content-tab__header">
			<div class="tag-page__content-tab__filters">
				<search-input class="search-input" :placeholder="__.get('application.search')" />
				<div class="tag-page__content-tab__filters__trends">
					<label>{{ __.get("application.trending") }}</label>
					<div class="d-flex align-items-center">
						<tag-filter-item class="clickable sub-tag-card"></tag-filter-item>
					</div>
				</div>
			</div>
			<div class="tag-page__content-tab__sort">
				<label>{{ __.get("application.sort-by") }}</label>
				<tselect class="tselect-filter tselect-lg" :items="['Hot (Like / m)', 'Recently Published']" :value="'Recently Published'"></tselect>
			</div>
		</div>
	</div>
</template>

<script>
import SearchInput from "../../inputs/SearchInput.vue";
import TagFilterItem from "../TagFilterItem.vue";
export default {
	components: {
		SearchInput,
		TagFilterItem,
	},
};
</script>

<style>
</style>