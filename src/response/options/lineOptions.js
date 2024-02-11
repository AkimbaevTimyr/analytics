import "@/response/utils";


import Highcharts from "highcharts";
import { f_time, s_time } from "@/data";

// динамика график

Highcharts.setOptions({
    lang: {
        months: Object.keys({
            [i18n('Январь')]: true,
            [i18n('Февраль')]: true,
            [i18n('Март')]: true,
            [i18n('Апрель')]: true,
            [i18n('Май')]: true,
            [i18n('Июнь')]: true,
            [i18n('Июль')]: true,
            [i18n('Август')]: true,
            [i18n('Сентябрь')]: true,
            [i18n('Октябрь')]: true,
            [i18n('Ноябрь')]: true,
            [i18n('Декабрь')]: true,
        }),
        shortMonths: Object.keys({
            [i18n('Янв')]: true,
            [i18n('Фев')]: true,
            [i18n('Март')]: true,
            [i18n('Апр')]: true,
            [i18n('Май')]: true,
            [i18n('Июнь')]: true,
            [i18n('Июль')]: true,
            [i18n('Авг')]: true,
            [i18n('Сент')]: true,
            [i18n('Окт')]: true,
            [i18n('Ноя')]: true,
            [i18n('Дек')]: true,
        }),
        weekdays: Object.keys({
            [i18n('Воскресенье')]: true,
            [i18n('Понедельник')]: true,
            [i18n('Вторник')]: true,
            [i18n('Среда')]: true,
            [i18n('Четверг')]: true,
            [i18n('Пятница')]: true,
            [i18n('Суббота')]: true,
        })
    },
});

import {
    selected_dates,
    selected_sentiment_dates,
    dynamics,
    selected_date_mode,
    date_modes,
    selected_page,
    dateRange,
} from "@/response/data/index";
import { computed, reactive, ref } from "vue";

import i18n from "@/response/utils/i18n"
import { getDynamicsData, getGeneralCount, getSocialMetrics, getItems } from '@/response/api'
import { r_type, selected_main_sentiments } from "../header";

export const basic_line = reactive(ref(true));


export const reset_dynamics = function () {
    selected_dates.value.dates = {};
    getDynamicsData();
};
export const has_selected_date = computed(() => {
    return (
        Object.values(selected_dates.value.dates).find(
            (selected_date) => selected_date
        ) !== undefined
    );
});

function getSortedEntries() {
    return [
        "1",
        "0",
        "-1",
    ]
    // .filter(sentiment => selected_main_sentiments.value[sentiment]);
}

export const reset_sentiment_dynamics = function () {
    selected_sentiment_dates.value.dates = {
        1: {},
        0: {},
        "-1": {},
    };
    getDynamicsData();
};
export const has_selected_sentiment_date = computed(() => {
    return (
        [
            ...Object.values(selected_sentiment_dates.value.dates["1"]),
            ...Object.values(selected_sentiment_dates.value.dates["0"]),
            ...Object.values(selected_sentiment_dates.value.dates["-1"]),
        ].find((selected_date) => selected_date) !== undefined
    );
});

// let minRange;
let sentimentColor = {
    1: "#18BB9C", // #1CB394
    0: "#F2B90A",
    "-1": "#f2696b", // #EC5E5E
};
let color_to_sentiment = {
    "#18BB9C": "1",
    "#F2B90A": "0",
    "#f2696b": "-1", // #EC5E5E
};



