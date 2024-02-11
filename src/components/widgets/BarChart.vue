<template><highcharts :options="barOptions" class="bar w-full"></highcharts></template>

<script>
import { barOptions } from "@/response/options/barOptions"

export default {
    setup() {
        return { barOptions }
    }
};
</script>
<style>
.bar {
    min-height: 100%;
}
.bar .highcharts-legend-item rect {
    width: 40px;
    /*display: none !important;*/
}
</style>
