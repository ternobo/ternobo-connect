<template>
<base-layout>
    <sidebar-left>

    </sidebar-left>
    <div class="content-container-full">
        <div class="card">
            <lazy-image style="min-height: 40px" :src="page.cover" img-class="w-100" class="card-img-top mb-0 page-cover" />
            <div class="card-body pb-0 d-flex justify-content-between pageinfo-card">
                <div class="profile profile-xlg clickable">
                    <lazy-image :src="page.profile" img-class="rounded-circle profile-xlg" />
                    <i class="material-icons">camera</i>
                </div>
                <div class="d-flex follow-buttons" v-if="page.user_id != this.$root.user.id">
                    <FollowButton :page="page.id"></FollowButton>
                    <ConnectionButton v-if="page.type === 'personal'" :user="page.user_id"></ConnectionButton>
                </div>
            </div>
            <div class="card-body d-flex flex-column page-name">
                <span class="d-flex align-items-center">
                    <strong class="font-20">
                        {{ page.name }}
                        <i v-if="page.user.is_verified === 1" class="verificationcheck mr-1 font-20">check_circle</i>
                    </strong>
                    <i v-if="page.user_id == this.$root.user.id" class="mr-2 material-icons-outlined font-16 text-muted">edit</i>
                </span>
                <small class="font-14">{{ page.short_bio }}</small>
            </div>
        </div>
    </div>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import ConnectionButton from "../../Components/buttons/ConnectionButton";
import FollowButton from "../../Components/buttons/FollowButton";

export default {
    name: "UserProfile",
    props: {
        page: {
            type: Object,
            default: undefined,
        },
    },
    components: {
        FollowButton,
        ConnectionButton,
    },
    layout: AppLayout
}
</script>

<style lang="scss" scoped>
.profile {
    margin-top: -104px;
    position: relative;
    border: 3px solid #FFF;
    background: #FFF;

    >i {
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        width: calc(100%+3px);
        height: calc(100%+3px);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF;
        border-radius: 50%;
        background: rgba($color: #191919, $alpha: 0.5);
        opacity: 0;
        transition: 0.3s all;
    }

    >figure {
        transition: 0.3s all;
    }

    &:hover {
        >figure {
            filter: blur(2px);
        }

        >i {
            opacity: 1;
        }
    }
}

.page-cover {
    min-height: 40px;
}
</style>
