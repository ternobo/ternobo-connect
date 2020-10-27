<template>
<div>
    <div class="tabs">
        <ul>
            <li v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': tab.isActive }">
                <a class="clickable" @click="selectTab(tab)"><i class="material-icons ml-2">{{ tab.icon }}</i>{{ tab.name }}</a>
            </li>
        </ul>
        <slot name="custom-item"></slot>
    </div>

    <div class="tabs-details">
        <slot></slot>
    </div>
</div>
</template>

<script>
import {
    Inertia
} from '@inertiajs/inertia';
export default {
    props: {
        stateTab: {
            type: Boolean,
            default: false
        },

    },
    name: "Tabs",
    data() {
        return {
            tabs: []
        }
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab: function (selectedTab) {
            if (this.stateTab) {
                this.$emit("selected", selectedTab.href);
            } else {
                this.$emit("selected", selectedTab.id ? selectedTab.id : selectedTab.name);

            }
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
}
</script>

<style>

</style>
