<template>
    <div class="flex media-header-1439">
        <div class="flex map w-half m-r-15 media-header-item-1439 media-header-margin-1439 media-metrics-885_769" style="height: 312px;">
            <div
                class="bg-white p-9-10-9-11 m-r-15 tool-shadow media-lang-margin-885_769"
                style="min-width: 240px; width: 70%"
            >
                <div class="flex justify-between items-center title">
                    <span>{{ i18n('Язык публикаций') }}</span>
                    <!-- <i
                        class="fa fa-refresh cursor-pointer"
                        @click="reset_languages"
                        v-if="has_selected_languages"
                    ></i> -->
                    <ResetFilter v-if="has_selected_languages" @click="reset_languages" />
                </div>
                <div class="flex map_container" style="height: calc(100% - 24px - 18px);align-items: center;">
                    <div class="flex w-full flex-col" style="margin: auto 0">
                        <div
                            class="language flex items-center cursor-pointer"
                            :class="{
                                active: selected_languages[language.id],
                            }"
                            :style="{
                                outlineColor: has_selected_languages && !selected_languages[language.id] ? '#ccc' : ''
                            }"
                            v-for="language in get_languages"
                            :key="language.name"
                            @click="select_language($event, language.id)"
                        >
                            <div
                                class="language-filled"
                                v-show="lang"
                                :style="{
                                    width:
                                        (languages_count[language.id]
                                            .filled_count /
                                            (lang
                                                ? languages_count[language.id]
                                                      .count
                                                : max_lang_filtered_count)) *
                                            100 +
                                        '%',
                                }"
                            >
                                <div
                                    class="filled_news_count"
                                    :style="{
                                        minWidth: text(
                                            languages_count[
                                                language.id
                                            ].filled_count.push_space(),
                                            12
                                        ),
                                        background:
                                            'url(/img/static/caret-down.png) center / 20px 20px no-repeat',
                                    }"
                                >
                                    <span class="filled_news_count_value">{{
                                        languages_count[
                                            language.id
                                        ].filled_count.push_space()
                                    }}</span>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <img
                                    :src="imgUrl(language.img)"
                                    :width="language.img_width"
                                    style="margin-right: 5px"
                                    :style="{
                                        marginLeft:
                                            language.img == 'other'
                                                ? '2.5px'
                                                : 0,
                                    }"
                                />
                                {{ i18n(language.name) }}
                            </div>
                            <div class="language-news_count">
                                <span class="lang-news">
                                    {{
                                        lang
                                            ? languages_count[
                                                  language.id
                                              ].count.push_space()
                                            : languages_count[
                                                  language.id
                                              ].filled_count.push_space()
                                    }}
                                </span>
                                <!-- <span class="lang-percent">{{ language.percent }}%</span> -->
                            </div>
                        </div>
                        <!--<div class="switcher mx-auto" style="width: 176px">
                            <div
                                @click="lang = !lang"
                                :class="{
                                    active: lang,
                                }"
                                class="w-full flex justify-center prompt-parent"
                            >
                                <div class="prompt">• от общего количества публикаций по языку</div>
                                обший
                            </div>
                            <div
                                @click="lang = !lang"
                                :class="{
                                    active: !lang,
                                }"
                                class="w-full flex justify-center prompt-parent"
                            >
                                <div class="prompt">• для сравнения между языками от максимального числа публикаций</div>
                                обычный
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
            <div class="bg-white w-full overflow-hidden tool-shadow">
                <div
                    class="flex justify-between items-center title p-9-10-9-11"
                    style="padding-bottom: 0;padding-top: 0;margin-top: 9px;"
                >
                    <span>{{
                        r_type == 1
                            ? i18n("Категория источника") // Категория новостей СМИ
                            : i18n("Метрики соцсетей")
                    }}</span>

                    <!-- <i
                        class="fa fa-refresh cursor-pointer"
                        @click="reset_categories"
                        v-if="has_selected_categories && r_type == 1"
                    ></i> -->
                    <ResetFilter v-if="has_selected_categories && r_type == 1" @click="reset_categories" />

                    <label class="toggle" v-show="r_type == 2 && is_high_news_count">
                        <input
                            class="toggle-checkbox"
                            type="checkbox"
                            :checked="!!enable_metrics"
                            @change="enable_metrics = !enable_metrics ? 'active_metrics' : false"
                        />
                        <div class="toggle-switch"></div>
                    </label>
                </div>
                <div
                    class="flex map_container"
                    style="padding-right: 0; padding-left: 0;position: relative;z-index: 1;"
                    :class="{
                        'p-9-10-9-11': true,
                        'flex-wrap': true,
                    }"
                    :style="r_type == 1 ? 'padding-bottom: 0px;height: calc(100% - 24px - 18px - 50px);align-items: center;' : ''"
                >
                    <keep-alive v-if="r_type == 1">
                        <component :is="'PieChart'" />
                    </keep-alive>
                    <template v-else>
                        <div class="flex w-full m-b-10 p-x-14">
                            <div
                                :class="{
                                    active: selected_soc_metrics == 'likes',
                                    disabled: !Boolean(enable_metrics),
                                }"
                                class="metric m-r-10"
                                :title="soc_metrics.likes.push_space()"
                            >
                                <svg fill="#A7B1C2" class="metric-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="48px" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                    <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                    <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                                </svg>

                                <div class="metric-description">
                                    <span class="metric-count">
                                        <i class="fa-solid fa-spinner" v-if="soc_metrics.likes == 'loading'"></i>
                                        <template v-else>{{ soc_metrics.likes.short() }}</template>
                                    </span>
                                    <span class="metric-name">{{ i18n('Реакции') }}</span>
                                </div>
                            </div>
                            <div
                                :class="{
                                    active: selected_soc_metrics == 'comments',
                                    disabled: !Boolean(enable_metrics),
                                }"
                                class="metric"
                                :title="soc_metrics.comments.push_space()"
                            >
                                <i class="fa fa-comments fa-4x metric-icon"></i>
                                <div class="metric-description">
                                    <span class="metric-count">
                                        <i class="fa-solid fa-spinner" v-if="soc_metrics.comments == 'loading'"></i>
                                        <template v-else>{{ soc_metrics.comments.short() }}</template>
                                    </span>
                                    <span class="metric-name">{{ i18n('Комментарии') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full p-x-14">
                            <div
                                :class="{
                                    active: selected_soc_metrics == 'reposts',
                                    disabled: !Boolean(enable_metrics),
                                }"
                                class="metric m-r-10"
                                :title="soc_metrics.reposts.push_space()"
                            >
                                <i class="fa fa-share fa-4x metric-icon"></i>
                                <div class="metric-description">
                                    <span class="metric-count">
                                        <i class="fa-solid fa-spinner" v-if="soc_metrics.reposts == 'loading'"></i>
                                        <template v-else>{{ soc_metrics.reposts.short() }}</template>
                                    </span>
                                    <span class="metric-name">{{ i18n('Репосты') }}</span>
                                </div>
                            </div>
                            <div
                                :class="{
                                    active: selected_soc_metrics == 'members',
                                    disabled: !Boolean(enable_metrics),
                                }"
                                class="metric"
                                :title="soc_metrics.members.push_space()"
                            >
                                <i class="fa fa-users fa-4x metric-icon"></i>
                                <div class="metric-description">
                                    <span class="metric-count">
                                        <i class="fa-solid fa-spinner" v-if="soc_metrics.members == 'loading'"></i>
                                        <template v-else>{{ soc_metrics.members.short() }}</template>
                                    </span>
                                    <span class="metric-name">{{ i18n('Подписчики') }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="flex please_wait_metrics" :class="{
                    'opacity-0': r_type == 1 || (!Boolean(enable_metrics) || !is_high_news_count || is_high_news_count && !laoding_metrics) && !(is_high_news_count && !enable_metrics)
                }">
                    <template v-if="is_high_news_count && !enable_metrics">
                        {{ i18n('При сборе метрик для большого числа публикаций метрики по умолчанию выкл.') }}
                    </template>
                    <template v-else>
                        {{ i18n('Идёт сбор метрик для большого числа публикаций.') }}<br/>
                        {{ i18n('Будет готово через несколько секунд🤓') }}
                    </template>
                </div>
            </div>
        </div>
        <div
            class="flex flex-col map bg-white w-half pos-r tool-shadow media-header-item-1439"
            style="overflow-y: clip;height: 312px;/* height: calc(250px + 35px + 10px + 15px);  */"
        >
            <div
                class="flex justify-between items-center title p-9-10-9-11"
                style="padding-bottom: 0;height: 28px;"
            >
                <span>
                    <span v-if="staced_column"
                        >{{ i18n('Источники публикаций') }}</span
                    >
                    <span v-if="!staced_column"
                        >{{ i18n('Тональность источников') }}</span
                    >
                </span>

                <div style="display: flex;align-items: center;gap: 10px;">
                    <div class="switcher" v-show="!staced_column">
                        <div
                            style="border-radius: 3px 0 0 3px;"
                            @click="inColumnPercentage = !inColumnPercentage"
                            :class="{
                                active: !inColumnPercentage,
                            }"
                        >
                            {{ i18n('Абсолютный') }}
                        </div>
                        <div
                            style="border-radius: 0 2px 2px 0;"
                            @click="inColumnPercentage = !inColumnPercentage"
                            :class="{
                                active: inColumnPercentage,
                            }"
                        >
                            {{ i18n('Доля') }}
                        </div>
                        <div
                            :style="{
                                width: inColumnPercentage ? 'auto' : 0,
                                marginLeft: inColumnPercentage ? '3px' : 0,
                                padding: inColumnPercentage ? '0 5px 0 6px' : 0,
                            }"
                            style='overflow: hidden;fontWeight: 900;fontFamily: "Font Awesome 5 Free";transition: .25s;border-radius: 0 2px 2px 0;'
                            :class="{
                                active: inColumnPercentage && showColumnPercentage
                            }" @click="showColumnPercentage = !showColumnPercentage">%</div>
                    </div>
                    <ResetFilter v-if="staced_column && has_selected_resource" @click="reset_resource" />
                    <ResetFilter v-else-if="!staced_column && has_selected_resource_sentiment" @click="reset_sentiment_resource" />
                </div>

            </div>

            <keep-alive>
                <component :is="'ColumnChart'" />
            </keep-alive>
            <div class="res_counts">
                <div
                    class="res_count"
                    :style="{
                        width: show_percent
                            ? text(resource_clipped_news_count.push_space())
                            : text(res_news_percentage),
                    }"
                    @click="show_percent = !show_percent"
                    :class="{
                        active: show_percent,
                    }"
                >
                    <template v-if="this.resource_count_loading">
                        <div
                            class="front"
                        >
                            <i class="fa-solid fa-spinner"></i>
                        </div>
                        <div
                            class="back"
                        >
                            <i class="fa-solid fa-spinner"></i>
                        </div>
                    </template>
                    <template v-else>
                        <div class="front">{{ res_news_percentage }}</div>
                        <div class="back white-space-nowrap">
                            {{ resource_clipped_news_count.push_space() }}
                        </div>
                    </template>
                </div>
                <div class="res_count_prompt">{{ show_percent ? i18n('Количество публикаций') : i18n('Доля публикаций на выделенных источниках') }}</div>
                <VRange v-if="r_type == 1" :percent="res_news_info"></VRange>
                <VRange
                    v-else-if="r_type == 2"
                    :percent="res_news_info"
                ></VRange>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from "@/response/utils/i18n"
