<template>
    <div class="container">

        <div class="active_fill" :style="{
            left: offsetLeft,
            right: offsetRight,
        }"></div>
        <div class="range-slider">
            <span id="rs-bullet" class="rs-label" :style="{
                left: currentValueOffsetLeft
            }">
                <span class="whitespace-nowrap">{{ is_clipped ? clipped_count : percent }} - {{ end_clipped_count }}</span>
            </span>
            <input id="rs-range-line" class="rs-range rs-range-temp" :style="{
                '--max': max == 0 ? 1 : max, // + (start_top_resources + (max - end_top_resources)),
                '--main-range-bg': `url('/analytics/img/caret-left.png')  left center/contain  no-repeat, url('/analytics/img/caret-right.png')  right center/contain  no-repeat, white`
            }" type="range" @input="showSliderValue($event)" onchange="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value,event_type: 'move_sources_sliders'})"
                :value="selected_top_resources" min="0" :max="roundMax" step="1">
            <input id="rs-range-line" class="rs-range pos-a-range" type="range" @input="startSliderValue($event)"
                :value="start_top_resources" min="0" :max="roundMax" step="1" @change="getDynamicsData()" onchange="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value,event_type: 'move_sources_sliders'})">
            <input id="rs-range-line" class="rs-range pos-a-range light_clip" type="range" @input="endSliderValue($event)"
                :value="end_top_resources" min="0" :max="roundMax" step="1" @change="getDynamicsData()" onchange="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value,event_type: 'move_sources_sliders'})">

        </div>

    </div>
</template>

<script>

import { getClippedResources, offsetLeft, offsetRight, resource_count } from '@/response/data/index'
import { selected_top_resources, start_top_resources, end_top_resources, maxClipped, each_number, max } from '@/response/options/columnOptions'
import { getDynamicsData } from '@/response/api'

export default {
    props: {
        percent: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {
            currentValueOffsetLeft: 0,
            // offsetLeft: 0,
            // offsetRight: 0,
            is_clipped: false,
            is_start: true,
            // timeout: 0,
        }
    },
    methods: {
        showSliderValue(event) {
            this.is_clipped = false
            this.selected_top_resources = +event.target.value;
            this.currentValueOffsetLeft = +((event.target.value / event.target.max) * 96.2) + '%'
            
            if (this.end_top_resources < this.selected_top_resources) {
                this.selected_top_resources = +this.end_top_resources;
                this.currentValueOffsetLeft = +((this.end_top_resources / event.target.max) * 96.2) + '%'
            }
            else if (this.selected_top_resources < this.start_top_resources) {
                this.selected_top_resources = +this.start_top_resources;
                this.currentValueOffsetLeft = +((this.start_top_resources / event.target.max) * 96.2) + '%'
            }
        },
        startSliderValue(event) {
            this.start_top_resources = +event.target.value;
            if (this.start_top_resources > this.end_top_resources) {
                this.start_top_resources = +this.end_top_resources
                event.target.value = +this.end_top_resources
            }
            if (this.selected_top_resources < this.start_top_resources || this.roundMax == this.start_top_resources) {
                this.showSliderValue(event);
            }
            
            this.currentValueOffsetLeft = +((event.target.value / event.target.max) * 96.2) + '%'
            this.is_clipped = 'start_top_resources'
            
            this.offsetLeft = event.target.value == 0 ? 0 : `calc(${(event.target.value / event.target.max) * 96}% + 10px)`

        },
        endSliderValue(event) {
            this.end_top_resources = +event.target.value;
            if (this.end_top_resources < this.start_top_resources) {
                this.end_top_resources = +this.start_top_resources
                event.target.value = +this.start_top_resources
            }
            if (this.selected_top_resources > this.end_top_resources) {
                this.showSliderValue(event);
            }

            this.currentValueOffsetLeft = +((event.target.value / event.target.max) * 96.2) + '%'
            this.is_clipped = 'end_top_resources'
            
            this.offsetRight = event.target.value == this.roundMax ? 0 : `calc(${((this.roundMax - event.target.value) / event.target.max) * 96}% + 10px)`
        },
    },
    computed: {

        roundMax() {
            return this.max * this.each_number >= this.resource_count ? this.max - 1 : this.max
        },

        clipped_count() {
            let selected_res_news = 1;
            if (this.is_clipped != false) {
                selected_res_news = (this[this.is_clipped] * this.each_number) + 1;

            }

            return selected_res_news;
        },
        end_clipped_count() {
            let start_count = (this.is_clipped ? this.clipped_count : this.percent) + 5

            if (start_count > this.resource_count) start_count = this.resource_count;

            return start_count
        },
    },
    setup() {
        return { resource_count, offsetLeft, offsetRight, getDynamicsData, getClippedResources, selected_top_resources, start_top_resources, end_top_resources, max, maxClipped, each_number }
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.range-slider {
    position: relative;
    padding-bottom: 4px;
    margin-top: 6px;
    width: 100%;
}

.rs-range.pos-a-range {
    position: absolute;
    left: 0;
    bottom: 0;
}

.rs-range.pos-a-range::-webkit-slider-runnable-track {
    /*background: #3b5998;*/
    height: 0;
    user-select: none;
}
.rs-range.pos-a-range::-moz-range-track {
    /*background: #3b5998;*/
    height: 0;
    user-select: none;
}
.rs-range.pos-a-range::-webkit-slider-thumb {
    background: url(@/assets/clip_to_top.png)  0 0/100% 100% no-repeat;
    /*background: #3b5998;*/
    margin-top: -5px;
    margin-left: -3px;
    width: 7px;
    height: 15px;
    cursor: grab;
}
.rs-range.pos-a-range::-webkit-slider-thumb:active {
    cursor: grabbing;
}
.rs-range.pos-a-range::-moz-range-thumb {
    background: url(@/assets/clip_to_top.png)  0 0/100% 100% no-repeat;
    /*background: #3b5998;*/
    margin-top: -5px;
    margin-left: -3px;
    width: 7px;
    height: 15px;
}
.rs-range.pos-a-range.light_clip::-webkit-slider-thumb {
    /* background: url(@/assets/light_clip.png)  0 0/100% 100% no-repeat; */
    background: url(@/assets/clip_to_top.png)  0 0/100% 100% no-repeat;
    /*background: #3b5998;*/
    margin-top: -5px;
    margin-left: 3px;
    width: 7px;
    height: 15px;
}
.rs-range.pos-a-range.light_clip::-moz-range-thumb {
    /* background: url(@/assets/light_clip.png)  0 0/100% 100% no-repeat; */
    background: url(@/assets/clip_to_top.png)  0 0/100% 100% no-repeat;
    /*background: #3b5998;*/
    margin-top: -5px;
    margin-left: 3px;
    width: 7px;
    height: 15px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #cccccc;
    border-radius: 3px;
    padding-right: 10px;
    padding-left: 10px;
    position: relative;
}
.active_fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #7CB5EC;
}

.rs-range {
    /*width: 580px;*/
    width: 100%;
    -webkit-appearance: none;
}

.range-slider:hover .rs-label {
    display: flex;
}

.rs-range:focus {
    outline: none;
}

.rs-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 2.5px;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
    border-radius: 0px;
    border: 0px solid #010101;
}

