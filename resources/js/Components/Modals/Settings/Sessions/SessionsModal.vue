<template>
  <b-modal v-model="showModal" hide-footer @show="onShow" title="دستگاه‌های متصل" size="md" :centered="true">
    <div v-if="loading">
      <Skeleton :count="5" :height="3"></Skeleton>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-12 pb-3" v-for="(session, index) in sessions" :key="'session_item_' + session.id">
          <session-item :session="session" @deleted="onDelete(index)"></session-item>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ModalMixin from "../../../../Mixins/Modal";
import SessionItem from "./SessionItem.vue";

import { Skeleton } from "vue-loading-skeleton";
export default {
  data() {
    return {
      loading: true,
      sessions: null,
    };
  },
  methods: {
    onDelete(index) {
      this.sessions.splice(index, 1);
    },
    onShow() {
      axios
        .post("/sessions")
        .then((response) => {
          this.sessions = response.data.sessions;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  mixins: [ModalMixin],
  components: {
    SessionItem,
    Skeleton,
  },
  name: "SessionsModal",
};
</script>

<style></style>
