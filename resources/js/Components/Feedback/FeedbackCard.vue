<template>
  <div class="idea-card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-2">
          <div class="vote-box">
            <div class="idea-votes">
              {{ votes }}
            </div>
            <loading-button :loading="loading" @click.native="voteIdea" v-if="idea.status !== 'scheduled' && idea.status !== 'done'" class="btn mt-2 btn-dark w-100" :class="{ voted: voted }">
              {{ voted ? "ثبت شده" : "ثبت رای" }}
            </loading-button>
          </div>
        </div>
        <div class="col-md-10">
          <div class="idea-title mb-2">
            <div>
              <inertia-link :href="'/ideas/' + idea.id"
                ><strong>{{ idea.title }}</strong>
              </inertia-link>
              <i class="material-icons text-grey clickale">
                {{ idea.isBookmarked ? "flag" : "outlined_flag" }}
              </i>
            </div>
            <feedback-label :type="idea.status"> {{ ideaStatus }} </feedback-label>
          </div>
          <p>
            {{ idea.description }}
          </p>
          <div class="d-flex align-items-center font-12">
            <inertia-link :href="'/' + idea.user.username" class="d-flex align-items-center ml-2">
              <lazy-image :src="idea.user.profile" class="my-0 ml-1" img-class="profile-sm" />
              <strong class="text-grey"> {{ idea.user.name }}</strong>
            </inertia-link>
            <span class="text-grey ml-1">این ایده را به اشتراک گذاشته است</span>
            <span class="mx-2">.</span>
            <strong class="text-grey">{{ createDate }}</strong>
            <span class="mx-2">.</span>
            <span class="text-grey">{{ idea.replies.length }} نظر </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedbackLabel from "./FeedbackLabel";
import PersianDate from "persian-date";
export default {
  data() {
    return {
      voted: false,
      loading: false,
      votes: 0,
    };
  },
  created() {
    this.votes = this.idea.votes;
    this.voted = this.idea.voted;
  },
  methods: {
    voteIdea() {
      this.loading = true;
      axios
        .post(this.$APP_URL + "/ideas/vote", {
          idea: this.idea.id,
        })
        .then((respone) => {
          if (respone.data.result) {
            this.voted = respone.data.vote;
            if (respone.data.vote) {
              this.votes++;
            } else {
              this.votes--;
            }
          }
        })
        .catch((error) => {
          this.$toast("خطا در برقراری ارتباط");
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    ideaStatus() {
      if (this.idea.status === "done") return "انجام شده";
      else if (this.idea.status === "scheduled") return "برنامه‌ریزی شده";
      else if (this.idea.status === "closed") return "بسته شده";
      else return "";
    },
    createDate() {
      return new PersianDate(Date.parse(this.idea.created_at)).format("D MMMM YYYY");
    },
  },
  props: {
    idea: {
      type: Object,
      default: undefined,
      required: true,
    },
  },
  components: {
    FeedbackLabel,
  },
};
</script>

<style></style>
