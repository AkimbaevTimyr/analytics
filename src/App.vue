<template>
    <div @click.stop="reset">
        <input type="hidden" id="media_type" :value="media_type">
        <div class="wrap-body p-t-10">
            <VHeader class="m-b-15" />
            <TopTools class="m-b-15" />
            <BottomTools class="m-b-15"></BottomTools>
        </div>
        <VNews class="m-b-15"></VNews>
        <div id="text-thumbnail"></div>
    </div>
</template>

<script>
import VHeader from './components/VHeader.vue'
import TopTools from './components/TopTools.vue'
import BottomTools from './components/BottomTools.vue'
import VNews from './components/VNews.vue'
import {
    item_modal,
    media_type,
} from "@/response/data/index";

export default {
    name: 'App',
    components: {
        VHeader,
        TopTools,
        BottomTools,
        VNews,
    },
    setup() {
        return { item_modal, media_type }
    },
    methods: {
        reset() {
            this.item_modal = false
        }
    }
}
</script>

<style scoped>
div {
    line-height: 1;
}
</style>