.rs-range::-moz-range-track {
    width: 100%;
    height: 2.5px;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
    border-radius: 0px;
    border: 0px solid #010101;
}

.rs-range::-webkit-slider-thumb {
    box-shadow: none;
    border: 0px solid #ffffff;
    /*box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);*/
    height: 9px;
    width: 20px;
    border-radius: 1.5px;
    background: white;
    -webkit-appearance: none;
    margin-top: -4px;
    cursor: w-resize;
}

.rs-range-temp::-webkit-slider-thumb {
    /* background: url(@/assets/left-and-right-arrows.png)  center center/contain  no-repeat, white; */
    background: var(--main-range-bg);
    height: 9px;
    width: calc(100% / var(--max));
    min-width: 18px;
}

.rs-range::-moz-range-thumb {
    box-shadow: none;
    border: 0px solid #ffffff;
    /*box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);*/
    height: 9px;
    width: 20px;
    border-radius: 1.5px;
    background: white;
    -webkit-appearance: none;
    margin-top: -4px;
    cursor: w-resize;
}

.rs-range::-moz-focus-outer {
    border: 0;
}

.rs-label span {
    background: #7CB5EC;
    padding-left: 6px;
    padding-right: 6px;
    /*padding-right: 20px;*/
    height: 100%;
    display: inline-flex;
    align-items: center;
    position: relative;
    border-radius: 4px;
    /*border: 2px solid #fff;*/
}

.rs-label {
    top: -30px;
    position: absolute;
    display: block;
    width: 70px;
    height: 25px;
    display: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-left: -25px;
    left: attr(value);
    color: #fff;
    font-size: 16px;
}

/*.rs-label span::after {
    position: absolute;
    top: 8.5px;
    right: 3px;
    content: "%";
    display: block;
    font-size: 14px;
    letter-spacing: 0.07em;
    margin-top: -2px;
}*/
</style>