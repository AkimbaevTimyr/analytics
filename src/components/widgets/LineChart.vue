<template>
    <highcharts :options="lineOptions" class="line w-full"></highcharts>
</template>

<script>
import { lineOptions } from "@/response/options/lineOptions"

export default {
    setup() {
        return { lineOptions }
    },
};
</script>
<style>

.line {
    min-height: 100%;
}

.line .highcharts-legend-item rect {
    width: 35px;
}

.line .highcharts-series-3.highcharts-legend-item-hidden rect {
    width: 20px;
}

.line .highcharts-series-3:not(.line .highcharts-series-3.highcharts-legend-item-hidden) ~ .highcharts-legend-item-hidden rect {
    width: 20px;
}

</style>
