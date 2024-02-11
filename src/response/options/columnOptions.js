import "@/response/utils";

import { computed, reactive, ref } from "vue";
import { countries, r_type, regions, smi_categories } from "@/response/header";
import {
    getClippedResources,
    selected_resource_sentiment,
    selected_resources,
    resources,
    resource_names,
    resource_count,
} from "@/response/data/index";

import { s_time, f_time } from '@/data'

import i18n from '@/response/utils/i18n'

//источники публикаций график
export const inColumnPercentage = reactive(ref(false));
export const showColumnPercentage = reactive(ref(true));
export const each_number = reactive(ref(6));

export const maxRange = computed(
    () => Math.round(resource_count.value / each_number.value)
);

export const selected_top_resources = reactive(ref(0));
export const resource_news_count = computed(() => {
    return getClippedResources.value.clipped
        .slice(
            (selected_top_resources.value - start_top_resources.value) *
                each_number.value,
            (selected_top_resources.value - start_top_resources.value) *
                each_number.value +
                each_number.value
        )
        .reduce((v, n) => (v += n.total), 0);
});
export const staced_column = reactive(ref(true));

//==========================

export const has_selected_resource = computed(
    () =>
        Object.values(selected_resources.value.resources).find(
            (selected_resource) => selected_resource
        ) !== undefined
);
export const reset_resource = function () {
    selected_resources.value.resources = {};
};

//==========================

export const has_selected_resource_sentiment = computed(
    () =>
        [
            ...Object.values(
                selected_resource_sentiment.value.sentiment_resources["1"]
            ),
            ...Object.values(
                selected_resource_sentiment.value.sentiment_resources["0"]
            ),
            ...Object.values(
                selected_resource_sentiment.value.sentiment_resources["-1"]
            ),
        ].find((selected_resource) => selected_resource) !== undefined
);
export const reset_sentiment_resource = function () {
    selected_resource_sentiment.value.sentiment_resources = {
        1: {},
        0: {},
        "-1": {},
    };
};

import axios from 'axios'
import { get_map_params } from "@/response/options/mapOptions"
import { selected_categories, selected_languages, dateRange, get_selected_smi_categories } from "@/response/data/index"
import { selected_main_sentiments, project, selected_social_categories } from "@/response/header"

const waiting = reactive(ref(false))

export function getResourceData() {
    reset_sentiment_resource()
    reset_resource()
    let countries = get_map_params.value.countries.join(',')
    let regions = get_map_params.value.regions.join(',')
    let category_id;
    if (r_type.value == 2) {
        category_id = Object.keys(selected_social_categories.value).length ? (
            Object.keys(selected_social_categories.value).filter(soc_key => selected_social_categories.value[soc_key]).join(',')
        ) : 0;
    }
    else {
        category_id = get_selected_smi_categories(selected_categories.value).join(',');
    }
    let language = Object.keys(selected_languages.value).length ? (
        Object.keys(selected_languages.value).filter(lang_id => selected_languages.value[lang_id]).join(',')
    ) : '';
    let sentiments = Object.keys(selected_main_sentiments.value).filter(sentiment => selected_main_sentiments.value[sentiment]).join(',')
    // ожидание окончания запроса или типо того
    waiting.value = true
    console.log(`resource-data = category_id = ${category_id}`);
    axios
        //from нуженл для получения определнного количество новостей
        .get(`/ru/analyticstats/get-project-resource-data?p_id=${project.value.id}&r_type=${r_type.value}&category_id=${category_id}&countries=${countries}&regions=${regions}&sentiments=${sentiments}&language=${language}&s_date=${dateRange.value.startDate.format("Y-m-d")} ${s_time.value}&f_date=${dateRange.value.endDate.format("Y-m-d")} ${f_time.value}&from=${resources.value.length}&resource_length=${resource_count.value}`)
        .then(response => {
            console.log('response', response);
            if (response.data.empty_resource_ids) return;
            if (resources.value.length < resource_count.value) {
                resources.value = [...resources.value, ...response.data.resources];
                for (let index = response.data.resource_names.length - 1; index >= 0; index--) {
                    const resource = response.data.resource_names[index];
                    resource_names.value[resource.res_id] = {
                        name: resource.name,
                        link: resource.link,
                        category_id: resource?.category_id ?? undefined,
                        country_id: resource.country_id,
                        region_id: resource.region_id,
                    }
                }
            }
        })
        .then(() => {
            waiting.value = false
        })
        .catch(error => {
            console.error(error);
        })
}
export const max = reactive(
    ref(Math.round(resource_count.value / each_number.value))
);
export const start_top_resources = reactive(ref(0));
export const end_top_resources = reactive(
    ref(Math.round(resource_count.value / each_number.value))
);

