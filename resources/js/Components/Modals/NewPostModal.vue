<template>
<b-modal v-model='showModal' hide-footer size="lg" title="تولید محتوای تازه" :centered="true">
    <div action="/posts" data-ajax method="POST" data-reload="1" enctype="multipart/form-data" class="w-100">
        <div class="new-post position-relative">
            <div class="selections">
                <div class="userinfo col-lg-4 p-0">
                    <lazy-image :src="$page.user.profile" class="profile m-0" loading="lazy" />
                    <strong>{{ $page.user.name }}</strong>
                </div>
                <div class="categoryandtype">
                    <div class="mx-1 col-lg-5 p-0">
                        <tselect :items="showTypesItems" :showNewItem="false" v-model="showType" direction='rtl'></tselect>
                    </div>

                    <div class="ml-1 p-0 col-lg-7">
                        <tselect :items="$page.user.categories" :showNewItem="true" v-model="category" direction='rtl'>
                            دسته‌بندی
                        </tselect>
                    </div>
                </div>
            </div>
            <div class="text px-0">
                <div class="textarea">
                    <textarea-autosize data-mention data-action="/slugsearch" :min-height="201" v-model="text" rows="8" placeholder="اگر در خویش میل نوشتن سراغ کردی باید سه چیز در تو باشد. شناختی، هنری و سحری (جبران خلیل جبران)" class="w-100 autoresize autodirection" maxlength="2500"></textarea-autosize>
                    <div class="character-counter">
                        <span class="counter tex-dark">{{ leftCharacter }}</span>
                        <div class="progress ml-1 mb-0" style="width: 100px;height: 5px;">
                            <div class="progress-bar" role="progressbar" :style="{ width : txtlen }" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mediatag">
                <div id='mediaPreview' class="position-relative">

                </div>
                <div class="tags pt-2 pr-0 pb-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="w-100 d-flex flex-column">
                            <span class="font-18 bold">برچسب‌ها</span>
                            <span class="text-muted bold font-11">حداکثر ۳ برچست</span>
                        </div>

                    </div>
                    <div class="d-flex align-items-center">
                        <v-select class="w-100" dir="rtl" taggable multiple push-tags>
                            <template #open-indicator>
                                <span></span>
                            </template>
                        </v-select>
                        <div class="d-flex align-items-center">
                            <input type="file" class="d-none" data-preview name="media" checked="d-none" data-options="#postimage-options" data-previewbox="#mediaPreview" id="postmediaselect">
                            <a class="text-grey d-flex align-items-center clickale" data-action="open" data-target="#postmediaselect" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="افزودن ویدیو / تصویر"><i class="material-icons-outlined text-grey">crop_original</i></a>
                            <span class="splitor-line mx-2"></span>
                            <inertia-link href="/articles/create" class="text-grey d-flex align-items-center font-12" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="افزودن مقاله"><i class="material-icons-outlined text-grey">article</i></inertia-link>
                        </div>

                    </div>
                </div>
            </div>
            <div class="media pl-2">
                <input type="hidden" name="sizes" value="" id="postimage-options" />
            </div>
            <div class="submit position-relative">
                <button type="submit" class="btn btn-primary" style="margin-bottom: -8px;">
                    ارسال
                </button>
            </div>
        </div>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
export default {
    watch: {
        text(newValue) {
            this.txtlen = (((newValue.length / 2500)) * 100) + "%";
            this.leftCharacter = 2500 - newValue.length;
        },

    },
    created() {
        this.showType = this.showTypesItems[0];
    },
    data() {
        return {
            showTypesItems: [{
                    name: "همه",
                    value: "public",
                    icon: "public"
                },
                {
                    name: "فقط دوستان",
                    value: "private",
                    icon: "group"
                }
            ],
            showType: undefined,
            category: undefined,
            text: undefined,
            txtlen: "0%",
            leftCharacter: 2500
        }
    },
    mixins: [ModalMixin],
    name: "NewPostModal"
}
</script>

<style>

</style>
