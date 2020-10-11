<template>
<div class="people-sugestion d-flex justify-content-between align-items-center">
    <inertia-link class="d-flex h-100 align-items-center w-100" :href="page.slug">
        <lazy-image class="profileimage my-0 ml-2" alt="" :src="page.profile" />
        <div class="d-flex ml-2 align-items-start flex-column justify-content-center w-100">
            <span class="person-name">{{ page.name }}</span>
            <small class="text-muted person-short-bio"></small>
        </div>
    </inertia-link>
    <div class="d-flex flex-column actions" style="margin-left: 4px;width: 80px;">
        <connection-button :user="page.user_id"></connection-button>
        <follow-button :page="page.id"></follow-button>
    </div>
</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton";
import ConnectionButton from "../buttons/ConnectionButton";
export default {
    props: {
        page: {
            type: Object,
            default: undefined,
            required: true
        },

    },
    components: {
        FollowButton,
        ConnectionButton,
    },
    name: "PeopleSuggestion",

}
</script>

<style>

</style>
