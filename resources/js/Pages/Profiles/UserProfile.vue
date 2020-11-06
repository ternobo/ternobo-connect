<template>
<base-layout>
    <div class="content-container-profile">
        <ProfileHeader :page="page" :can-edit="canEdit"></ProfileHeader>
        <tabs :disabled="edit" class="py-3" @selected="tabChange" :state-tab="true">
            <template slot="custom-item">
                <div class="d-flex align-items-center" v-if="canEdit && showEdit">
                    <button class="btn button-transparent rounded-circle" v-if="edit" @click="cancelEdit">
                        <i class="material-icons">close</i>
                    </button>
                    <button class="btn d-flex align-items-center justify-content-center btn-edit" @click="doEdit">
                        <span v-if="!edit">
                            ویرایش اطلاعات <i class="material-icons-outlined">edit</i>
                        </span>
                        <div class="d-flex align-items-center justify-content-center" v-else>
                            ذخیره
                            <div style="height: 14px; width: 14px; border-width: 2px" v-if="loadingSave" class="mr-2 loadingspinner"></div>
                        </div>
                    </button>
                </div>
            </template>
            <tab name="درباره من" id="home" :href="'/' + page.slug" :selected="location === 'home'">
                <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                    <loading-spinner class="image__spinner" />
                </div>
                <AboutTab v-else ref="about" :edit="edit" :page="page"></AboutTab>
            </tab>
            <tab name="فعالیت‌ها" id="activities" :href="'/' + page.slug + '/activities'" :selected="location === 'activities'">
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
            <tab name="تماس با من" id="contact" :href="'/' + page.slug + '/contact'" :selected="location === 'contact'">
                <ContactTab ref="contacts" :edit="edit" :page="page"></ContactTab>
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
import NoContent from "../../Components/NoContent";

import ProfileHeader from "../../Components/Profile/ProfileHeader";

import {
    Inertia
} from "@inertiajs/inertia";

export default {
    created() {
        this.actionsList = this.actions.data;
        this.next_page_url = this.actions.next_page_url;

        this.articlesList = this.articles.data;
        this.next_page_url = this.articles.next_page_url;

        this.current_tab = this.location;

        if (
            this.location.endsWith("articles") ||
            this.location.endsWith("activities")
        ) {
            this.showEdit = false;
        } else {
            this.showEdit = true;
        }
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

        loadTab(link) {
            if (link.endsWith("articles") || link.endsWith("activities")) {
                this.showEdit = false;
            } else {
                this.showEdit = true;
            }
            window.history.pushState({}, false, link);
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

        tabChange(link, id) {
            this.current_tab = id;
            this.loadTab(link);
        },
        doEdit() {
            if (this.edit) {
                this.loadingSave = true;
                if (this.current_tab === "contact") {
                    let data = this.$refs.contacts.getData();
                    if (data) {
                        axios
                            .post("/contacts", {
                                contacts: data,
                            })
                            .then((response) => {
                                if (response.data.result) {
                                    this.loadingSave = false;
                                    this.edit = false;
                                } else {
                                    this.handleError(response.data.errors);
                                }
                            });
                    } else {
                        this.loadingSave = false;
                        this.toast("ورودی‌ها نامعتبر است")
                    }
                } else if (this.current_tab === "home") {
                    let data = this.$refs.about.getData();
                    axios
                        .post("/save/resume", this.$refs.about.getData())
                        .then((response) => {
                            if (response.data.result) {
                                this.loadingSave = false;
                                this.edit = false;
                            } else {
                                this.handleError(response.data.errors);
                            }
                        });
                }
            } else {
                this.edit = true;
            }
        },
        cancelEdit() {
            this.loadingTab = true;
            Inertia.reload({
                only: ['page']
            });
            setTimeout(() => {
                this.loadingTab = false;
            }, 300);
            this.edit = false;
        },
    },
    data() {
        return {
            edit: false,
            about: null,
            loadingSave: false,
            current_tab: "",
            experiences: [],
            skills: [],
            categories: [],
            actionsList: [],
            articlesList: [],
            next_page_url: null,
            showEditModal: false,
            showEdit: true,
            loadingTab: false,
            loadingMore: false,
        };
    },
    computed: {
        canEdit() {
            return this.page.user_id == window.user_id;
        },
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
                    next_page_url: null,
                };
            },
        },
        articles: {
            type: Object,
            default: () => {
                return {
                    data: [],
                    next_page_url: null,
                };
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
        AboutTab: () =>
            import(
                /* webpackChunkName: "AboutMeTabProfile" */
                "../../Components/Profile/AboutMe/AboutMeTab"
            ),
        NewPostCard: () => import("../../Components/Cards/NewPostCard"),
        Categories: () => import("../../Components/Profile/Categories"),
        ActionCard: () => import("../../Components/PostCard/ActionCard"),
        NoContent,
        PostCard: () => import("../../Components/PostCard/PostCard"),
        ContactTab: () =>
            import(
                /* webpackChunkName: "ContactTabProfile" */
                "../../Components/Profile/Contact/ContactTab"
            ),
        ProfileHeader,
    },
    layout: AppLayout,
};
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
