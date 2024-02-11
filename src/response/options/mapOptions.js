import { computed, reactive, ref, watch } from 'vue';

import i18n from "@/response/utils/i18n"
import { reset_sentiment } from "@/response/options/barOptions"

import Highcharts from "highcharts";
import { selected_regions, places, current_country_id, getCountryRegions, country_regions_loading } from "@/response/data/index"
import { isKazakstan, countries } from "@/response/header"

export const map_switch = reactive(ref(isKazakstan.value))

watch(selected_regions, () => {
    get_map_keys.value.map(key => key);
});

export const toggle_map_switcher = (country_id, regions_file_name) => {
    map_switch.value = !map_switch.value;
    if (country_id) {
        getCountryRegions(regions_file_name, country_id)
    }
}

const map_switcher = computed(() => (
    isKazakstan.value || map_switch.value
))

export const map_type_switcher = computed(() => (
    map_switch.value ? 'regions' : (isKazakstan.value ? "regions" : "countries")
))

export const region_active = reactive(ref({}))

export const reset_regions = () => {
    Object.keys(selected_regions.value).forEach(id => {
        selected_regions.value[id] = false
    })
}

export const get_map_params = computed(() => {
    let map_params = Object.keys(selected_regions.value)
        .filter(id => selected_regions.value[id]);

    map_params = map_params.reduce((prev, id) => {
        if (id.includes('_')) {
            prev.regions.push(id.split('_')[1])
        }
        else {
            prev.countries.push(id)
        }
        return prev
    }, {
        countries: [],
        regions: [],
    })

    return map_params
})

export const get_map_keys = computed(() => {
    return Object.keys(selected_regions.value)
        .filter(id => selected_regions.value[id]);
})

// выбор одного региона
// в selected лежит текст по типу - clicked-item-from-region-list
export const select_one_region = (id, selected) => {

    let selected_region_count = Object.values(selected_regions.value).filter(bool => bool).length;
    let old_bool = selected_regions.value[id];
    reset_regions()
    // ?
    let bool = selected == 'clicked-item-from-region-list' ? !old_bool : selected;
    if (selected_region_count > 1) {
        bool = true;
    }
    // ставим выбранному региону тру
    selected_regions.value[id] = bool;

}

// метод для выбора нескольких регионов
// id регоина Казахстан id 57
export const select_region = (id, selected) => {
    selected_regions.value[id] = selected == 'clicked-item-from-region-list' ? !selected_regions.value[id] : selected;
    if ((id + '').includes('_') && selected_regions.value[id]) {
        selected_regions.value[id.split('_')[0]] = false
    }
    else if (!(id + '').includes('_') && selected_regions.value[id]) {
        Object.keys(selected_regions.value).forEach(region_id => {
            if ((region_id + '').includes('_') && selected_regions.value[region_id]) {
                selected_regions.value[region_id] = false
            }
        })
    }
}

// при наведении на регинон меняется его цвет
export function region__MouseOver(hc_key) {
    let element = document.querySelector(`.highcharts-key-${hc_key}`)
    if (element) {
        old_color = element.getAttribute('fill')
        element.setAttribute('fill', 'rgb(26,179,148)')
    }
}

let old_color = ''

// при убирании курсора с региона убирается его цвет
export function region__MouseOut(hc_key, selected) {
    let element = document.querySelector(`.highcharts-key-${hc_key}`)
    if (element && !selected && old_color != 'rgb(26,179,148)') {
        element.setAttribute('fill', old_color)
    }
}

// скрол до выбранного региона
export const regionMouseOver = function (id, hc_key) {
    region_active.value[id] = true;
    const element = document.querySelector(".region." + hc_key);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "end" });
}

export const regionMouseOut = function (id) {
    region_active.value[id] = false;
}

function getMapData(obj) {
    if (!obj?.features) return [];
    return obj.features.map(region => ({
        'hc-key': region?.properties['hc-key'],
        value: null,
    }))
}

export let mapOptions = computed(() => ({
    chart: {
        map: (map_switcher.value ? `map-${countries.value[current_country_id.value]?.regions_file_name}` : "map-world"),
        animation: false,
        margin: 0,
    },
    title: {
        text: ""
    },
    credits: {
        enabled: false
    },
    subtitle: {
        text:
            ''
    },
    mapNavigation: {
        enabled: true,
        enableButtons: false,

        mouseWheelSensitivity: 1.3,
        buttonOptions: {
            verticalAlign: 'bottom',
            height: 10,
            width: 10,
        },
    },

    colorAxis: {
        min: 1,
        max: 50000,
        type: 'logarithmic',
        minColor: '#c5e1fb',
        maxColor: '#084c8e',
        stops: [
            [0, '#EFEFFF'],
            [0.67, '#3069a0'],
            [1, '#084c8e']
        ]
    },

    // отображение региона и публикаций при наведении на страну или регоин
    tooltip: {
        headerFormat: `<span style="font-size:11px"><b>${i18n('Регион')}:</b></span>`,
        pointFormat: `<span> {point.country}<br> <b>${i18n('Публикаций')}:</b> {point.value}</span></br>`,
        shared: true,
        useHTML: true,
    },

    legend: {
        enabled: false
    },

    series: [
        {
            point: {
                events: {
                    click: function (e) {
                        reset_sentiment()
                        // ?
                        this.selected = !this.selected
                        if (e.shiftKey) {
                            select_region(this['id'], this.selected)
                        }
                        else {
                            select_one_region(this['id'], this.selected)
                        }
                    },
                    mouseOver: function () {
                        old_color = this.color
                        regionMouseOver(this.options.id, this.options['hc-key'])
                    },
                    mouseOut: function () {
                        regionMouseOut(this.options.id)
                    },
                }
            },
            borderWidth: .4,
            name: "",
            dataLabels: {
                enabled: true,

                format: ""
            },
            states: {
                hover: {
                    color: "rgb(26,179,148)"
                },
                select: {
                    color: "rgb(26,179,148)",
                    enabled: true
                },
            },

            mapData: Highcharts.maps[map_switcher.value ? `map-${countries.value[current_country_id.value]?.regions_file_name}` : "map-world"],
            //allAreas: false,
            //заполняем данными карту
            data: (country_regions_loading.value ? [] : getMapData(Highcharts.maps[(map_switcher.value ? `map-${countries.value[current_country_id.value]?.regions_file_name}` : "map-world")])).map(item => {
                // если  item  null, регион не будет  выделяться

                // спросить где лежат страны юсера
                // получаем данные по стране региону по hc-key
                // map_type_switcher - regions - conuntries
                let find_cntry = places.value[map_type_switcher.value][item['hc-key']];
                // find_cntry = {
                //     "id": 61,"value": 12,
                //     "resources": 5,
                //     "negative": 3,
                //     "neutral": 0,
                //     "positive": 9,
                //     "ru": 12,
                //     "kz": 0,
                //     "en": 0,
                //     "others": 0,
                //     "hc-key": "uz",
                //     "country": "Узбекистан"
                // }
                // console.log(find_cntry, 'country_find');

                if (find_cntry != undefined) {
                    //если страна в списке выбранных то значит она выбранная
                    find_cntry.selected = selected_regions.value[find_cntry.id];
                    //устнавливаем цвет для выбранной страны
                    if (find_cntry.color == 'rgb(26,179,148)') {
                        let { color, ...temp_find_cntry } = find_cntry
                        color;
                        find_cntry = temp_find_cntry
                    }
                    return find_cntry;
                }
                else {
                    return item;
                }
            })
            
        }
    ]
}));
