<template>
  <div class="mb-3">
    <div class="idea-reply" v-if="!deleted">
      <div class="idea-reply-header">
        <inertia-link :href="'/' + ideaReply.user.username" class="d-flex align-items-center">
          <img :src="ideaReply.user.profile" class="profile-sm" />
          <div class="pr-3 pagedetail">
            <span class="name">
              <strong>
                {{ ideaReply.user.name }}
              </strong>
            </span>
          </div>
        </inertia-link>
        <div class="d-flex align-items-center">
          <span class="font-10 text-muted">{{ ideaReply_time }}</span>
          <div>
            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content class="p-0">
                <i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
              </template>
              <b-dropdown-item>
                <div class="d-flex align-items-center">
                  <i class="material-icons ml-2 text-dark">link</i>
                  <div>
                    <div>
                      <strong> گزارش تخلف </strong>
                    </div>
                    <small class="text-muted"> این دیدگاه در تضاد با قوانین ترنوبو است </small>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item class="hover-danger" @click="deleteComment" v-if="checkUser(ideaReply.user_id)">
                <div class="d-flex hover-danger align-items-center">
                  <i class="material-icons-outlined ml-2">delete_sweep</i>
                  <div>
                    <div>
                      <strong> حذف </strong>
                    </div>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
      <div class="idea-reply-body">
        <div v-html="ideaReply.text" style="unicode-bidi: plaintext; width: 100% !important; display: block; text-align: justify"></div>
      </div>
    </div>
    <div class="w-100 d-flex align-content-center justify-content-between pt-2">
      <span v-html="ideaReply.liked_by"></span>
      <div class="actions">
        <i @click="loadReplies" :class="{ 'material-icons-outlined': !showReplies, 'material-icons': showReplies }" class="hover-dark clickable"> insert_comment </i>
        <i @click="likeComment" class="hover-danger clickable material-icons" :class="{ 'text-danger': liked }">
          {{ liked ? "favorite" : "favorite_border" }}
        </i>
      </div>
    </div>
    <transition name="slide">
      <div class="idea-reply-replies" v-if="showReplies">
        <new-idea-reply @submit="submit" :idea="ideaReply.idea_id" :reply-to="ideaReply.id"></new-idea-reply>
        <div class="border-right pr-3" style="border-color: #212121 !important" v-if="replyTo === undefined">
          <idea-reply v-on:replied="submit" :reply-to="ideaReply.id" v-for="reply in replies" v-on:deleted="ideaReplyDelete" :idea-reply="reply" :key="reply.id"></idea-reply>
          <div class="w-100 d-flex p-2 justify-content-center align-items-center" v-if="repliesLoading">
            <loading-spinner></loading-spinner>
          </div>
        </div>
        <div class="w-100 d-flex align-items-center justify-content-center p-2">
          <loading-button v-if="next_page_url !== null" @click.native="loadMore" class="btn btn-outline-dark" :loading="loadingMore">بارگیری بیشتر</loading-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NewIdeaReply from "./NewIdeaReply";
import TimeAgo from "javascript-time-ago";
import LoadingSpinner from "../LoadingSpinner";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
TimeAgo.addLocale(fa);
export default {
  mounted() {
    this.liked = this.ideaReply.is_liked;
  },
  data() {
    return {
      deleted: false,
      showReply: false,
      replies: [],
      repliesLoading: true,
      showReplies: false,
      next_page_url: null,
      loadingMore: false,
      liked: false,
    };
  },
  methods: {
    commentDelete() {
      const index = this.replies.indexOf(comment);
      if (index > -1) {
        this.replies.splice(index, 1);
        this.loadMore();
      }
    },
    likeComment() {
      if (this.liked) {
        this.liked = false;
      } else {
        this.liked = true;
      }
      axios.post(this.$APP_URL + "/idea-replies/" + this.ideaReply.id + "/like");
    },
    loadReplies() {
      this.showReplies = !this.showReplies;
      if (this.showReplies) {
        this.repliesLoading = true;
        axios
          .post(this.$APP_URL + "/idea-replies/" + this.ideaReply.id + "/replies")
          .then((response) => {
            const data = response.data;
            if (data.result) {
              this.next_page_url = data.data.next_page_url;
              this.replies = data.data.data;
            }
            this.repliesLoading = false;
          })
          .catch((error) => console.log(error))
          .then(() => (this.repliesLoading = false));
      }
    },
    deleteComment() {
      this.deleted = true;
      axios
        .delete("/idea-replies/" + this.ideaReply.idea_id + "/replies/" + this.ideaReply.id)
        .then((response) => {
          this.$emit("deleted", this.ideaReply);
        })
        .catch((error) => console.log(error));
    },
    loadMore() {
      if (this.next_page_url !== null && !this.loadingMore) {
        this.loadingMore = true;
        axios
          .get(this.next_page_url)
          .then((response) => {
            const data = response.data;
            if (data.result) {
              this.next_page_url = data.data.next_page_url;
              this.replies = this.replies.concat(data.data.data);
            }
            this.loadingMore = false;
          })
          .catch((error) => console.log(error))
          .then(() => (this.loadingMore = false));
      }
    },
    submit(comment) {
      if (this.replyTo !== undefined) {
        this.$emit("replied", comment);
      } else {
        this.replies.unshift(comment);
        setTimeout(() => {
          const theComment = this.$el;
          this.$parent.$el.scrollTop += theComment.getBoundingClientRect().top;
        }, 300);
      }
    },
  },
  computed: {
    ideaReply_time() {
      const timeAgo = new TimeAgo("fa-FA");
      return timeAgo.format(Date.parse(this.ideaReply.created_at), "twitter");
    },
  },
  components: {
    NewIdeaReply,
    LoadingSpinner,
    NewIdeaReply,
  },
  props: {
    replyTo: {
      default: undefined,
      required: false,
    },
    ideaReply: {
      type: Object,
      default: undefined,
      required: true,
    },
  },
  name: "IdeaReply",
};
</script>

<style lang="scss" scoped>
.comment {
  .pagedetail {
    display: flex;
    flex-direction: column;
  }
}
</style>
