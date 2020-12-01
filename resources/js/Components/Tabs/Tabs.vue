<template>
  <div>
    <div class="tabs" :class="[{ compact: compact, centered: centered }, tabsClass]">
      <ul>
        <li v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': tab.isActive }">
          <a :class="{ disabled: disabled }" class="clickable" @click="selectTab(tab)"
            ><i class="material-icons ml-2" v-if="tab.icon != null && tab.icon != undefined">{{ tab.icon }}</i
            >{{ tab.name }}</a
          >
        </li>
      </ul>
      <div>
        <slot name="custom-item"></slot>
      </div>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Inertia } from "@inertiajs/inertia";
export default {
  props: {
    ulClass: {
      type: String,
      default: null,
      required: false,
    },
    tabsClass: {
      type: String,
      default: null,
      required: false,
    },
    centered: {
      type: Boolean,
      default: false,
      required: false,
    },
    compact: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    stateTab: {
      type: Boolean,
      default: false,
    },
  },
  name: "Tabs",
  data() {
    return {
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab: function (selectedTab) {
      if (!this.disabled) {
        if (this.stateTab) {
          this.$emit("selected", selectedTab.href, selectedTab.id);
        } else {
          this.$emit("selected", selectedTab.id ? selectedTab.id : selectedTab.name);
        }
        this.tabs.forEach((tab) => {
          tab.isActive = tab.name == selectedTab.name;
        });
      }
    },
  },
};
</script>

<style></style>
