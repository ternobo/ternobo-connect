<template>
<base-layout>
    <UserInfoModal :user="page.user" :show.sync="showEditModal"></UserInfoModal>
    <div class="content-container-profile">
        <div class="card">
            <ProfileCover :canChange="page.user_id == this.$root.user.id" :src="page.cover"></ProfileCover>
            <div class="card-body pb-0 d-flex justify-content-between pageinfo-card">
                <ProfileImage :canChange="page.user_id == this.$root.user.id" :src="page.profile"></ProfileImage>
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
                    <i v-if="page.user_id == this.$root.user.id" class="mr-2 material-icons-outlined font-16 text-muted" @click="showEditModal=true">edit</i>
                </span>
                <small class="font-14">{{ page.short_bio }}</small>
            </div>
        </div>

        <tabs class="py-3" @selected="tabChange" :state-tab='true'>
            <template slot="custom-item" v-if="canEdit">
                <div>
                    <button class="btn button-transparent rounded-circle" v-if="edit" @click="cancelEdit"><i class="material-icons">close</i></button>
                    <button class="btn btn-edit" v-html="edit ? 'ذخیره' : 'ویرایش اطلاعات <i class=\'material-icons-outlined\'>edit</i>'" @click="doEdit"></button>
                </div>
            </template>
            <tab name="درباره من" :href="'/'+page.slug" :selected="location==='about' || location==='home'">
                <AboutTab :edit="edit" :page="page"></AboutTab>
            </tab>
            <tab name="فعالیت‌ها" :href="'/'+page.slug+'/activities'" :selected="location === 'activities'">
                <div class="row" v-if="!loadingTab" v-infinite-scroll="loadMore" infinite-scroll-distance="5">
                    <div class="col-md-4">
                        <Categories :categories="page.categories" :location="location" :slug="page.slug" :article="false"></Categories>
                    </div>
                    <div class="col-md-8">
                        <NewPostCard v-if="canEdit"></NewPostCard>
                        <div class="posts pt-3">
                            <ActionCard v-for="action in actionsList" :page="page" :action="action" :key="action.id"></ActionCard>
                        </div>
                        <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                            <loading-spinner class="image__spinner" />
                        </div>
                        <div v-if="next_page_url === null && !loadingTab">
                            <no-content></no-content>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                    <loading-spinner class="image__spinner" />
                </div>

            </tab>
            <tab name="مقالات" :href="'/'+page.slug+'/articles'" :selected="location==='articles'">
                <div class="row" v-if="!loadingTab" v-infinite-scroll="loadMore" infinite-scroll-distance="5">
                    <div class="col-md-4">
                        <Categories :categories="page.categories" :location="location" :slug="page.slug" :article="true"></Categories>
                    </div>
                    <div class="col-md-8">
                        <div class="card new-post" v-if="canEdit">
                            <inertia-link href="/articles/create" class="text p-2">
                                <lazy-image class="ml-2" loading="lazy" :src="page.profile" />
                                <div class="textarea d-flex align-items-center">
                                    <span class="text-light-hover d-flex align-items-center">
                                        <i class="material-icons-outlined">post_add</i> نوشتن مقاله جدید
                                    </span>
                                </div>
                            </inertia-link>
                        </div>
                        <div class="posts pt-3">
                            <PostCard v-for="article in articlesList" :page="page" :post="article" :key="article.id"></PostCard>
                        </div>
                        <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                            <loading-spinner class="image__spinner" />
                        </div>
                        <div v-if="next_page_url === null && !loadingTab">
                            <no-content></no-content>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                    <loading-spinner class="image__spinner" />
                </div>
            </tab>
            <tab name="تماس با من" :href="'/'+page.slug+'/contact'" :selected="location==='contact'">
                <ContactTab :edit="edit" :page="page"></ContactTab>
            </tab>
        </tabs>
    </div>
    <sidebar-left>
        <div class="card mb-3" v-if="pages.length > 0">
            <div class="card-body px-2 py-1">
                <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
            </div>
        </div>
        <AppFooter class="sticky-aside"></AppFooter>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import ProfileImage from "../../Components/Profile/ProfileImage";