//график
export const lineOptions = computed(() => {
    return {
        credits: false,

        chart: {
            zoomType: "x",
            resetZoomButton: {
                position:{
                    align: 'left',
                    verticalAlign: 'top',
                    x: -10,
                    y: -12
                }
            },
            events: {
                load: function () {
                    basic_line.value = true;
                    this.series.forEach((series) => {
                        if (series.name !== "Кривая") {
                            series.hide();
                        }
                    });
                },
            },
            margin: [8 + 4, 15, 28], // [8 + 4, 5, 25, 35] // [0,5,25,35]
            height: 200 + 44
        },
        title: { text: "" },

        legend: {

            align: "right",
            verticalAlign: "top",
            floating: true,
            x: -10,
            y: -17,

            reversed: true,
            labelFormat: "&nbsp;",
            margin: -5,
            //symbolPadding: 20,
            itemDistance: 18,
            itemStyle: {
                //"width": "20px",
                height: "10px",
                cursor: "pointer",
                fontSize: 11,
            },
            itemCheckboxStyle: {
                width: "20px",
                height: "10px",
                cursor: "pointer",
            },

            enabled: true,
        },

        xAxis: {
            type: "datetime",
            minRange: date_modes.value[selected_date_mode.value][3],
            gridLineWidth: 1,
            gridLineColor: "#e4e4e4",
            gridLineDashStyle: "dot",
            ...( dateRange.value.startDate == dateRange.value.endDate ? {} : {
                min: new Date(`${dateRange.value.startDate} ${s_time.value}:00`).valueOf(),
                max: new Date(`${dateRange.value.endDate} ${f_time.value}:59`).valueOf(),
                // min: new Date(`${dateRange.value.startDate} 00:00:00`).valueOf(),
                // max: new Date(`${dateRange.value.endDate} 23:59:59`).valueOf(),
            })
        },

        yAxis: {
            categories: [],
            labels: {
                style: { color: "#333" },
            },
            allowDecimals: false,
            title: { text: "" },
            min: 0,
            tickInterval: 1,
            gridLineWidth: 1,
            gridLineColor: "#e4e4e4",
            gridLineDashStyle: "dot",

            height: "101.5%",
        },

        tooltip: {
            pointFormat: `${i18n('Публикаций')}: <b>{point.y}</b><br/>`,
        },

        plotOptions: {
            series: {
                allowPointSelect: true,
                lineWidth: 1.5,
                fillOpacity: 0.1,
                marker: {
                    symbol: "diamond",
                    radius: 1.0,

                    states: {
                        select: {
                            radius: 5.0,
                            enabled: true,
                            fillColor: "#A7B1C2",
                            lineColor: "#2f4050",
                        },
                    },
                },
            },
        },

        series: [
            ...getSortedEntries().map((key) => ({
                events: {
                    click: function (e) {
                        if (e.shiftKey) {
                            if (selected_date_mode.value == 'weekly') {
                                e.point.options.week_dates.forEach(date => {
                                    selected_sentiment_dates.value.dates[
                                        color_to_sentiment[e.point.color]
                                    ][date] = !e.point.selected;
                                })
                            }
                            else {
                                selected_sentiment_dates.value.dates[
                                    color_to_sentiment[e.point.color]
                                ][e.point.options.date] = !e.point.selected;
                            }
                        } else {
                            selected_sentiment_dates.value.dates = {
                                1: {},
                                0: {},
                                "-1": {},
                            };
                            
                            if (selected_date_mode.value == 'weekly') {
                                selected_sentiment_dates.value.dates[
                                    color_to_sentiment[e.point.color]
                                ] = e.point.options.week_dates.reduce((prev,date) => ({
                                    ...prev,
                                    [date]: !e.point.selected
                                }), {})
                            }
                            else {
                                selected_sentiment_dates.value.dates[
                                    color_to_sentiment[e.point.color]
                                ] = {
                                    [e.point.options.date]: !e.point.selected,
                                };
                            }
                        }
                        getGeneralCount()
                        if (r_type.value == 2) {
                            getSocialMetrics()
                        }

                        if (selected_page.value == 1) {
                            getItems()
                        }
                        else {
                            selected_page.value = 1
                        }
                    },
                    legendItemClick: function () {
                        let default_series = this.chart.series.find(
                            (series) => series.name === "Кривая"
                        );
                        let sentimetn_series = this.chart.series.filter(
                            (series) => series.name !== "Кривая" && series.visible
                        );
                        if (!selected_main_sentiments.value[this.name]) {
                            this.show();
                        }
                        else if (default_series.visible) {
                            if (!this.visible) {
                                default_series.hide();
                                basic_line.value = false;
                            }
                        }
                        else if (sentimetn_series.length == 1) {
                            if (sentimetn_series[0].name == this.name && this.visible) {
                                default_series.show();
                                basic_line.value = true;
                            }
                        }
                    },
                },
                type: "areaspline",
                cursor: "pointer",
                //visible: false,
                color: sentimentColor[key],
                name: key,
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(2022, 9, 26),
                data: dynamics.value.map((date) => {
                    let temp_date = JSON.parse(JSON.stringify(date))
                    temp_date.y = temp_date[key]
                    temp_date.selected =
                        selected_sentiment_dates.value.dates[key][date.date];
                    return temp_date;
                }),
            })),
            {
            
                events: {
                    click: function (e) {
                        if (e.shiftKey) {
                            if (selected_date_mode.value == 'weekly') {
                                e.point.options.week_dates.forEach(date => {
                                    selected_dates.value.dates[date] = !e.point.selected;
                                })
                            }
                            else {
                                selected_dates.value.dates[e.point.options.date] =
                                    !e.point.selected;
                            }
                        } else {
                            if (selected_date_mode.value == 'weekly') {
                                selected_dates.value.dates = e.point.options.week_dates.reduce((prev,date) => ({
                                    ...prev,
                                    [date]: !e.point.selected
                                }), {})
                            }
                            else {
                                selected_dates.value.dates = {
                                    [e.point.options.date]: !e.point.selected,
                                };
                            }
                        }
                        getGeneralCount()
                        if (r_type.value == 2) {
                            getSocialMetrics()
                        }

                        if (selected_page.value == 1) {
                            getItems()
                        }
                        else {
                            selected_page.value = 1
                        }
                    },
                    legendItemClick: function () {
                        basic_line.value = true;
                        this.chart.series.forEach((series) => {
                            if (series.name !== this.name) {
                                if (this.visible) {
                                    if (selected_main_sentiments.value[series.name]) {
                                        series.show();
                                        basic_line.value = false;
                                    }
                                } else {
                                    series.hide();
                                }
                            }
                        });
                    },
                },
                name: "Кривая",
                type: "areaspline",
                cursor: "pointer",
                color: "#7cb5ec",
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(2022, 9, 26),
                data: dynamics.value.map(
                    (date) => {
                        date.selected = selected_dates.value.dates[date.date];
                        return date;
                    }
                ),
                //showInLegend: false,
            },
        ],
    };
});

function getCallback() {

        return date => (`'${date}'`);
}

export const selected_dates_query = computed(() => (
    Object.keys(selected_dates.value.dates)
        .filter(date => selected_dates.value.dates[date])
        .map(getCallback())
        .join(',')
))

export const selected_sentiment_dates_query = computed(() => {
    let s_s_d = {};
    Object.keys(selected_sentiment_dates.value.dates).forEach(sent => {
        s_s_d[sent] =
            Object.keys(selected_sentiment_dates.value.dates[sent])
                .filter(date => selected_sentiment_dates.value.dates[sent][date])
                .map(getCallback())
                .join(',');

    });

    return s_s_d;
})