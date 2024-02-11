import {
    reactive,
    ref,
    computed,
    // watch,
} from "vue";
import { project, r_type, selected_social_categories } from '@/response/header'


function getRequest() {
    var params = {};

    if (window.location.href.match(/.*\?.*/)) {
        let tmp_params = window.location.href.replace(/.*\?/, "").split("&");
        for (var p = 0; p < tmp_params.length; p++) {
            var _tmp = tmp_params[p].split("=");

            params[_tmp[0]] = _tmp[1];
        }
    }
    return params;
}

export const request = getRequest();

export const dateRange = reactive(ref({
    startDate: request?.startDate ?? project.value.s_date,
    endDate: request?.endDate ?? project.value.f_date,
}))


export const country_regions_loading = reactive(ref(false))
export const thumbnail_dates = reactive(ref([]))

export const selected_categories = reactive(ref({}));

let years_period = new Date(dateRange.value.endDate).getFullYear() - new Date(dateRange.value.startDate).getFullYear();
let temp_date_mode = 'daily';
if (years_period > 2) {
    temp_date_mode = 'monthly';
}
export const selected_date_mode = reactive(ref(temp_date_mode));

// ограничения по дням неделям месяцам на динамике публикаций
export const date_modes = computed(() => {
    const days_period = ((
        new Date(dateRange.value.endDate).valueOf() - new Date(dateRange.value.startDate).valueOf()
    ) / 1000 / 3600 / 24) + 1


    return {
        hourly: ['по часам<br/>• если период не более 7 дней', 'fa-solid fa-clock', days_period <= 7, 1000 * 3600 * 24 * days_period],
        daily: ['по дням', 'fa fa-calendar', true, 1000 * 3600 * 24 * 30],
        weekly: ['по неделям<br/>• если период от 7 дней', 'fa fa-calendar-week', days_period >= 7, 1000 * 3600 * 24 * 7],
        monthly: ['по месяцам<br/>• если период от 3 дней', 'fa-solid fa-calendar-check', days_period >= 3, 1000 * 3600 * 24 * 30], // * 12
    }
});



export const get_selected_categories = reactive(ref([]));


export const get_selected_smi_categories = (temp_selected_categories) => {
    let selected_cats = Object.keys(temp_selected_categories).filter(id_cat => (temp_selected_categories[id_cat]));
    if (selected_cats.length) {
        return selected_cats;
    }
    else {
        return Object.keys(temp_selected_categories).filter(id_cat => (temp_selected_categories[id_cat] !== null));
    }
}

export const current_country_id = reactive(ref(57))
export const countries_with_regions = reactive(ref({}))
import axios from 'axios';
import Highcharts from "highcharts";

// функция для получени json карты регинов страны
export const getCountryRegions = (file_name = 'kz-all.js', country_id = 57) => {
    country_regions_loading.value = true;

    if (country_id) current_country_id.value = country_id;

    axios.get(`/myjs_css/js/highcharts/countries/${file_name}on`)
        .then(response => {
            if (response?.data) Highcharts.maps[`map-${file_name}`] = response?.data;
        })
        .finally(() => {
            country_regions_loading.value = false;
        })
}
export const places = reactive(ref({
    "regions": {},
    "countries": {},
}))

export const reset_all = reactive(ref(false))

export const selected_regions = reactive(ref({}))
export const dynamics = reactive(ref([]))
export const resources = reactive(ref([]))
export const resource_count = reactive(ref(0))
export const resource_names = reactive(ref({}))

export const offsetLeft = reactive(ref(0));
export const offsetRight = reactive(ref(0));
export const getClippedResources = reactive(ref({ clipped: [] }));
export const resource_clipped_news_count = reactive(ref(0));
export const resource_full_news_count = reactive(ref(0));
export const column_news_count = reactive(ref(0));


export const selected_languages = reactive(ref({
    "10": false,
    "4": false,
    "5": false,
    "3": false,
}))

export const has_selected_languages = computed(() =>
    Object.values(selected_languages.value).find((lang) => lang)
);