import VRange from "@/components/UI/VRange.vue";
import ResetFilter from "@/components/UI/icons/ResetFilter.vue"
import PieChart from "@/components/widgets/PieChart.vue";
import ColumnChart from "@/components/widgets/ColumnChart.vue";
import {
    getClippedResources,
    selected_languages,
    resource_clipped_news_count,
    resource_full_news_count,
    resource_count,
    select_language,
    reset_languages,
    has_selected_languages,
} from "@/response/data/index";
import {
    has_selected_resource,
    reset_resource,
    staced_column,
    has_selected_resource_sentiment,
    reset_sentiment_resource,
    selected_top_resources,
    each_number,
    resource_news_count,
    start_top_resources,
    maxRange,
    inColumnPercentage,
    showColumnPercentage,
} from "@/response/options/columnOptions";
import {
    has_selected_categories,
    reset_categories,
} from "@/response/options/pieOptions";
import { r_type, languages_count, lang } from "@/response/header";
import { getItems } from "@/response/api";

import {
    soc_metrics,
    selected_soc_metrics,
    enable_metrics,
    selected_regions,
    selected_page,
    resource_count_loading,
    laoding_metrics,
    is_high_news_count,
} from "@/response/data/index";
import { get_map_keys } from "@/response/options/mapOptions";

