<template>
    <highcharts :options="pieOptions" class="pie w-full"></highcharts>
</template>

<script>
import { pieOptions } from "@/response/options/pieOptions"

export default {
    setup() {
        return { pieOptions }
    },
};
</script>
<style>
.pie {
    /*min-height: 100%;*/
    min-height: 255px;
}
</style>