export function reset_languages() {
    selected_languages.value[3] = false
    selected_languages.value[4] = false
    selected_languages.value[5] = false
    selected_languages.value[10] = false
}

export function select_language(event, lang_id) {
    if (event.shiftKey) {
        selected_languages.value[lang_id] = !selected_languages.value[lang_id];
    } else {
        let lang_ids = Object.keys(selected_languages.value).filter(
            (langId) => selected_languages.value[langId]
        );
        selected_languages.value["10"] = false;
        selected_languages.value["4"] = false;
        selected_languages.value["5"] = false;
        selected_languages.value["3"] = false;
        if (lang_ids.length == 1 && lang_ids[0] == lang_id) {
            selected_languages.value[lang_id] =
                !selected_languages.value[lang_id];
        }
        selected_languages.value[lang_id] = !selected_languages.value[lang_id];
    }
}


//нужен для отображения страны или тональност
export const map = reactive(ref(true))
export const loading = reactive(ref(true))
export const project_data = reactive(ref({ value: {} }))

export const bars_sentiments_selected = reactive(ref({
    sentiment_places: {
        "1": {},
        "0": {},
        "-1": {},
    }
}));


export const selected_dates = reactive(ref({ dates: {} }))

export const selected_sentiment_dates = reactive(ref({
    dates: {
        "1": {},
        "0": {},
        "-1": {},
    }
}))


export const selected_resource_sentiment = reactive(
    ref({
        sentiment_resources: {
            1: {},
            0: {},
            "-1": {},
        }
    })
);

export const laoding_metrics = reactive(ref(false))
export const is_high_news_count = reactive(ref(false))
export const enable_metrics = reactive(ref(true))
export const soc_metrics = reactive(ref({
    likes: 0,
    comments: 0,
    reposts: 0,
    members: 0,
}))

export const selected_resources = reactive(ref({ resources: {} }));

export const selected_soc_metrics = reactive(ref(''));
export const resource_count_loading = reactive(ref(true));
export const similars_count = reactive(ref(false));
export const news_count = reactive(ref(0));
export const first_similar_date = reactive(ref(false));
export const selected_similars_page = reactive(ref(1));
export const set_selected_similars_page = page => {
    selected_similars_page.value = parseInt(page);
};
export const selected_page = reactive(ref(1));
export const set_selected_page = page => {
    selected_page.value = parseInt(page);
};
export const selected_label_page = reactive(ref(1));
export const item_modal = reactive(ref(false));
export const resources_count = reactive(ref(0));
export const similar_items = reactive(ref([]));
export const similar_items_loading = reactive(ref(true));
export const p_user_id = reactive(ref(null));
export const favorites = reactive(ref([]));
export const favorites_modal = reactive(ref(false));
export const items = reactive(ref([]));
export const items_loading = reactive(ref(true));
export const isGrouped = reactive(ref(false));
export const media_type = computed(() => {
    let soc_names = {
        "1": "vk",
        "2": "fb",
        "3": "tw",
        "4": "it",
        "5": "gp",
        "6": "yt",
        "7": "ok",
        "8": "mr",
        "9": "tg",
        "10": "tt"
    };
    if (r_type.value == 1) return 'smi';
    else {
        if (Object.values(selected_social_categories.value).includes(true)) {
            return Object.keys(selected_social_categories.value).filter(soc_id => selected_social_categories.value[soc_id]).map(soc_id => soc_names[soc_id]).join(',')
        }
        else if (r_type.value == 2) return 'socials';
    }
    return '';
});

export const filtered_news = reactive(ref({ filtered: [] }));
export const filtered_resources = reactive(ref({ filtered: 0 }));



// ChatGPT

// отвечает за отображение определенного таба при открытии модалки у новости
export let chatgpt_tab = reactive(ref('TextAnalyze'))
export let chatgpt_item = reactive(ref(null))
export let chatgpt_log = reactive(ref(null))


export function chatgpt_more(log) {

    chatgpt_log.value = log
    chatgpt_tab.value = 'TextAnalyze'
}
