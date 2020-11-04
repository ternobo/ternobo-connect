<template>
<div class="position-relative card" v-if="$page.user!=null">
    <new-post-modal :show.sync="showPostModal"></new-post-modal>
    <div class="card-body px-2 py-2">
        <div class="text d-flex align-items-center">
            <lazy-image img-class="profile" class="profile ml-2 mb-0" loading="lazy" :src="$page.user.profile" />
            <div class="w-100 clickable" style="border-radius: 15px;background: #F5F5F5;padding: 8px 12px;" @click="showPostModal = true">
                <label for="postinput" class="d-none d-lg-block text-light-hover px-1 clickable m-0">
                    <span style="color: #707070;">{{ 'به چی فکر می‌کنی ' + $page.user.first_name + '؟' }}</span>
                </label>
                <label for="postinput" v-if="!$root.isDesktop" class="d-block d-lg-none text-light-hover px-1 clickale m-0">
                    اگر در خویش میل نوشتن سراغ کردی...
                </label>
            </div>
            <div class="d-lg-flex d-none text-muted align-items-center float-left p-2 pl-0">
                <a href="#" class="text-grey d-flex align-items-center" data-action="open" data-target="#postmediaselect" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="افزودن ویدیو / تصویر" style="
                       "><i class="material-icons-outlined font-17">crop_original</i></a>
                <span class="splitor-line"></span>
                <inertia-link href="/articles/create" data-no-instant class="text-grey font-12 d-flex align-items-center" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="افزودن مقاله"><i class="material-icons-outlined font-17">article</i></inertia-link>
            </div>
        </div>
        <div class="d-flex d-lg-none text-muted align-items-center justify-content-between px-2 mt-2">
            <a class="text-light d-flex align-items-center"><i class="material-icons-outlined font-17">poll</i> نظر سنجی
            </a>
            <inertia-link href="/articles/create" data-no-instant class="text-grey font-12 d-flex align-items-center"><i class="material-icons-outlined font-17">article</i> نوشتن مقاله</inertia-link>
            <a class="text-grey d-flex align-items-center" data-action="open" data-target="#postmediaselect"><i class="material-icons-outlined font-17">crop_original</i> عکس/فیلم </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            showPostModal: false
        }
    },
    name: "NewPostCard"
}
</script>

<style>

</style>
