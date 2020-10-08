<template>
<base-layout>

        <div class="w-100">
            <h6 class="w-25 font-18 text-center pb-1" style="width: 10%!important; border-bottom:3px solid black">دعوت‌ها</h6>

            <div class="row">

                <div class="col-6 col-md-6 col-12" v-for="connectionsArry in connectionsArrys" :key="connectionsArry">

                    <b-card class="cardone">
                        <div class="row">
                            <div class="col-md-2 col-3"><img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle profile-img"></div>
                            <div class="col-6">
                                <h6>سپهر حدائق‌نیا</h6>
                                <h6>مدیرعامل و موسس ترنوبو</h6>
                                <p><span class="material-icons font-18">location_on</span>یران، بوشهر</p>
                            </div>
                            <div class="col-md-4 col-3" style="display:flex; align-items: center" v-on:click="indexOfAccerptCart(index)"><AcceptConnection></AcceptConnection></div>

                                <div class=" d-flex">
                                    <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle" style="width: 30px;height: 30px;z-index:1;">
                                    <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle" style="width: 23px;height: 23px;margin-right:-15px;margin-top:4px">
                                    <p class="font-12 mt-1 mr-3">شما و سروش هر دو آرمان رضوی زاده، فرناز فهیمی و 32 نفر دیگر را می‌شناسید</p>
                                </div>

                        </div>
                    </b-card>

                    <!-- <b-card class="my-3 cardone">
                        <div class="row">
                            <div class="col-md-2 col-3"><img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle profile-img"></div>
                            <div class="col-6">
                                <h6>سپهر حدائق‌نیا</h6>
                                <h6>مدیرعامل و موسس ترنوبو</h6>
                                <p><span class="material-icons font-18">location_on</span>یران، بوشهر</p>
                            </div>
                            <div class="col-md-4 col-3" style="display:flex; align-items: center"><ConnectionButton class="float-left w-100" ></ConnectionButton></div>

                        </div>
                    </b-card> -->


                </div>



                <!-- column 2 in desktop -->





                    <!-- <div class="col-md-6 col-12">

                        <b-card class="cardone">
                            <div class="row">
                                <div class="col-md-2 col-3"><img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle profile-img"></div>
                                <div class="col-6">
                                    <h6>سپهر حدائق‌نیا</h6>
                                    <h6>مدیرعامل و موسس ترنوبو</h6>
                                    <p><span class="material-icons font-18">location_on</span>یران، بوشهر</p>
                                </div>
                                <div class="col-md-4 col-3" style="display:flex; align-items: center"><ConnectionButton class="float-left w-100" ></ConnectionButton></div>
                            </div>
                        </b-card>

                        <b-card class="my-3 cardone">
                            <div class="row">
                                <div class="col-md-2 col-3"><img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle profile-img"></div>
                                <div class="col-6">
                                    <h6>سپهر حدائق‌نیا</h6>
                                    <h6>مدیرعامل و موسس ترنوبو</h6>
                                    <p><span class="material-icons font-18">location_on</span>یران، بوشهر</p>
                                </div>
                                <div class="col-md-4 col-3" style="display:flex; align-items: center"><ConnectionButton class="float-left w-100" ></ConnectionButton></div>

                                    <div class=" d-flex">
                                        <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle" style="width: 30px;height: 30px;z-index:1;">
                                        <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle" style="width: 23px;height: 23px;margin-right:-15px;margin-top:4px">
                                        <p class="font-12 mt-1 mr-3">شما و سروش هر دو آرمان رضوی زاده، فرناز فهیمی و 32 نفر دیگر را می‌شناسید</p>
                                    </div>

                            </div>
                        </b-card>

                    </div> -->


            </div>
            <div class="d-flex justify-center mt-5">
                <button class="text-center btn btn-light px-5" style="margin:0 auto;">نمایش بیشتر</button>
            </div>


            <tabs>
                <tab name="شبکه من" :selected="true" class="">
                    <div class="row">
                        <div class="col-md-3 col-12">
                            <b-card>
                                <img class="w-100" style="height:30%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBDfVwybzl2KxDc50PK9sISVw8fdD-1JZdZw&usqp=CAU">
                                <div>
                                    <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" class="rounded-circle text-center profileConenctCard">
                                </div>
                                <div class="text-center" style="margin-top:-15px">
                                    <h5>سپهر حدائق‌نیا</h5>
                                    <span>مدیرعامل و موسس ترنوبو</span>
                                </div>
                                <div class="pt-4 pb-1 text-center">
                                    <ConnectionButton class="" ></ConnectionButton>
                                    <ConnectionButton style="margin-right:-4px"></ConnectionButton>
                                </div>

                            </b-card>
                        </div>
                        <div class="col-md-3 col-12">
                            <b-card>
                                col-2
                            </b-card>
                        </div>
                        <div class="col-md-3 col-12">
                            <b-card>
                                col-3
                            </b-card>
                        </div>
                        <div class="col-md-3 col-12">
                            <b-card>
                                col-4
                            </b-card>
                        </div>

                    </div>
                </tab>



                <tab name="هم تیمی ها">

                </tab>

                <tab name="دنبال شده ها">

                </tab>

                <tab name="دنبال کننده ها">

                </tab>
                <tab name="متصل شده ها">

                </tab>
            </tabs>


        </div>

</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import ConnectionButton from "../Components/buttons/ConnectionButton";
import Tabs from "../Components/Tabs/Tabs";
import AcceptConnection from "../Components/buttons/AcceptConnection";
export default {
    name: "MyConnectons",
    data(){
        return{
            indexnum:Number,
            connectionsArrys:connections.data,
        }
    },
    components: {
        ConnectionButton,
        Tabs,
        AcceptConnection,
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
        },
        postapi:{
            type: Boolean,
        }
    },
    watch:{
        postapi:{
            if (postapi = true) {
                this.indexnum.splice(this.indexnum);
            }
        }
    },
    layout: AppLayout
}
</script>

<style scoped>
    .profile-img{
        width: 4rem;
        height: 4rem;
    }
    .cardone{
        padding: 0.8rem 1.3rem;
    }
    .card-body{padding: 0;}
    .profileConenctCard{
        display:block;border:6px solid white;
        margin:0 auto; width: 70px;
        height: 70px;z-index:1;
        position: relative;top: -2rem;
    }

</style>
