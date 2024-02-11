import '@/response/utils'


//категория источника
import {
    smi_category,
    languages_general_data,
    categories_general_data,
    languages_count,
} from '@/response/header'

import i18n from '@/response/utils/i18n'

import { computed, reactive, ref, watch } from 'vue';
import { get_selected_categories, selected_categories, selected_languages } from '@/response/data/index';

let pie_colors = [
    "rgb(55,112,167)",
    "rgb(73,130,185)",
    "rgb(91,148,203)",
    "rgb(109,166,221)",
    "rgb(127,184,239)",
    "rgb(145,202,255)",
    "rgb(164,221,255)",
    "rgb(182,239,255)",
    "rgb(200,255,255)",
    "rgb(218,255,255)",
    "rgb(236,255,255)",
    "rgb(255,255,255)",
    "rgb(255,255,255)",
    "rgb(255,255,255)"
];

const categories_copy = reactive(ref(
    smi_category.value.reduce((start, cat) => {
        start[cat.id_cat] = cat;
        return start;
    }, {})
));
watch(categories_copy, () => {
    selected_categories.value = Object.values(categories_copy.value).reduce((start, cat) => {
        if (cat.color == "#cccccc") {
            start[cat.id_cat] = null;
        }
        else {
            start[cat.id_cat] = cat.selected == true;
        }
        return start;
    }, {})

    get_selected_categories.value = (() => {
        let selected_cats = Object.keys(selected_categories.value).filter(id_cat => (selected_categories.value[id_cat]));
        if (selected_cats.length) {
            return selected_cats;
        }
        else {
            return Object.keys(selected_categories.value).filter(id_cat => (selected_categories.value[id_cat] !== null));
        }
    })()

    
    Object.keys(languages_general_data.value).forEach(lang_id => {
        languages_count.value[lang_id].filled_count = 0
    })


    let _array = get_selected_categories.value.length ? get_selected_categories.value : smi_category.value.map(category => (category.id_cat));

    _array.forEach(selected_category => {
        Object.entries(categories_general_data.value[selected_category])
            .forEach(([lang_id, category_sum]) => {
                languages_count.value[lang_id].filled_count += category_sum
            })
    })

    console.log('categories_copy watcher', selected_categories.value);
})

export const has_selected_categories = computed(() => (Object.values(selected_categories.value).filter(cat => (cat || cat === null)).length != 0))
export const reset_categories = () => {
    categories_copy.value = {};
}


// categories - [id_cat: cat_id,
//     name: i18n(smi_categories.value[cat_id]?.name_cat),
//     y: Object.values(categories_general_data.value[cat_id]).reduce((a,b) => (a+b))]
function sort_by_lang(categories) {
    let _categories = {};
    let selected_lang_ids = Object.keys(selected_languages.value)
        .filter(lang_id => (selected_languages.value[lang_id]))

    console.log(selected_lang_ids, 'check');
    _categories = JSON.parse(JSON.stringify(categories)).reduce((prev, category) => {
        //для фильтра по языкам, сбрасываем кооиче публикаций
        if (selected_lang_ids.length) {
            category.y = 0
        }
        return {
            ...prev,
            [category.id_cat]: category
        }
    }, {})
    console.log(_categories, 'check')

    if (selected_lang_ids.length) {
        selected_lang_ids.forEach(lang_id => {
            Object.entries(languages_general_data.value[lang_id])
                .forEach(([category_id, category_sum]) => {
                    // тут заполняется колоичество публикаций
                    _categories[category_id].y += category_sum
                })
        })
    }

    _categories = Object.values(_categories)
    _categories.sort((a,b) => (b.y - a.y))

    return _categories;
}

export const pieOptions = computed(() => {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,

            type: 'pie',

            margin: [0, -20, 0, null],
        },
        credits: false,
        title: {
            text: '',
        },
        legend: {
            align: 'left',
            verticalAlign: 'middle',
            layout: 'vertical',
            x: 0,
            labelFormat: "{name}", // : {y}
            padding: 0,
            margin: 0,
            itemMarginBottom: 2.5,
            itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "400", "textOverflow": "ellipsis" }
        },
        tooltip: {
            headerFormat: `<span style="font-size:11px"><b>${i18n('Категория')}:</b> {point.key}</span></br>`,
            pointFormat: `<span><b>${i18n('Публикаций')}:</b> {point.y} ({point.percentage:.1f}%)</span></br>`,
            shared: true,
            useHTML: true
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                point: {
                    events: {
                        legendItemClick: function (event) {
                            this.visible = !this.visible;
                            if (event?.browserEvent?.ctrlKey) {

                                this.color = this.options.color = pie_colors[smi_category.value.findIndex(cat => (cat.name === this.name))];

                                categories_copy.value = this.series.data.reduce((start, cat) => {
                                    if (this.options.name !== cat.options.name) cat.options.color = '#cccccc'

                                    cat.options.selected = cat.options.color == '#cccccc' ? null : false;
                                    start[cat.options.id_cat] = cat.options;
                                    return start;
                                }, {})
                                return
                            }
                            if (this.color == "#cccccc") {
                                this.color = this.options.color = pie_colors[smi_category.value.findIndex(cat => (cat.name === this.name))];
                            }
                            else {
                                // if (Object.values(categories_copy.value).find(cat => cat.selected)?.selected) {
                                //     this.selected = this.options.selected = false;
                                //     this.sliced = this.options.sliced = false;
                                //     this.color = this.options.color = "#cccccc";
                                // }
                                // else {
                                //     this.color = this.options.color = pie_colors[smi_category.value.findIndex(cat => (cat.name === this.name))];
                                // }
                                this.selected = this.options.selected = false;
                                this.sliced = this.options.sliced = false;
                                this.color = this.options.color = "#cccccc";
                            }

                            console.log('before run watcher', JSON.parse(JSON.stringify(categories_copy.value)));

                            categories_copy.value = this.series.data.reduce((start, cat) => {
                                if (cat.options.color == '#cccccc') {
                                    cat.options.selected = null;
                                }
                                start[cat.options.id_cat] = cat.options;
                                return start;
                            }, {})
                            console.log('run watcher', categories_copy.value);

                        },
                        click: function () {
                            if (this.color == "#cccccc") {
                                this.selected = !this.selected;
                            }

                            categories_copy.value = this.series.data.reduce((start, cat) => {
                                start[cat.options.id_cat] = cat.options;
                                return start;
                            }, {})

                        },
                    },
                },
                size: 120,
                colors: pie_colors,

                states: {
                    inactive: {
                        enabled: false
                    },
                },
                allowPointSelect: true,
                showInLegend: true,
                cursor: 'pointer',
                dataLabels: {
                    distance: 10,
                    padding: -1,
                    enabled: false,
                }
            }
        },
        series: [{
            innerSize: '65%',
            data: sort_by_lang(smi_category.value).map(cat => {
                if (selected_categories.value[cat.id_cat] === null) {
                    cat.color = "#cccccc";
                    cat.selected = cat.sliced = false;
                }
                else {
                    cat.color = undefined;
                    cat.selected = cat.sliced = selected_categories.value[cat.id_cat];
                }
                return cat;
            })
        }]
    }
})
