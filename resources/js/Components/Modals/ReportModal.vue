<template>
  <b-modal v-model="showModal" hide-footer size="md" title="چرا می‌‌خواهید این محتوا را گزارش دهید؟" :centered="true">
    <div class="reportreseaons" v-if="reportFor == null">
      <div class="report-item" @click="reportFor = 'notrelated'">
        <span class="text">فکر می‌کنم <span class="reportTitle">این محتوا</span> مناسب ترنوبو نیست</span>
        <i class="material-icons">keyboard_arrow_left</i>
      </div>
      <div class="report-item" @click="reportFor = 'fakeorspam'">
        <span class="text">فکر می‌کنم <span class="reportTitle">این محتوا</span> جعلی، هرز یا کلاهبراری است‌</span>
        <i class="material-icons">keyboard_arrow_left</i>
      </div>
      <div class="report-item" @click="reportFor = 'other-reasons'">
        <span class="text">برای گزارش <span class="reportTitle">این محتوا</span> دلایل دیگری دارم</span>
        <i class="material-icons">keyboard_arrow_left</i>
      </div>
    </div>

    <div v-if="!moreInfo">
      <!-- Fake Reason !-->
      <div class="fakeorspam reportfor" v-if="reportFor === 'fakeorspam'">
        <div class="report-reason">
          <label for="fakeaccount">
            <span>فکر می‌کنم این حساب کاربری غیرواقعی است</span>
            <small class="text-muted">مثال : گزارش حساب ساختگی یا جعل شده</small>
          </label>

          <div class="radio clickable" @click="reason = 'فکر می‌کنم این حساب کاربری غیرواقعی است'">
            <input type="radio" name="reason" value="فکر می‌کنم این حساب کاربری غیرواقعی است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="wronginformation">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> دارای اطلاعات نادرست است</span>
            <small class="text-muted">مثال : اطلاعات ارائه شده در <span class="reportTitle">این محتوا</span> نادرست بوده و تحت عنوان اطلاعت درست و واقعی ارائه شده است</small>
          </label>

          <div class="radio clickable" @click="reason = 'فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است'">
            <input type="radio" name="reason" value="فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="spamcotent">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> هرز است</span>
            <small class="text-muted">مثال : <span class="reportTitle">این محتوا</span> دارای ارزش خاصی نمی‌باشد و صرفا جهت جذب بازدید ارائه شده است</small>
          </label>
          <div class="radio clickable" @click="reason = 'فکر می این محتوا هرز است'">
            <input type="radio" name="reason" value="فکر می این محتوا هرز است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="phisingorvirus">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده‌</span>
            <small class="text-muted">مثال : <span class="reportTitle">این محتوا</span> به جهت دریافت اطلاعات شخصی، پول یا ارائه لینک‌های مشکوک و آلوده قرار گرفته است.</small>
          </label>
          <div class="radio clickable" @click="reason = 'فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده'">
            <input type="radio" name="reason" value="فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
      </div>

      <!-- other Reasons !-->
      <div class="other-reasons reportfor" v-if="reportFor === 'other-reasons'">
        <div class="report-reason">
          <label for="hatewordsreport">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> توهین آمیز است</span>
            <small class="text-muted">مثال : <span class="reportTitle">این محتوا</span> به صوتر هدفمند به اشخصا حقیقی، قومیت یا مذهبی خاص توهین کرده است</small>
          </label>

          <div class="radio clickable" @click="reason = 'فکر می‌کنم این محتوا توهین آمیز است'">
            <input type="radio" name="reason" value="فکر می‌کنم این محتوا توهین آمیز است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="sexualreport">
            <span>فکر می‌کنم شامل محتوای جنسی است</span>
            <small class="text-muted">مثال : شامل محتوای برهنگی، صحنه‌ها و زبان جنسی، فحشا یا قاچاق جنسی است</small>
          </label>
          <div class="radio clickable" @click="reason = 'فکر می‌‌کنم شامل محتوای جنسی است'">
            <input type="radio" name="reason" value="فکر می‌‌کنم شامل محتوای جنسی است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="terorismreport">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> اشاعه دهنده خشونت و تروریسم است</span>
            <small class="text-muted">مثال : شامل شکنجه، تجاوز یا سوء استفاده، عمل تروریستی یا عضوگیری برای گروه‌های تروریستی است</small>
          </label>
          <div class="radio clickable" @click="reason = 'فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است'">
            <input type="radio" name="reason" value="فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="threatandhatereport">
            <span>فکر می‌کنم <span class="reportTitle">این محتوا</span> آزار دهنده و تهدید آمیز است‌</span>
            <small class="text-muted">مثال : شامل حمله به شخص/اشخاص یا تهدید و قلدری است</small>
          </label>
          <div class="radio clickable" @click="reason = 'فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است'">
            <input type="radio" name="reason" value="فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="suicidereport">
            <span>من نگران هستم این فرد بخواهد خودکشی کند‌</span>
            <small class="text-muted">مثال : این شخص تهدید می‌کند که به خودش آسیب می‌رساند</small>
          </label>
          <div class="radio clickable" @click="reason = 'من نگران هستم این فرد بخواهد خودکشی کند'">
            <input type="radio" name="reason" value="من نگران هستم این فرد بخواهد خودکشی کند" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
        <div class="report-reason">
          <label for="copyrightreport">
            <span><span class="reportTitle">این محتوا</span> حقوق شخصی مرا نقض می‌کند‌‌</span>
            <small class="text-muted">مثال : اقتراء، نقص حقوق چاپ یا علائم تجاری است</small>
          </label>
          <div class="radio clickable" @click="reason = 'این محتوا حقوق شخصی مرا نقض می‌کند'">
            <input type="radio" name="reason" value="این محتوا حقوق شخصی مرا نقض می‌کند" class="radio__input" v-model="reason" />
            <label class="radio__label"> </label>
          </div>
        </div>
      </div>

      <!-- Not Related To Ternobo Reason !-->
      <div class="notrelated reportfor px-3" v-if="reportFor === 'notrelated'">
        <label>از گزارش <span class="reportTitle">این محتوا</span> به عنوان محتوای نامناسب و نامرتبط اطمینان دارید؟</label>
        <input type="radio" name="report" checked value="نامرتبط با ترنوبو" style="display: none" />
      </div>
    </div>

    <div v-if="moreInfo">
      <div class="moreinfo px-2">
        <textarea class="form-control h-100" v-model="description" placeholder="توضیحات خود را اینجا بنویسید" name="moreinfo"></textarea>
      </div>
      <div class="moreinfo-footer py-2">
        <button class="mdc-button" type="button" @click="(moreInfo = false), (description = null)">لغو</button>
        <button class="mdc-button bg-dark mdc-button--unelevated" id="moreinfo-close" @click="moreInfo = false">افزودن</button>
      </div>
    </div>
    <div class="d-flex pt-3 justify-content-between" v-else-if="reportFor != null">
      <div class="align-self-start">
        <button class="btn btn-outline-primary rounded-pill" @click="moreInfo = true">ارائه توضیحات</button>
      </div>
      <div class="d-flex">
        <button class="btn button-transparent" @click="reportFor = null">برگشت</button>
        <loading-button :loading="loading" :disabled="reason == null" class="btn btn-primary" @click.native="submit">ثبت</loading-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
  props: {
    type: {
      type: String,
      default: "post",
      required: false,
    },
    postId: {
      type: Number,
      default: undefined,
      required: false,
    },
    commentId: {
      type: Number,
      default: undefined,
      required: false,
    },
  },
  mixins: [ModalMixin],

  methods: {
    setReason(val) {
      this.reason = val;
    },
    submit() {
      this.loading = true;
      let data = {};
      if (this.type == "post") {
        data.post_id = this.postId;
      } else if (this.type == "comment") {
        data.comment_id = this.commentId;
      }
      axios
        .post("/reportpost", data)
        .then((response) => {
          this.toast("درخواست شما با موفقیت ثبت شد", "check", "text-success");
          this.$emit("update:show", false);
        })
        .catch((err) => this.toast("خطا در برقراری ارتباط"))
        .then(() => (this.loading = false));
    },
  },
  data() {
    return {
      reportFor: null,
      loading: false,
      description: null,
      moreInfo: false,
      reason: null,
    };
  },
};
</script>

<style></style>
