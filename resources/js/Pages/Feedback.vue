<template>
<base-layout>
    <div class="content-container-right">
        <div class="card mb-3 w-100">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between" style="min-height: 39px">
                    <h2 class="font-16 bold m-0">
                        ما چطور می‌توانیم کیفیت خدماتمان را در ترنوبو بهبود ببخشیم؟
                    </h2>
                    <transition name="fade">
                        <button @click="showNewIdea = true" v-if="!showNewIdea" class="btn bold btn-action rounded-pill">
                            <i class="material-icons-outlined">emoji_objects</i>
                            ثبت ایده جدید
                        </button>
                    </transition>
                </div>
                <transition name="slide">
                    <div v-if="showNewIdea">
                        <div class="d-flex align-items-center">
                            <input type="text" class="form-control bg-body border-0" placeholder="ایده‌ی خودتان را با ما به اشتراک بگذارید" max="150" maxlength="150" v-model="ideaTitle" />
                            <div class="d-flex w-25 align-items-center">
                                <span class="mx-2"> {{ 150 - ideaTitle.length }} </span>
                                <b-progress :value="(ideaTitle.length / 150) * 100" :max="100" class="w-100"></b-progress>
                            </div>
                        </div>
                        <div class="py-2">
                            <textarea-autosize v-model="ideaDescription" maxlength="2500" :min-height="230" class="form-control" placeholder="کمی بیشتری در رابطه با ایده خودتان توضیح دهید...(اختیاری)"></textarea-autosize>
                        </div>
                        <div class="d-flex align-items-center flex-row-reverse pt-3">
                            <loading-button :loading="loading" class="btn btn-primary" @click.native="saveIdea">ارسال</loading-button>
                            <button :disabled="loading" class="btn btn-transparent text-light" @click="showNewIdea = false">لغو</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="tabs">
            <ul class="default position-relative">
                <li class="is-active">
                    <a class="active">درحال رای‌گیری</a>
                </li>
                <li>
                    <a class="active">برنامه ریزی شده</a>
                </li>
                <li>
                    <a class="active">انجام شده</a>
                </li>

                <li style="left:0" class="position-absolute">
                    <a class="active"><i class="material-icons">outlined_flag</i> پیشنهادات من</a>
                </li>
            </ul>
        </div>
        <div class="ideas" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="12">
            <FeedbackCard v-for="idea in ideasArray" :key="idea.id" :idea="idea"></FeedbackCard>
            <div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
                <loading-spinner class="image__spinner" />
            </div>
        </div>
    </div>
    <sidebar-left>
        <div class="card">
            <div class="card-body px-2 py-1">
                <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
            </div>
        </div>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import FeedbackCard from "../Components/Feedback/FeedbackCard";

export default {
    created() {
        this.ideasArray = this.ideas.data;
        this.page = this.ideas.current_page;
        this.next_page_url = this.ideas.next_page_url;
    },
    methods: {
        loadMore() {
            if (this.next_page_url !== null) {
                this.loadingPage = true;
                const $this = this;
                const options = {
                    method: 'GET',
                    headers: {
                        "X-Inertia": "true"
                    },
                    url: this.next_page_url,
                };
                this.next_page_url = null;
                axios(options).then((response) => {
                    const data = (response.data.props.ideas);
                    if (data) {
                        $this.ideasArray = $this.ideasArray.concat(data.data);
                        $this.page = data.current_page;
                        $this.next_page_url = data.next_page_url;

                    }
                    $this.loadingPage = false;
                }).catch((error) => {
                    this.next_page_url = options.url;
                });
            }
        },
        saveIdea() {
            const $this = this;
            this.loading = true;
            axios.post('/ideas', {
                    title: this.ideaTitle,
                    description: this.ideaDescription
                }).then(function (response) {
                    if (response.data.result) {
                        $this.ideaDescription = null;
                        $this.ideaTitle = "";
                        $this.ideasArray.unshift(response.data.idea);
                    } else {
                        const errors = response.data.errors;
                        Object.keys(errors).forEach(function (item, index) {
                            $this.toast(errors[item][0]);
                        });
                    }
                    $this.loading = false;
                })
                .catch(function (error) {
                    console.log(error);
                    $this.toast("خطا در برقراری ارتباط");
                    $this.loading = false;
                });
        }
    },
    data() {
        return {
            showNewIdea: undefined,
            ideaTitle: "",
            ideaDescription: "",
            loading: false,
            ideasArray: [],
            page: 1,
            next_page_url: undefined,
            loadingPage: false
        };
    },
    props: {
        ideas: {
            type: Object,
            default: undefined,
        },
        pages: {
            type: Array,
            default: undefined,
        },
    },
    layout: AppLayout,
    components: {
        FeedbackCard
    }
};
</script>
