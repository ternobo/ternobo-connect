<template>
<base-layout>

        <div class="w-100">
            <h6 class="w-25 font-18 text-center pb-1" style="width: 10%!important; border-bottom:3px solid black">دعوت‌ها</h6>

            <div class="row">

                <div class="col-6">

                    <b-card>
                        <div class="row">
                            <div class="col-md-2 col-12"><img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle profile-img"></div>
                            <div class="col-md-6 col-12">
                                <h6>سپهر حدائق‌نیا</h6>
                                <h6>مدیرعامل و موسس ترنوبو</h6>
                                <p><span class="material-icons font-18">location_on</span>یران، بوشهر</p>
                            </div>
                            <div class="col-md-4 col-12"><ConnectionButton class="float-left w-100"></ConnectionButton></div>
                        </div>
                    </b-card>


                </div>
                <div class="col-6">

                    <b-card>
                        <div class="row">
                            <div class="col-4">img</div>
                            <div class="col-4">wewewe</div>
                            <div class="col-4"><button class="btn">دنبال کنید </button></div>
                        </div>
                    </b-card>

                </div>


            </div>


        </div>

</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import ConnectionButton from "../Components/buttons/ConnectionButton"
export default {
    name: "MyConnectons",
    components: {
        ConnectionButton
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
    .profile-img{
        width: 70px;
        height: 70px;
    }
    .card-body{
        padding: 0.8rem 1.3rem;
    }
</style>