export default {
    watch: {
        selected_soc_metrics() {
            if (this.selected_page == 1) {
                this.getItems();
            } else {
                this.selected_page = 1;
            }
        },
    },

    components: {
        PieChart,
        ColumnChart,
        VRange,
        ResetFilter,
    },
    methods: {
        set_each_number(option) {
            this.each_number = option;
        },
        imgUrl(pet) {
            var images = require.context(
                "@/assets/languages/",
                false,
                /\.png$/
            );
            return images("./" + pet + ".png");
        },
        text(text, font = 15) {
            let context = document.createElement("canvas").getContext("2d");
            context.font = font + "px Arial";
            return parseInt(context.measureText(text + "").width) + 14 + "px";
        },
    },
    computed: {
        max_lang_filtered_count() {
            let filled_counts = Object.values(this.languages_count).map(
                (lang) => lang.filled_count
            );
            return Math.max(...filled_counts);
        },
        defaultParalax() {
            return `rotateX(calc(${this.rX} * 1deg)) rotateY(calc(${this.rY} * 1deg))`;
        },
        get_languages() {
            return [
                {
                    id: 10,
                    name: "Казахский",
                    img: "kz",
                    img_width: 30,
                },
                {
                    id: 4,
                    name: "Русский",
                    img: "ru",
                    img_width: 30,
                },
                {
                    id: 5,
                    name: "Английский",
                    img: "en",
                    img_width: 30,
                },
                {
                    id: 3,
                    name: "Другие",
                    img: "other",
                    img_width: 24,
                },
            ];
        },
        res_news_info() {
            let selected_res_news = (this.selected_top_resources * this.each_number) + 1;

            // if (selected_res_news > this.resource_count) selected_res_news = this.resource_count;

            return selected_res_news;
        },
        res_news_percentage() {
            // let all_res_news_count = this.getClippedResources.clipped.reduce((start, next) => (start += next.total ?? 0), 0);
            // let full_res_news_count = this.data_creator.resource.reduce((start, next) => (start += next.total ?? 0), 0);


            let percent =
                Math.round(
                    (this.resource_clipped_news_count /
                        this.resource_full_news_count) *
                        100 *
                        10
                ) / 10;

            console.log('res_news_percentage', percent)

            if (Number(percent ?? 0) > 100) return "100%";

            if (isNaN(percent)) percent = 0;

            return percent + "%";
        },
        res_slider_percentage() {
            let all_res_news_count = +this.getClippedResources.clipped.length;
            let percent =
                Math.round((this.each_number / all_res_news_count) * 100 * 10) /
                10;

            return percent + "px";
        },
    },
    data() {
        return {
            each_numbers: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            show_percent: false,
            rX: 0,
            rY: 0,
        };
    },
    setup() {
        return {
            i18n,
            laoding_metrics,
            is_high_news_count,
            resource_count_loading,
            enable_metrics,
            get_map_keys,
            selected_regions,
            selected_page,
            getItems,
            languages_count,
            lang,
            soc_metrics,
            selected_soc_metrics,
            select_language,
            reset_languages,
            selected_languages,
            has_selected_languages,
            resource_clipped_news_count,
            resource_full_news_count,
            resource_count,
            has_selected_resource,
            has_selected_resource_sentiment,
            reset_resource,
            reset_sentiment_resource,
            staced_column,
            selected_top_resources,
            each_number,
            resource_news_count,
            getClippedResources,
            start_top_resources,
            has_selected_categories,
            reset_categories,
            maxRange,
            inColumnPercentage,
            showColumnPercentage,
            r_type,
        };
    },
};
</script>

