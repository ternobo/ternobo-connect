<template>
<base-layout>
    <div class="w-100">
        <h6 class="w-25 font-18 text-center pb-1" style="width: 10%!important; border-bottom:3px solid black">دعوت‌ها</h6>
        <div class="row">

        </div>
        <div class="d-flex justify-center mt-5">
            <button class="text-center btn btn-light px-5" style="margin:0 auto;">نمایش بیشتر</button>
        </div>

        <tabs>
            <tab name="شبکه من" :selected="true" class="">
                <div class="row">
                    <div class="col-md-3 mb-3" v-for="connection in connections.data" :key="connection.id">
                        <div class="card">
                            <div class="card-body">
                                <lazy-image class="w-100" style="height:30%" :src="connection.page.cover" />
                                <div>
                                    <img :src="connection.page.profile" class="rounded-circle text-center profileConenctCard">
                                </div>
                                <div class="text-center" style="margin-top:-15px">
                                    <h5>{{ connection.page.name }}</h5>
                                    <span></span>
                                </div>
                                <div class="pt-4 pb-1 d-flex align-items-center justify-content-center">
                                    <follow-button :page="connection.page.id"></follow-button>
                                    <connection-button :user='connection.page.user_id' class="mx-2"></connection-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </tab>
        </tabs>

    </div>

</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import ConnectionButton from "../Components/buttons/ConnectionButton";
import FollowButton from "../Components/buttons/FollowButton";

import Tabs from "../Components/Tabs/Tabs"
export default {
    name: "MyConnectons",
    components: {
        ConnectionButton,
        Tabs,
        FollowButton
    },
    props: {
        followers_count: {
            type: Number,
            default: undefined,
        },
        following_count: {
            type: Number,
            default: undefined,
        },
        connections_count: {
            type: Number,
            default: undefined,
        },
        connections: {
            type: Object,
            default: undefined,
        },
        page: {
            type: String,
            default: "connections"
        },
        pending_connections: {
            type: Object,
            default: undefined
        }
    },
    layout: AppLayout
}
</script>

<style scoped>
.profile-img {
    width: 4rem;
    height: 4rem;
}

.cardone {
    padding: 0.8rem 1.3rem;
}

.card-body {
    padding: 0;
}

.profileConenctCard {
    display: block;
    border: 6px solid white;
    margin: 0 auto;
    width: 70px;
    height: 70px;
    z-index: 1;
    position: relative;
    top: -2rem;
}
</style>