import ProfileCover from "../../Components/Profile/ProfileCover";
import NoContent from "../../Components/NoContent";

import ConnectionButton from "../../Components/buttons/ConnectionButton";
import FollowButton from "../../Components/buttons/FollowButton";
import {
    Inertia
} from '@inertiajs/inertia';

export default {
    created() {
        this.actionsList = this.actions.data;
        this.next_page_url = this.actions.next_page_url;

        this.articlesList = this.articles.data;
        this.next_page_url = this.articles.next_page_url;
    },
    methods: {
        loadMore() {
            if (!this.loadingMore && this.next_page_url !== null) {
                const options = {
                    method: "GET",
                    headers: {
                        "X-Inertia": "true",
                    },
                    url: this.next_page_url,
                };
                this.loadingMore = true;
                axios(options)
                    .then((response) => {
                        const data = response.data.props;
                        if (data) {
                            if (data.actions) {
                                this.actionsList = data.actions.data;
                                this.next_page_url = data.actions.next_page_url;
                            }
                            if (data.articles) {
                                this.articlesList = data.articles.data;
                                this.next_page_url = data.articles.next_page_url;
                            }

                        }
                    })
                    .catch((error) => {
                        this.next_page_url = options.url;
                    })
                    .then(() => {
                        this.loadingMore = false;
                    });
            }
        },
        tabChange(link) {
            Inertia.visit(link, {
                preserveState: true
            });
            const options = {
                method: "GET",
                headers: {
                    "X-Inertia": "true",
                },
                url: link,
            };
            this.loadingTab = true;
            axios(options)
                .then((response) => {
                    const data = response.data.props;
                    if (data) {
                        if (data.actions) {
                            this.actionsList = data.actions.data;
                            this.next_page_url = data.actions.next_page_url;
                        }
                        if (data.articles) {
                            this.articlesList = data.articles.data;
                            this.next_page_url = data.articles.next_page_url;
                        }

                    }
                })
                .catch((error) => {
                    this.next_page_url = options.url;
                })
                .then(() => {
                    this.loadingTab = false;
                });
        },
        doEdit() {
            this.edit = !this.edit;
        },
        cancelEdit() {

        }
    },
    data() {
        return {
            edit: false,
            about: null,
            experiences: [],
            skills: [],
            categories: [],
            actionsList: [],
            articlesList: [],
            next_page_url: null,
            showEditModal: false,
            loadingTab: false,
            loadingMore: false
        }
    },
    computed: {
        canEdit() {
            return this.page.user_id == this.$root.user.id;
        }
    },
    name: "UserProfile",
    props: {
        pages: {
            type: Array,
            default: [],
        },
        page: {
            type: Object,
            default: undefined,
        },
        actions: {
            type: Object,
            default: () => {
                return {
                    data: [],
                    next_page_url: null
                }
            },
        },
        articles: {
            type: Object,
            default: () => {
                return {
                    data: [],
                    next_page_url: null
                }
            },
        },
        location: {
            type: String,
            default: "home",
        },
    },
    /**

     */
    components: {
        AboutTab: () => import( /* webpackChunkName: "AboutMeTabProfile" */ "../../Components/Profile/AboutMe/AboutMeTab"),
        FollowButton,
        ConnectionButton,
        ProfileImage,
        ProfileCover,
        NewPostCard: () => import("../../Components/Cards/NewPostCard"),
        Categories: () => import("../../Components/Profile/Categories"),
        UserInfoModal: () => import("../../Components/Modals/UserInfoModal"),
        ActionCard: () => import("../../Components/PostCard/ActionCard"),
        NoContent,
        PostCard: () => import("../../Components/PostCard/PostCard"),
        ContactTab: () => import( /* webpackChunkName: "ContactTabProfile" */ "../../Components/Profile/Contact/ContactTab")
    },
    layout: AppLayout
}
</script>

<style>
.tabs ul li {
    width: auto;
}
</style>

<style lang="scss" scoped>
.page-cover {
    min-height: 40px;
}
</style>
