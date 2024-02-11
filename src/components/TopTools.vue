<template>
    <div class="flex media-header-1439">

<!--        блок с графиком по странам-->
        <div class="map bg-white p-9-10-9-11 w-half m-r-15 pos-r tool-shadow media-header-item-1439 media-header-margin-1439" style="padding-bottom:0;min-width: calc(50% - 8px);">
            <div class="flex justify-between items-center title" style="height: 22px;">
<!--                 тональность по странам-->
                <span>{{ i18n(map ? `${map_switch ? 'Регионы' : 'Страны'} источников публикаций` : `Тональность по ${map_switch ? 'регионам' : 'странам'}`) }}</span>
                <div style="display: flex;align-items: center;gap: 10px;">
                    <div class="switcher">
<!--                        ВЫБОР КАРТА ИЛИ ТОНАЛЬНОСТЬ И СМЕНА map-->
                        <div
                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_regions_map_view'})"
                            style="border-radius: 3px 0 0 3px;"
                            @click="map = !map"
                            :class="{
                                active: map
                            }">{{ i18n('Карта') }}</div>
                        <div
                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_regions_sentiment_view'})"
                            style="border-radius: 0 3px 3px 0;"
                            @click="map = !map"
                            :class="{
                                active: !map
                            }">{{ i18n('Тональность') }}</div>
                    </div>

<!--                    кнопки сброса фильтров-->
                    <ResetFilter id="reset-map" @click="reset_regions" v-if="map && has_selected_place" />
                    <ResetFilter id="reset-map" @click="reset_sentiment" v-else-if="!map && has_selected_sentiment" />
                </div>
            </div>
            <!--  -->
            <div class="flex map_container media-map-960" :style="{
                'min-height': (map ? 190 + 44 : min_height) + 'px'
            }">
<!--                блок с оторбажением страны и количества публикаций-->
                <div class="map-content flex flex-col media-map-places-list-width-520" style="min-width: 240px;" v-show="map">

<!--                      блок с картинкой страны и количеством публикаций и источников-->
                    <div v-for="country in sort_by_news_count" :key="country.id" class="flex items-center region-container">
                        <div class="region cursor-pointer"
                            style="height: 28px;"
                            @click="select__region($event, country.id, 'clicked-item-from-region-list')"
                            @mouseover="region__MouseOver(country['hc-key'])"
                            @mouseout="region__MouseOut(country['hc-key'], country.selected)"
                            :class="{
                                active: region_active[country.id] || selected_regions[country.id],
                                [country['hc-key']]: true,
                                // 'before-to-kz': country.country == 'Казахстан',
                            }"
                            v-if="!country.isRegion || (country.isRegion && country.id.split('_')[0] == current_country_id)"
                             :title="[
                                `${country.isRegion != true ? i18n('Страна') : i18n('Регион')}: ${country.country}`,
                                `${i18n('Публикаций')}: ${country.value.push_space()}`,
                                `${i18n('Источников')}: ${country.resources.push_space()}`
                            ].join('\n')">

<!--                            отрисовка картинки страны-->
                            <div class="flex items-center" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;padding-right: 5px;">
                                <img :src="`/media/img/country/${country['hc-key']}.png`" v-if="country.isRegion != true" width="25" height="25" class="m-r-5" alt="">
                                <span style="text-overflow: ellipsis;overflow: hidden;height: 16px;padding-top: 1px;">{{ country.isRegion && country.id.split('_')[1] == 0 ? `Не определен (${countries[current_country_id]?.name}) ` : country.country }}</span>
                            </div>
<!--                              отрисовка количества новостей по стране-->
                            <div class="region-news_count" style="white-space: nowrap;">
                                <span style="font-weight:600;color:#1CB394;">{{ country.value.push_space() }}</span>&nbsp;&nbsp;  <span style="font-weight:600;color:#7CB5EC;"> ({{ country.resources.push_space() }})</span>
                            </div>
                        </div>
