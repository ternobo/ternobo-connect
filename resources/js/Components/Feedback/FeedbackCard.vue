<template>
<div class="idea-card">
    <div class="card-body">
        <div class="row">
            <div class="col-md-2">
                <div class="vote-box">
                    <div class="idea-votes">
                        {{ idea.votes }}
                    </div>
                    <button v-if="idea.status !== 'scheduled' && idea.status !== 'done'" class="btn btn-dark w-100" :class="{ voted: idea.voted }">
                        {{ idea.voted ? "ثبت شده" : "ثبت رای" }}
                    </button>
                </div>
            </div>
            <div class="col-md-10">
                <div class="idea-title mb-2">
                    <div>
                        <inertia-link :href="'/ideas/' + idea.id"><strong>{{ idea.title }}</strong>
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
                    <lazy-image :src="idea.user.profile" class="my-0 ml-2" img-class="profile-md" />
                    <inertia-link :href="'/' + idea.user.username" class="bold text-grey ml-2">
                        {{ idea.user.name }}
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
import FeedbackLabel from './FeedbackLabel';
import PersianDate from "persian-date";
export default {
    computed: {
        ideaStatus() {
            if (this.idea.status === "done") return "انجام شده";
            else if (this.idea.status === "scheduled") return "برنامه‌ریزی شده";
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
        FeedbackLabel
    }
};
</script>

<style>
</style>