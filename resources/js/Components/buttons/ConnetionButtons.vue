<template>
<div class="d-flex" :class="{'flex-column': vertical}">
    <ConnectionButton @connected="onConnected" @disconnected="onDisconnect" :class="{'splitor-l': (!vertical && connected && followed),'splitor-b': (vertical && connected && followed)}" :style="btnStyle" :user="userId"></ConnectionButton>
    <FollowButton @followed="onFollowed" @unfollowed="onUnfollowed" :style="btnStyle" :page="pageId"></FollowButton>
</div>
</template>

<script>
import ConnectionButton from "./ConnectionButton";
import FollowButton from "./FollowButton";
export default {
    methods: {
        onFollowed() {
            this.followed = true;
        },
        onUnfollowed() {
            this.followed = false;
        },
        onConnected() {
            this.connected = true;
        },
        onDisconnect() {
            this.connected = false;
        }
    },
    components: {
        ConnectionButton,
        FollowButton
    },
    data() {
        return {
            followed: false,
            connected: false
        }
    },
    props: {
        userId: {
            default: undefined,
            required: true
        },
        pageId: {
            default: undefined,
            required: true
        },
        btnStyle: {
            type: String,
            default: ""
        },
        vertical: {
            type: Boolean,
            default: false,
        },

    },

}
</script>