<!--                       переключние на регионы страны кнопка при наведении на страну-->
<!--                      спросить про это-->
                        <div
                            class="to-only-kz transition-all cursor-pointer"
                            v-if="countries_with_regions[country.id] && countries[country.id]?.regions_file_name"
                            :title="`${i18n('Регионы')} - ${country.country}`"
                            @click="toggle_map_switcher(country.id, countries[country.id]?.regions_file_name)"
                        >
                            <i class="fa-solid fa-arrow-right "></i>
                        </div>
                    </div>
                </div>
                <div class="w-full media-map-min-height-960 flex justify-center overflow-hidden">
                    <i
                        class="fa-solid fa-spinner"
                        v-if="country_regions_loading && map_switch"
                    ></i>
<!--                    отображеие карты мира или тональность -->
                    <keep-alive v-else>
                        <component :is="map ? 'MapChart' : 'BarChart'" />
                    </keep-alive>
                    

<!--                  отображение доль или абсолютных данных внизу графика-->
                    <div class="switcher" v-show="!map" style="position:absolute;bottom: 5px;right: 5px;z-index: 2;">
                        <div style="border-radius: 3px 0 0 3px;" @click="inBarPercentage = !inBarPercentage" :class="{
                            active: !inBarPercentage
                        }">{{ i18n('Абсолютный') }}</div>
                        <div
                            style="border-radius: 0 2px 2px 0;"
                            @click="inBarPercentage = !inBarPercentage"
                            :class="{
                                active: inBarPercentage
                            }">{{ i18n('Доля') }}</div>
                        <div
                            :style="{
                                width: inBarPercentage ? 'auto' : 0,
                                marginLeft: inBarPercentage ? '3px' : 0,
                                padding: inBarPercentage ? '0 5px 0 6px' : 0,
                            }"
                            style='overflow: hidden;fontWeight: 900;fontFamily: "Font Awesome 5 Free";transition: .25s;border-radius: 0 2px 2px 0;'
                            :class="{
                                active: inBarPercentage && showBarPercentage
                            }" @click="showBarPercentage = !showBarPercentage">%</div>
                    </div>
                </div>
            </div>

<!--            оторбражение иконки перехода на все страны или же выбранный регион-->
            <div class="world-icon" v-if="!isKazakstan && map_switch && map && Object.keys(countries_with_regions).length">
                <i
                    class="fa-solid fa-flag-usa prompt-parent"
                    :class="{
                        active: map_switch
                    }"
                >
                    <div class="prompt">{{ i18n('Регионы') }} - {{ countries[current_country_id]?.name }}</div>
                </i>
                <i
                    class="fa-solid fa-earth-europe prompt-parent"
                    :class="{
                        active: !map_switch,
                        disabled: isKazakstan,
                    }"
                    @click="isKazakstan ? '' : toggle_map_switcher()"
                >
                    <div class="prompt">{{ i18n('Все страны') }}</div>
                </i>
            </div>
        </div>
<!--      блок с динамикой публикаций-->
        <div class="map bg-white w-half tool-shadow media-header-item-1439">
            <div class="flex justify-between items-center title p-9-10-9-11" style="padding-bottom:0;margin-bottom:4px;height: 32px;">
                <span>{{ i18n(`Динамика публикаций ${basic_line ? '' : 'по тональностям'}`) }}</span>
                <div style="display: flex;align-items: center;gap: 10px;">
                    <div class="drp flex items-center">
                        <span class="date-mode_container">
                            <div class="flex items-center">
<!--                              добавляем date моды по часам дня неделям месяцам -->
                                <template v-for="[key, value] in Object.entries(date_modes)" :key="value[1]">
                                    <i
                                        :disabled="!value[2]"
                                        @click="set_date_mode(value[2], key)"
                                        :class="{
                                            [value[1]]: true,
                                            disabled: !value[2],
                                            active: selected_date_mode == key
                                        }"
                                        style="font-size: 15px;"
                                        :style="`border-radius: ${key == 'hourly' ? '0 3px 3px 0' : key == 'monthly' ? '3px 0 0 3px' : '0'};`"
                                        class=" flex items-center justify-center cursor-pointer prompt-parent"
                                    >
                                        <div
                                            class="prompt"
                                            :style="!value[2] ? 'right: 0;left: unset;--prompt-before-left: auto;--prompt-before-right: 8px;--prompt-color: #bbb !important;' : 'right: 0;left: unset;--prompt-before-left: auto;--prompt-before-right: 8px;'"
                                            v-html="i18n(value[0])"></div>
                                    </i>
                                </template>
                            </div>

                        </span>
                    </div>
    
