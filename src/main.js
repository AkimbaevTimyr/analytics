Array.prototype.join_title = function () {
    return [...this].map(item => ('• '+item)).join('\n');
}
Number.prototype.minmax = function (min, max) {
    return this < min ? min : this > max ? max : this;
}
Number.prototype.push_space = function () {
    return [...[...this.toString()].reverse().join('').match(/.{1,3}/g).join(' ')].reverse().join('')
}
String.prototype.push_space = function () {
    const temp_integer = parseInt(this);
    return isNaN(temp_integer) ? this : temp_integer.push_space()
}
const divider_obj = {
    1_000_000_000: ' млрд.',
    1_000_000: ' млн.',
    1: '',
}
Number.prototype.getFixedOne = function() {
    return parseInt((this) * 10) / 10
}
Number.prototype.short = function () {
    const one_billion = 1_000_000_000
    const one_million = 1_000_000
    let some_divider = this >= one_billion ? one_billion : this >= one_million ? one_million : 1;
    if (divider_obj[some_divider] == '') {
        return this.push_space()
    }
    else {
        return (this / some_divider).getFixedOne() + divider_obj[some_divider]
    }
}
String.prototype.short = function () {
    return parseInt(this).short()
}
String.prototype.maxLength = function (length) {
    if (this.trim().length <= length) return this.trim();
    else return this.trim().slice(0, length) + '...'
    // Crewmate WillThrowTheseHands
}

import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/tailwind.css'

import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import mapInit from "highcharts/modules/map";
import accessibilityInit from "highcharts/modules/accessibility";
import map_world from "@highcharts/map-collection/custom/world.geo.json";

mapInit(Highcharts);
accessibilityInit(Highcharts);

Highcharts.maps["map-world"] = map_world;

const app = createApp(App)

app.use(HighchartsVue);

app.mount('#app')
