<template>
    <highcharts
        :options="columnOptions"
        class="column w-full"
        onclick="if (event?.target?.classList?.contains('highcharts-point')) amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_sources_bar'})"
        ></highcharts>
</template>

<script>
import { columnOptions } from "@/response/options/columnOptions"

export default {
    setup() {
        return { columnOptions }
    },
};
</script>

<style>
.column {
    min-height: 100%;
}

.column .highcharts-legend-item rect {
    width: 35px;
}

.column .highcharts-series-3.highcharts-legend-item-hidden rect {
    width: 20px;
}

.column .highcharts-series-3:not(.column .highcharts-series-3.highcharts-legend-item-hidden) ~ .highcharts-legend-item-hidden rect {
    width: 20px;
}

</style>