export const maxClipped = computed(
    () =>
        Math.round(
            getClippedResources.value.clipped.length / each_number.value
        ) - 1
);

function getResourceLink (link) {
    if (link.includes(',http')) {
        return link.split(',http')[0] ?? link
    }
    else {
        return link
    }
}

function getSocialCategoryName (link) {
    if (link.includes('vk.')) return 'Вконтакте'
    else if (link.includes('t.me')) return 'Telegram'
    else if (link.includes('twitter.')) return 'Twitter'
    else if (link.includes('facebook.')) return 'Facebook'
    else if (link.includes('instagram.')) return 'Instagram'
    else if (link.includes('ok.')) return 'Однокласники'
    else if (link.includes('mail.')) return 'mail'
    else if (link.includes('youtube.')) return 'youtube'
}

// обрезка в определенном промежутке топ 6 на текущем ползунке
export const resources_sliced = computed(() => resources.value.slice(
    selected_top_resources.value * each_number.value,
    selected_top_resources.value * each_number.value +
        each_number.value
)
.map(resource => (
    {
        ...resource,
        name: resource_names.value[resource.res_id].name,
        link: resource_names.value[resource.res_id].link,
        category_name: r_type.value == 1 ? i18n(smi_categories.value[resource_names.value[resource.res_id]?.category_id].name_cat) : getSocialCategoryName(resource_names.value[resource.res_id].link),
        region_info: resource_names.value[resource.res_id].region_id == 0 ? '' : `</br><span style="font-size:11px;display:inline-flex;align-items:center;overflow:hidden;text-overflow:ellipsis"><b>${i18n('Регион')}:</b>&nbsp;&nbsp;${regions.value[resource_names.value[resource.res_id].region_id]?.name ?? 'Не определено'} </span>`,
        place_title: resource_names.value[resource.res_id].region_id == 0 ? `title="${countries.value[resource_names.value[resource.res_id].country_id].name}"` : '',
        place_country: countries.value[resource_names.value[resource.res_id].country_id]?.name ?? 'Не определено',
        place_hc: countries.value[resource_names.value[resource.res_id].country_id]?.hc,
    }
)))

export const resources_sliced_categories = computed(() => resources_sliced.value.map((res_id) => resource_names.value[res_id.res_id].name ?? ""))
export const resources_sliced_categories_obj = computed(() => resources_sliced.value.reduce((prev, res_id) => 
({
    ...prev,
    [resource_names.value[res_id.res_id].name]: resource_names.value[res_id.res_id].link ?? ""
}), {}))


