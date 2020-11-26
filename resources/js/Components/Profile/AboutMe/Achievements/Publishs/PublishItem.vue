<template>
  <li class="achievement w-100">
    <div class="w-100" v-if="!edit">
      <div class="d-flex justify-content-start" v-if="detailed">
        <div class="title">
          <a :href="val.link" v-if="val.link != null && val.link.length > 0"
            ><strong>{{ val.name }}</strong></a
          >
          <span v-else
            ><strong>{{ val.name }}</strong></span
          >
          <span class="font-12 text-muted">{{ time_text }}</span>
        </div>
        <p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
          {{ val.description }}
        </p>
      </div>
      <div class="achievement-name" v-else>
        <a :href="val.link" v-if="val.link != null && val.link.length > 0"
          ><strong>{{ val.name }}</strong></a
        >
        <span v-else
          ><strong>{{ val.name }}</strong></span
        >
      </div>
    </div>

    <div class="editItem" v-else>
      <div class="d-flex flex-column align-items-center ml-3">
        <div class="actions mx-0 mb-3">
          <i class="material-icons hand-hover">unfold_more</i>
          <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
        </div>
        <button class="btn font-12 ml-1 follow-btn" @click="showMore = !showMore" v-if="edit">
          {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
        </button>
      </div>
      <div class="row w-100 m-0">
        <div class="col-md-6 py-4">
          <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="عنوان"></MaterialTextField>
        </div>
        <div class="col-md-6 py-4">
          <MaterialTextField v-model="val.publisher" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="نام ناشر"></MaterialTextField>
        </div>
        <div class="col-md-6 py-4">
          <strong>تاریخ شروع <span class="text-action">*</span></strong>
          <DatePicker v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
        </div>
        <div class="col-md-6 py-4 d-flex align-items-end" v-if="showMore">
          <MaterialTextField v-model="val.link" class="d-flex align-items-center material--sm" placeholder="لینک ناشر"></MaterialTextField>
        </div>
        <div class="col-md-12 py-4" v-if="showMore">
          <strong>توضیحات</strong>
          <div class="character-counter">
            <span class="counter tex-dark">{{ leftCharacter }}</span>
            <div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
              <div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <textarea-autosize class="form-control" v-model="val.description"></textarea-autosize>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import PersianDate from "persian-date";
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

export default {
  created() {
    if (this.value.name) {
      this.val = this.value;
    }
  },
  watch: {
    val: {
      handler(newValue) {
        this.$emit("input", newValue);
        if (newValue.description != null) {
          this.progress = (newValue.description.length / 2500) * 100 + "%";
          this.leftCharacter = 2500 - newValue.description.length;
        }
      },
      deep: true,
    },
  },
  props: {
    page: {
      type: Object,
      default: undefined,
      required: true,
    },
    value: {
      type: Object,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    MaterialTextField,
    Checkbox,
    DatePicker,
  },
  computed: {
    time_text() {
      let startText = "";
      if (this.val.startDate) {
        startText = new PersianDate([this.val.startDate.year, this.val.startDate.month.id]).format("MMMM YYYY");
      }
    },
    now() {
      return new PersianDate(new Date()).toLocale("en").format("L");
    },
    month() {
      return new PersianDate().month();
    },
    year() {
      return new PersianDate().year();
    },
  },
  data() {
    return {
      val: {
        name: "",
        publisher: undefined,
        date: null,
        link: "",
        description: "",
      },

      showMore: false,
      leftCharacter: 2500,
      progress: 0,
    };
  },
};
</script>
