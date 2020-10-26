<template>
<base-layout>
    <div class="new-article w-100">
        <CropperModal title="تصویر شاخص مقاله" :image="cover" @cropped="onCropped" :show.sync="cropping"></CropperModal>
        <ArticleSettings @save="setSettings" :show.sync="showSettings"></ArticleSettings>
        <div class="cover-section clickable" @click="selectFile">
            <img :src="thumbnail" v-if="thumbnail !== undefined" />
            <div class="position-absolute" style="top: 16px;left:16px" @click="thumbnail=undefined" v-if="thumbnail !== undefined">
                <button class="btn closebtn p-4"><i class="material-icons">close</i></button>
            </div>
        </div>

        <div class="editor-section border-bottom">
            <input type="text" class="font-24 border-0 form-control" placeholder="عنوان مقاله" />
            <vue-editor ref="editor" v-model="content" />
        </div>
        <div class="actions-section">
            <loading-button :loading="loading" class="btn btn-primary w-100">ارسال</loading-button>
            <button class="btn button-transparent btn-transparent" @click="showSettings = true"><i class="material-icons text-muted">settings</i></button>
        </div>
    </div>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import {
    VueEditor,
    Quill
} from "vue2-editor";
import CropperModal from "../../Components/Modals/CropperModal";
import ArticleSettings from "../../Components/Modals/ArticleSettings";

export default {
    methods: {
        selectFile() {
            if (this.thumbnail === undefined) {
                const $this = this;
                var el = document.createElement("input");
                el.type = "file";
                el.style.display = "none";
                document.body.append(el);
                el.click();
                el.addEventListener("change", () => {
                    if (el.files.length > 0) {
                        const file = (el.files[0]);
                        if (file.type.startsWith("image")) {
                            let blobURL = URL.createObjectURL(file);
                            $this.cover = blobURL;
                            $this.cropping = true;
                        } else {
                            $this.toast("فقط امکان انتخاب تصویر وجود دارد.")
                        }
                    }
                    el.remove();
                }, false);
            }

        },
        onCropped(cordinates, canvas) {
            canvas.toBlob((url) => this.thumbnail = URL.createObjectURL(url));
        }
    },
    created() {
        const BlockEmbed = Quill.import('blots/block/embed');
        class VideoBlot extends BlockEmbed {
            static create(url) {
                let node = super.create();
                node.setAttribute('src', url);
                node.setAttribute('controls', '');
                return node;
            }

            static value(node) {
                return node.getAttribute('src');
            }
        }
        VideoBlot.blotName = 'video';
        VideoBlot.tagName = 'video';
        Quill.register(VideoBlot);
    },

    mounted() {
        const $this = this;
        const editor = this.$refs.editor.quill;
        Quill.debug(false);

        var toolbar = editor.getModule('toolbar');
        toolbar.addHandler('video', function () {
            var el = document.createElement("input");
            el.type = "file";
            el.style.display = "none";
            document.body.append(el);
            el.addEventListener("change", () => {
                if (el.files.length > 0) {
                    const file = (el.files[0]);
                    if (file.type.startsWith("video")) {
                        var range = editor.getSelection();
                        let position = range ? range.index : 0;
                        let blobURL = URL.createObjectURL(file);
                        editor.insertEmbed(position, "video", blobURL);
                    } else {
                        $this.toast("فقط امکان انتخاب ویدیو وجود دارد.")
                    }
                }
                el.remove();
            }, false)
            el.click();
        });

    },
    data() {
        return {
            content: "",
            cropping: false,
            thumbnail: undefined,
            cover: "/images/uploadcover.svg",
            loading: false,
            showSettings: false,
        }
    },
    components: {
        VueEditor,
        CropperModal,
        ArticleSettings
    },
    layout: AppLayout
}
</script>

<style lang="scss" scoped>
.quillWrapper {
    min-height: 100%;
    width: 100%;
    flex: 1 1 auto;
}

.new-article {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 130px);
}

.editor-section {
    flex: 1 1 auto;
    background: #FFF;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.cover-section {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(/images/uploadcover.svg) no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
    height: 300px;
    position: relative;

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
}

.actions-section {
    display: flex;
}
</style>
