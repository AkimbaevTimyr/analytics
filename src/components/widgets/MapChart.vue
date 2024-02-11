<template>
    <highcharts :constructor-type="'mapChart'" :options="mapOptions" class="map w-full"></highcharts>
</template>

<script>
//import { mapOptions } from '@/response/data'
import { mapOptions } from "@/response/options/mapOptions"

export default {
    setup() {
        return { mapOptions }
    },
};
</script>
<style scoped>
.map {
    min-height: 100%;
}
</style>