let sentiment_names = {
    [i18n("Позитивные")]: "1",
    [i18n("Нейтральные")]: "0",
    [i18n("Негативные")]: "-1",
}
export const columnOptions = computed(() => {
    return {
        chart: {
            type: "column",
            height: 200 + 35 + 20,
            margin: [4 + 12, 12, null, 12], // [4, 5, 10, 35]
            defaultSeriesType: "line",
            events: {
                load: function () {
                    staced_column.value = true;
                    this.series.forEach((series) => {
                        if (series.name !== i18n("Публикаций")) {
                            series.hide();
                        }
                    });
                },
            },
        },
        credits: false,
        title: {
            text: "",
        },
        xAxis: {
            tickLength: 2,
            //visible: false,
            categories: resources_sliced_categories.value,
            labels: {
                autoRotation: [0, 0],
                padding: 0,
                style: {
                    textOverflow: "ellipsis",
                    // textDecoration: "underline",
                },

                useHTML: true,
                formatter: function() {
                    return `<a target="_blank" class="hover:underline" href="${getResourceLink(resources_sliced_categories_obj.value[this.value])}" title="${this.value}">${this.value}</a>`;
                },
            },
        },

        yAxis: {
            //enabled: false,
            min: 0,
            title: { enabled: false },
            labels: { enabled: false },
            stackLabels: {
                enabled: !(inColumnPercentage.value && !staced_column.value),
                style: {
                    fontWeight: "bold",
                    color: // theme
                        "gray",
                    textOutline: "none",
                },
            },
            opposite: true,
            tickPositions: inColumnPercentage.value && !staced_column.value ? false : [
                0,
                (+resources.value[0]?.y ?? 10) / 3,
                ((+resources.value[0]?.y ?? 10) / 3) * 2,
                (+resources.value[0]?.y ?? 10) +
                    (+resources.value[0]?.y ?? 10) / 12,
            ]
        },

        legend: {
            reversed: true,
            labelFormat: "&nbsp;",
            verticalAlign: "top",
            //symbolPadding: 30,
            itemDistance: 18,
            align: "right",
            x: -10,
            y: -17,
            //padding: 0,
        },
        tooltip: {
            //enabled: false,
            headerFormat:
                // `<span style="font-size:11px"><b>${i18n('Источник')}:</b> {point.key} </span></br>`+
                `<span style="font-size:11px"><b>${i18n('Категория')}:</b> {point.point.category_name} </span></br>`+
                `<span style="font-size:11px;display:inline-flex;align-items:center;overflow:hidden;text-overflow:ellipsis"><b>${i18n('Страна')}:</b>&nbsp;&nbsp;<img {place_title} src="/media/img/country/{point.point.place_hc}.png" width="22" height="22" alt=""> &nbsp;{point.point.place_country} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{point.point.region_info}`,
            pointFormat:
                // "</br><span><b>{series.name}:</b> {point.y}</span></br>",
                "",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                minPointLength: 3,
                borderWidth: 0,
                pointPadding: 0,
                states: {
                    select: {
                        borderWidth: 2,
                    },
                    inactive: {
                        enabled: false,
                    },
                },
                stacking: inColumnPercentage.value && !staced_column.value ? "percent" : "normal", // percent | normal

                dataLabels: {
                    enabled: true,
                    
                    format: inColumnPercentage.value && !staced_column.value && showColumnPercentage.value ? '{point.percentage:.1f}%' : undefined,
                    style: {
                        textOutline: "0px",
                        fontWeight: "400",
                        //color: 'white',
                        fontSize: "9px",
                    },
                },
            },
            series: {
                allowedit: true,
                crosshair: true,
                crosshairs: [
                    {
                        color: "#5D5D5D",
                        dashStyle: "dash",
                        width: 2,
                    },
                    {
                        color: "#5D5D5D",
                        dashStyle: "dash",
                        width: 2,
                    },
                ],
            },
        },
        // хранится 4 обьекта для негатива позитив нейтрал и общее количество
        series: [
            {
                events: {
                    click: function (e) {
                        if (e.shiftKey) {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources = {
                                ...selected_resource_sentiment.value.sentiment_resources,
                                [e.point.options.sentiment]: {
                                    ...selected_resource_sentiment.value.sentiment_resources[e.point.options.sentiment],
                                    [e.point.options.res_id]: e.point.selected
                                }
                            }
                            // selected_resource_sentiment.value.sentiment_resources[e.point.options.sentiment][e.point.options.res_id] = e.point.selected;
                        } else {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources =
                                {
                                    1: {},
                                    0: {},
                                    "-1": {},
                                };
                            selected_resource_sentiment.value.sentiment_resources[
                                e.point.options.sentiment
                            ][e.point.options.res_id] = e.point.selected;
                        }
                    },
                    legendItemClick: function () {
                        let default_series = this.chart.series.find(
                            (series) => series.name === i18n("Публикаций")
                        );
                        let sentiment_series = this.chart.series.filter(
                            (series) => series.name !== i18n("Публикаций") && series.visible
                        );
                        if (!selected_main_sentiments.value[sentiment_names[this.name]]) {
                            this.show();
                        }
                        else if (default_series.visible) {
                            if (!this.visible) {
                                default_series.hide();
                            }
                            staced_column.value = false
                        }
                        else if (sentiment_series.length == 1) {
                            if (sentiment_series[0].name == this.name && this.visible) {
                                default_series.show();
                                staced_column.value = true
                            }
                        }
                    },
                },
                // name не должен меняться
                name: i18n("Позитивные"),
                color: "#18BB9C", // #1CB394
                states: {
                    hover: {
                        color: "#157e69",
                        borderColor: "#157e69",
                    },
                    select: {
                        color: "#157e69",
                        borderColor: "#157e69",
                    },
                },
                tooltip: {
                    pointFormat:
                        // "</br><span><b>{series.name}:</b> {point.y}</span>",
                        "",
                },
                dataLabels: {
                    enabled: true,
                },
                //showInLegend: true,
                data: resources_sliced.value.map((res_id) => ({
                    ...res_id,
                    y: +res_id["1"],
                    sentiment: "1",
                    res_id: res_id.res_id,
                    selected:
                        selected_resource_sentiment.value.sentiment_resources[
                            "1"
                        ][res_id.res_id] === true,
                })),
            },
            {
                events: {
                    click: function (e) {
                        if (e.shiftKey) {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources = {
                                ...selected_resource_sentiment.value.sentiment_resources,
                                [e.point.options.sentiment]: {
                                    ...selected_resource_sentiment.value.sentiment_resources[e.point.options.sentiment],
                                    [e.point.options.res_id]: e.point.selected
                                }
                            }
                            selected_resource_sentiment.value.sentiment_resources[e.point.options.sentiment][e.point.options.res_id] = e.point.selected;
                        } else {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources =
                                {
                                    1: {},
                                    0: {},
                                    "-1": {},
                                };
                            selected_resource_sentiment.value.sentiment_resources[
                                e.point.options.sentiment
                            ][e.point.options.res_id] = e.point.selected;
                        }
                    },
                    legendItemClick: function () {
                        let default_series = this.chart.series.find(
                            (series) => series.name === i18n("Публикаций")
                        );
                        let sentiment_series = this.chart.series.filter(
                            (series) => series.name !== i18n("Публикаций") && series.visible
                        );
                        if (!selected_main_sentiments.value[sentiment_names[this.name]]) {
                            this.show();
                        }
                        else if (default_series.visible) {
                            if (!this.visible) {
                                default_series.hide();
                            }
                            staced_column.value = false
                        }
                        else if (sentiment_series.length == 1) {
                            if (sentiment_series[0].name == this.name && this.visible) {
                                default_series.show();
                                staced_column.value = true
                            }
                        }
                    },
                },
                name: i18n("Нейтральные"),
                color: "#F2B90A",
                states: {
                    hover: {
                        color: "#af8509",
                        borderColor: "#af8509",
                    },
                    select: {
                        color: "#af8509",
                        borderColor: "#af8509",
                    },
                },
                tooltip: {
                    pointFormat:
                        // "</br><span><b>{series.name}:</b> {point.y}</span>",
                        "",
                },
                dataLabels: {
                    enabled: true,
                },
                //showInLegend: true,
                data: resources_sliced.value.map((res_id) => ({
                    ...res_id,
                    y: +res_id["0"],
                    sentiment: "0",
                    res_id: res_id.res_id,
                    selected:
                        selected_resource_sentiment.value.sentiment_resources[
                            "0"
                        ][res_id.res_id] === true,
                })),
            },
            {
                events: {
                    click: function (e) {
                        if (e.shiftKey) {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources[
                                e.point.options.sentiment
                            ][e.point.options.res_id] = e.point.selected;
                        } else {
                            e.point.selected = !e.point.selected;
                            selected_resource_sentiment.value.sentiment_resources =
                                {
                                    1: {},
                                    0: {},
                                    "-1": {},
                                };
                            selected_resource_sentiment.value.sentiment_resources[
                                e.point.options.sentiment
                            ][e.point.options.res_id] = e.point.selected;
                        }
                    },
                    legendItemClick: function () {
                        let default_series = this.chart.series.find(
                            (series) => series.name === i18n("Публикаций")
                        );
                        let sentiment_series = this.chart.series.filter(
                            (series) => series.name !== i18n("Публикаций") && series.visible
                        );
                        if (!selected_main_sentiments.value[sentiment_names[this.name]]) {
                            this.show();
                        }
                        else if (default_series.visible) {
                            if (!this.visible) {
                                default_series.hide();
                            }
                            staced_column.value = false
                        }
                        else if (sentiment_series.length == 1) {
                            if (sentiment_series[0].name == this.name && this.visible) {
                                default_series.show();
                                staced_column.value = true
                            }
                        }
                    },
                },
                name: i18n("Негативные"),
                color: "#f2696b", // #EC5E5E
                states: {
                    hover: {
                        color: "#a03e3e",
                        borderColor: "#a03e3e",
                    },
                    select: {
                        color: "#a03e3e",
                        borderColor: "#a03e3e",
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                tooltip: {
                    pointFormat:
                        // "</br><span><b>{series.name}:</b> {point.y}</span>",
                        "",
                },
                //showInLegend: true,
                data: resources_sliced.value.map((res_id) => ({
                    ...res_id,
                    y: +res_id["-1"],
                    sentiment: "-1",
                    res_id: res_id.res_id,
                    selected:
                        selected_resource_sentiment.value.sentiment_resources[
                            "-1"
                        ][res_id.res_id] === true,
                })),
            },
            {
                events: {
                    click: function (e) {
                        //reset_sentiment_resource()
                        if (e.shiftKey) {
                            e.point.selected = !e.point.selected;
                            selected_resources.value.resources = {
                                ...selected_resources.value.resources,
                                [e.point.options.res_id]: e.point.selected
                            }
                            //selected_resources.value.resources[
                            //    e.point.options.res_id
                            //] = e.point.selected;
                        } else {
                            e.point.selected = !e.point.selected;
                            selected_resources.value.resources = {
                                [e.point.options.res_id]: e.point.selected,
                            };
                        }
                    },
                    legendItemClick: function () {
                        staced_column.value = true;
                        this.chart.series.forEach((series) => {
                            if (series.name !== this.name) {
                                if (this.visible) {
                                    if (selected_main_sentiments.value[sentiment_names[series.name]]) {
                                        series.show();
                                        staced_column.value = false;
                                    }
                                } else {
                                    series.hide();
                                }
                            }
                        });
                    },
                },

                name: i18n("Публикаций"),
                color: "#7cb5ec",
                states: {
                    hover: {
                        color: "#5986b3",
                        borderColor: "#5986b3",
                    },
                    select: {
                        color: "#5986b3",
                        borderColor: "#5986b3",
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                //showInLegend: false,
                data: (() => {
                    // запрос данных если их нету при перемещении
                    if (resources_sliced.value.length == 0 && resource_count.value && resources.value.length != resource_count.value && waiting.value === false) {
                        getResourceData()
                    }
                    return resources_sliced.value
                })()
                    .map((res_id) => ({
                        ...res_id,
                        // общее количество y
                        y: +res_id.y,
                        res_id: res_id.res_id,
                        selected:
                            selected_resources.value.resources[
                                res_id.res_id
                            ] === true,
                    })),
            },
        ]
        // .filter(series => series.name == i18n('Публикаций') || selected_main_sentiments.value[sentiment_names[series.name]]),
    };
});