<style>
.p-x-14 {
    padding: 0 14px;
}

.toggle {
    cursor: pointer;
    display: inline-block;
}

.toggle-switch {
    display: inline-block;
    background: #ccc;
    border-radius: 16px;
    width: 40px;
    height: 15px;
    min-width: 43px;
    min-height: 15px;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
}
.toggle-switch:before,
.toggle-switch:after {
    content: "";
}
.toggle-switch:before {
    display: block;
    background: linear-gradient(to bottom, #fff 0%, #eee 100%);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    width: calc(20%);
    min-width: 9px;
    height: calc(100% - 6px);
    min-height: 9px;
    position: absolute;
    top: 19%; /* 2.5px */
    left: 4px;
    transition: left 0.25s;
}
.toggle:hover .toggle-switch:before {
    background: linear-gradient(to bottom, #fff 0%, #fff 100%);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
}
.toggle-checkbox:checked + .toggle-switch {
    background: #3b5998;
}
.toggle-checkbox:checked + .toggle-switch:before {
    left: calc(100% - 9px - 3px);
}

.toggle-checkbox {
    position: absolute;
    visibility: hidden;
}

.toggle-label {
    margin-left: 5px;
    position: relative;
    top: 2px;
}

.fa-spinner {
    animation: lds-ellipsis1 1s infinite linear;
    height: 1em;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}

.please_wait_metrics {
    margin: 3px 14px 14px 14px;
    line-height: 16px;
    font-size: 12.5px;
    padding: 8px;
    background: #cccccc54;
    border-radius: 5px;
    border: 3px solid #ccc;
    transition: .15s;
    opacity: 1;
}
</style>
