import { mapMutations } from "vuex";

export default {
    methods: {
        ...mapMutations(["showNewPostModal", "hideNewPostModal"]),
    }
}