<template>
<div>
    <div class="tabs">
        <ul>
            <li v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': tab.isActive }">
                <a class="clickable" @click="selectTab(tab)"><i class="material-icons ml-2">{{ tab.icon }}</i>{{ tab.name  }}</a>
            </li>
        </ul>
    </div>

    <div class="tabs-details">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
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
            this.$emit("selected", selectedTab.id ? selectedTab.id : selectedTab.name)
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
}
</script>

<style>

</style>
