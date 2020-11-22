<template>
  <base-layout>
    <sidebar-right v-if="$root.isDesktop">
      <user-card></user-card>
    </sidebar-right>
    <div class="content-container">
      <new-post-card class="mb-3"></new-post-card>
      <div class="posts" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
        <PostCard v-for="(post, index) in postsArray" :key="'post_item_' + index" :post="post"></PostCard>
        <div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
          <loading-spinner class="image__spinner" />
        </div>
        <div v-if="next_page_url === null && !loadingPage">
          <no-content></no-content>
        </div>
      </div>
    </div>
    <sidebar-left v-if="!$root.isMobile">
      <div class="card mb-3" v-if="pages != undefined && pages != null && pages.length > 0">
        <div class="card-body px-2 py-1">
          <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
        </div>
      </div>
      <AppFooter class="sticky-aside"></AppFooter>
    </sidebar-left>
  </base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import PostCard from "../Components/PostCard/PostCard";
import NoContent from "../Components/NoContent";
import AppFooter from "../Components/App/AppFooter";

export default {
  watch: {
    posts(newValue) {
      this.postsArray = this.posts.data;
    },
  },
  created() {
    this.postsArray = this.posts.data;
    this.page = this.posts.current_page;
    this.next_page_url = this.posts.next_page_url;
  },
  data() {
    return {
      postsArray: [],
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
    posts: {
      type: Object,
      default: undefined,
    },
    pages: {
      type: Array,
      defautl: undefined,
    },
  },
  components: {
    PostCard,
    NoContent,
    AppFooter,
  },
  layout: AppLayout,
};
</script>

<style></style>
