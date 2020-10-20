<template>
<base-layout>
    <sidebar-right>
        <user-card></user-card>
    </sidebar-right>
    <div class="content-container">
        <div class="card">
            <div class="card-body py-1">
    
            </div>
        </div>
    </div>
    <sidebar-left>
        <app-footer></app-footer>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import PostCard from "../Components/PostCard/PostCard";
import NoContent from "../Components/NoContent";

export default {
    watch: {
        posts(newValue) {
            this.notificationsArray = this.posts.data;
        }
    },
    created() {
        this.postsArray = this.notifications.data;
        this.page = this.notifications.current_page;
        this.next_page_url = this.notifications.next_page_url;
    },
    data() {
        return {
            notificationsArray: [],
            page: 1,
            next_page_url: undefined,
            loadingPage: false,
        };
    },
    methods: {
        loadMore() {
            if (!this.loadingPage && this.next_page_url !== null) {
                const $this = this;
                const options = {
                    method: "GET",
                    headers: {
                        "X-Inertia": "true",
                    },
                    url: this.next_page_url,
                };
                this.loadingPage = true;
                axios(options)
                    .then((response) => {
                        const data = response.data.props.posts;
                        if (data) {
                            $this.postsArray = $this.postsArray.concat(data.data);
                            $this.page = data.current_page;
                            $this.next_page_url = data.next_page_url;
                        }
                    })
                    .catch((error) => {
                        this.next_page_url = options.url;
                    })
                    .then(() => {
                        $this.loadingPage = false;
                    });
            }
        },
    },
    name: "Feed",
    props: {
        notifications: {
            type: Object,
            default: undefined,
        },
        pages: {
            type: Array,
            defautl: undefined,
        },
    },
    components: {
        NoContent,
    },
    layout: AppLayout,
};
</script>

<style>
</style>