<!--                    сброс фильтров-->
                    <ResetFilter @click="reset_dynamics" v-if="basic_line && has_selected_date" />
                    <ResetFilter @click="reset_sentiment_dynamics" v-else-if="!basic_line && has_selected_sentiment_date" />
                </div>
            </div>
            <div>
<!--              спросить про это отрисовка графиков -->
                <LineChart v-if="map" :type="basic_line"></LineChart>
                <LineChart v-else :type="basic_line"></LineChart>
            </div>
        </div>
    </div>
</template>

<script>

import { langIs } from "@/response/utils/langIs"
import i18n from "@/response/utils/i18n"
import LineChart from '@/components/widgets/LineChart.vue';
import MapChart from "@/components/widgets/MapChart";
import BarChart from "@/components/widgets/BarChart";
import ResetFilter from "@/components/UI/icons/ResetFilter.vue";
import { selected_regions, places, map, date_modes, selected_date_mode, country_regions_loading, current_country_id, countries_with_regions, selected_dates, selected_sentiment_dates } from "@/response/data/index"
import { min_height, has_selected_sentiment, reset_sentiment, inBarPercentage, showBarPercentage } from "@/response/options/barOptions"
import { select_region, select_one_region, reset_regions, region_active, region__MouseOver, region__MouseOut, toggle_map_switcher, map_type_switcher, map_switch } from "@/response/options/mapOptions"
import { has_selected_date, reset_dynamics, basic_line, has_selected_sentiment_date, reset_sentiment_dynamics } from "@/response/options/lineOptions"

import { isKazakstan, countries } from '@/response/header'

export default {

    components: {
        LineChart,
        MapChart,
        BarChart,
        ResetFilter,
    },
    data() {
        return {
            // map: true,
            //basic_line: true,
        }
    },
    methods: {
      // установка мода по дням - часам- неделям
        set_date_mode(value, key) {
            let new_mode = value ? key : this.selected_date_mode,
                old_mode = this.selected_date_mode,
                date_mode_array = ['hourly', 'monthly'];
            //new_mode, old_mode
            if (date_mode_array.includes(old_mode) || date_mode_array.includes(new_mode)) {
                this.selected_dates = { dates: {} }
                this.selected_sentiment_dates = {
                    dates: {
                        "1": {},
                        "0": {},
                        "-1": {},
                    }
                }
            }
            this.selected_date_mode = new_mode;
        },
        //выбор региона
        select__region(event, id, selected) {
            this.reset_sentiment()
            // если шифт то выбираем несколько регионов
            if (event.shiftKey) {
                this.select_region(id, selected);
            }
            // выбор одного региона
            else {
                this.select_one_region(id, selected);
            }
        }
    },
    computed: {
        sort_by_news_count() {
            let _regions = Object.values(this.places[this.map_type_switcher]);
            _regions.sort((a, b) => (b.value - a.value))
            return _regions
        },
        has_selected_place() {
            return Object.values(this.selected_regions).find(place => (place)) === true
        },
    },
    setup() {
        return { langIs, i18n, country_regions_loading, current_country_id, countries_with_regions, selected_dates, selected_sentiment_dates, countries, isKazakstan, places, map, date_modes, selected_date_mode, select_region, select_one_region, reset_regions, region_active, selected_regions, region__MouseOver, region__MouseOut, min_height, has_selected_sentiment, reset_sentiment, has_selected_date, reset_dynamics, has_selected_sentiment_date, reset_sentiment_dynamics, basic_line, toggle_map_switcher, inBarPercentage, showBarPercentage, map_type_switcher, map_switch }
    }
}
</script>
