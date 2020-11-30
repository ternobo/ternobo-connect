<template>
  <div class="idea-replies px-2">
    <new-idea-reply :idea="idea" @submit="submit"></new-idea-reply>
    <idea-reply v-for="reply in ideaReplies" v-on:deleted="ideaReplyDelete" :idea-reply="reply" :key="'idea_reply_' + reply.id"></idea-reply>
    <div class="d-flex w-100 justify-content-center align-items-center py-3" v-if="ideaRepliesLoading">
      <LoadingSpinner></LoadingSpinner>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../LoadingSpinner";
import IdeaReply from "./IdeaReply.vue";
import NewIdeaReply from "./NewIdeaReply";
export default {
  methods: {
    submit(idea) {
      this.ideaReplies.unshift(idea);
    },
    ideaReplyDelete(idea) {
      const index = this.ideaReplies.indexOf(idea);
      if (index > -1) {
        this.ideaReplies.splice(index, 1);
        this.loadMore();
      }
    },
    loadMore() {
      if (this.next_page_url !== null && !this.ideaRepliesLoading) {
        this.ideaRepliesLoading = true;
        axios
          .get(this.next_page_url)
          .then((response) => {
            const data = response.data;
            if (data.result) {
              this.next_page_url = data.data.next_page_url;
              this.ideaReplies = this.ideaReplies.concat(data.data.data);
            }
            this.ideaRepliesLoading = false;
          })
          .catch((error) => console.log(error))
          .then(() => (this.ideaRepliesLoading = false));
      }
    },
  },
  props: {
    noScroll: {
      type: Boolean,
      default: false,
      required: false,
    },
    idea: {
      type: Number,
      default: undefined,
      required: true,
    },
  },
  mounted() {
    axios
      .get(this.$APP_URL + "/ideas/" + this.idea + "/replies")
      .then((response) => {
        const data = response.data;
        if (data.result) {
          this.next_page_url = data.data.next_page_url;
          this.ideaReplies = data.data.data;
        }
        this.ideaRepliesLoading = false;
      })
      .catch((error) => console.log(error));
  },
  data() {
    return {
      ideaRepliesLoading: true,
      ideaReplies: undefined,
      next_page_url: null,
    };
  },
  name: "IdeaReplies",
  components: {
    LoadingSpinner,
    IdeaReply,
    NewIdeaReply,
    IdeaReply,
  },
};
</script>

<style></style>
