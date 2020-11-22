<template>
  <div class="position-relative card" v-if="$page.props.user != null">
    <new-post-modal :show.sync="showPostModal"></new-post-modal>
    <div class="card-body px-2 py-2">
      <div class="text d-flex align-items-center">
        <lazy-image img-class="profile" class="profile ml-2 mb-0" loading="lazy" :src="$page.props.user.profile" />
        <div class="w-100 clickable" style="border-radius: 15px; background: #f5f5f5; padding: 8px 12px" @click="showPostModal = true">
          <label for="postinput" class="d-none d-lg-block text-light-hover px-1 clickable m-0">
            <span class="text-muted">{{ "به چی فکر می‌کنی " + $page.props.user.first_name + "؟" }}</span>
          </label>
          <label for="postinput" v-if="!$root.isDesktop" class="d-block text-muted d-lg-none text-light-hover px-1 clickale m-0">{{ "به چی فکر می‌کنی " + $page.props.user.first_name + "؟" }}</label>
        </div>
        <div class="d-lg-flex d-none text-muted align-items-center float-left p-2 pl-0" v-if="$root.isDesktop">
          <a class="text-grey d-flex align-items-center"><i class="material-icons-outlined">crop_original</i></a>
          <span class="splitor-line"></span>
          <inertia-link href="/articles/create" class="text-grey font-12 d-flex align-items-center"><i class="material-icons-outlined">article</i></inertia-link>
        </div>
      </div>
      <div v-if="!$root.isDesktop" class="d-flex d-lg-none text-muted align-items-center justify-content-between px-2 mt-2">
        <a class="d-flex align-items-center disabled"><i class="material-icons-outlined">poll</i> نظر سنجی </a>
        <inertia-link href="/articles/create" class="text-grey d-flex align-items-center"> <i class="material-icons-outlined">article</i> نوشتن مقاله </inertia-link>
        <a class="text-grey d-flex align-items-center clickable" @click="showPostModal = true"><i class="material-icons-outlined">crop_original</i> عکس/فیلم </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPostModal: false,
    };
  },
  name: "NewPostCard",
};
</script>

<style></style>
