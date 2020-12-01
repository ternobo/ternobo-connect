<template>
  <div class="post-box" v-if="post !== undefined">
    <ReshareModal :post="post" :show.sync="showReshare"></ReshareModal>
    <EmbedCodeModal :post="post" :show.sync="showEmbed"></EmbedCodeModal>
    <new-post-modal :post="post" :show.sync="edit"></new-post-modal>

    <div class="post-header pt-0">
      <inertia-link class="publisher" :href="'/' + post.page.slug">
        <lazy-image class="profile-md mb-0" img-class="profile-md" :src="post.page.profile" />
        <div>
          <strong class="publisher--name">
            {{ post.page.name }}
          </strong>
          <span class="publisher--shortbio">
            {{ post.page.short_bio }}
          </span>
        </div>
      </inertia-link>
      <div class="actions position-relative" v-if="showMenu">
        <i class="material-icons clickale text-muted hover-dark" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
        <div>
          <post-menu :post="post" @edit="edit = true" @embed="showEmbed = true"></post-menu>
        </div>
      </div>
    </div>
    <div class="post-body" v-if="post.text != null && post.text.length > 0">
      <pre class="text">{{ post.text }}</pre>
    </div>
    <div class="post-footer">
      <div class="tagandcate" v-if="post.tags.length > 0 || post.category !== null">
        <div class="tags">
          <inertia-link v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
            {{ tag }}
          </inertia-link>
        </div>
        <a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
          <i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
        </a>
      </div>
      <div class="images" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
        <lazy-image v-if="isImage" class="m-0" alt="" :src="post.medias" />
        <video v-else :src="post.medias" autoplay controls controlslist="nodownload" style="max-width: 100%"></video>
      </div>
      <div class="actions" v-if="showMenu">
        <div class="font-08rem"></div>
        <div class="buttons">
          <i class="material-icons-outlined" @click="showReshare = true">sync</i>
          <i :class="{ 'material-icons-outlined': !openComment, 'material-icons': openComment }" v-on:click="openComment = !openComment">comment</i>
          <i class="material-icons like" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div v-if="openComment">
        <CommentsList :post="post.id"></CommentsList>
      </div>
    </transition>
  </div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import CommentsList from "../Comments/CommetsList";
import EmbedCodeModal from "../Modals/EmbedCodeModal";

// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import ReshareModal from "../Modals/ReshareModal";
import PostMenu from "../Menues/PostMenu.vue";

TimeAgo.addLocale(fa);

export default {
  data() {
    return {
      liked: false,
      bookmarked: false,
      openComment: false,
      showEmbed: false,
      showReshare: false,
      edit: false,
    };
  },
  created: function () {
    this.liked = this.post.is_liked;
    this.bookmarked = this.post.is_bookmarked;
  },
  mounted() {
    let options = {
      root: null,
      threshold: 1.0,
    };
    const $this = this;
    let observer = new IntersectionObserver(function () {
      if (!$this.seen_content.includes($this.post.id)) {
        $this.seen_content.push($this.post.id);
        $this.seen_request.push($this.post.id);
      }
    }, options);
    observer.observe(this.$el);
  },
  methods: {
    like() {
      if (this.liked) {
        this.liked = false;
      } else {
        this.liked = true;
      }
      const $this = this;
      this.$axios({
        method: "post",
        url: this.$APP_URL + "/like/" + this.post.id,
      }).catch((error) => {});
    },
    bookmark() {
      if (this.bookmarked) {
        this.bookmarked = false;
      } else {
        this.bookmarked = true;
      }
      const $this = this;
      this.$axios({
        method: "post",
        url: this.$APP_URL + "/bookmark/" + this.post.id,
      }).catch((error) => {});
    },
  },
  name: "SimplePost",
  components: {
    CommentsList: CommentsList,
    EmbedCodeModal: EmbedCodeModal,
    ReshareModal: ReshareModal,
    PostMenu,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
      required: false,
    },
    post: {
      type: Object,
      default: undefined,
      required: true,
    },
  },
  computed: {
    isImage() {
      if (this.post.media_type.startsWith("video")) {
        return false;
      }
      return true;
    },
    post_time: function () {
      const timeAgo = new TimeAgo("fa-FA");
      return timeAgo.format(Date.parse(this.post.created_at), "twitter") + " ● ";
    },
    updated_at: function () {
      if (this.post.updated_at !== null) {
        const timeAgo = new TimeAgo("fa-FA");
        return timeAgo.format(Date.parse(this.post.updated_at), "twitter") + " ● ";
      }
      return "";
    },
  },
};
</script>

<style></style>
