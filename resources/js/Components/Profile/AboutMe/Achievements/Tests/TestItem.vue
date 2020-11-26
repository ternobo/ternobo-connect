<template>
  <li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
    <div class="w-100" v-if="!edit">
      <div class="d-flex justify-content-start" v-if="detailed">
        <div class="title">
          <span
            ><strong>{{ val.name }}</strong></span
          >
          <span class="mr-4 badge-success">{{ val.score }}</span>
          <span class="font-12 text-muted">{{ time_text }}</span>
        </div>
        <p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
          {{ val.description }}
        </p>
      </div>
      <div class="achievement-name" v-else>
        <span
          ><strong>{{ val.name }}</strong></span
        >
      </div>
    </div>
    <div class="editItem" v-else>
      <div class="d-flex flex-column align-items-center ml-3" v-if="edit">
        <div class="actions mx-0">
          <i class="material-icons hand-hover">unfold_more</i>
          <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
        </div>
        <button class="mt-2 btn font-12 ml-1 follow-btn" @click="showMore = !showMore">
          {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
        </button>
      </div>

      <!--
            Content Edit
        !-->
      <div class="row w-100">
        <div class="col-md-6 py-4">
          <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0" placeholder="عنوان"></MaterialTextField>
        </div>
        <div class="col-md-6 py-4">
          <v-select :searchable="false" :placeholder="'مرتبط با'" class="datepicker-list w-75" dir="rtl" v-model="val.skills" label="name" :options="page.user.skills">
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
              </span>
            </template>
            <template #no-options>موردی یافت نشد</template>
          </v-select>
        </div>
        <div class="col-md-6 py-4">
          <strong>تاریخ آزمون <span class="text-action">*</span></strong>
          <DatePicker v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
        </div>
        <div class="col-md-6 py-4">
          <MaterialTextField style="margin-top: 21px" v-model="val.score" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="نمره"></MaterialTextField>
        </div>
        <div class="col-md-12 py-4" v-if="showMore">
          <strong>توضیحات</strong>
          <div class="character-counter">
            <span class="counter tex-dark">{{ leftCharacter }}</span>
            <div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
              <div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <textarea-autosize maxlength="1000" class="form-control" v-model="val.description"></textarea-autosize>
        </div>
      </div>
      <!--
            Content Edit End
        !-->
    </div>
  </li>
</template>

<script>
import PersianDate from "persian-date";
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
export default {
  mixins: [AchievementsItem],
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
          this.progress = (newValue.description.length / 1000) * 100 + "%";
          this.leftCharacter = 1000 - newValue.description.length;
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
      let dateText = "";
      if (typeof this.val.date == "object") {
        dateText = new PersianDate([this.val.date.year, this.val.date.month.id]).format("MMMM YYYY");
      }
      return dateText;
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
        skill: null,
        date: null,
        score: null,
        description: "",
      },

      showMore: false,
      leftCharacter: 1000,
      progress: 0,
    };
  },
};
</script>