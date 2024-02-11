import { computed, reactive, ref } from "vue";

export const r_type = reactive(ref(1));
export const lang = reactive(ref(false));
export const languages_general_data = reactive(ref({}));
export const categories_general_data = reactive(ref({}));
export const socials = reactive(ref({}));
export const countries = reactive(ref({}));
export const regions = reactive(ref({}));
export const smi_categories = reactive(ref({}));
export const main_sentiments_count = reactive(ref({
    "-1": 0,
    0: 0,
    1: 0,
}));
export const generals_count = reactive(ref({
    1: {
        count: 0,
        "-1": 0,
        "0": 0,
        "1": 0,
    },
    2: {
        count: 0,
        "-1": 0,
        "0": 0,
        "1": 0,
    }
}));
export const social_categories = reactive(ref([
    {id:2,count:0,"-1":0,"0":0,"1":0,icon:"facebook-square"},
    {id:4,count:0,"-1":0,"0":0,"1":0,icon:"instagram"},
    {id:3,count:0,"-1":0,"0":0,"1":0,icon:"twitter"},
    {id:7,count:0,"-1":0,"0":0,"1":0,icon:"odnoklassniki-square"},
    {id:1,count:0,"-1":0,"0":0,"1":0,icon:"vk"},
    {id:8,count:0,"-1":0,"0":0,"1":0,icon:"at"},
    // {id:5,count:0,"-1":0,"0":0,"1":0,icon:"google-plus"},
    {id:10,count:0,"-1":0,"0":0,"1":0,icon:"tiktok"},
    {id:6,count:0,"-1":0,"0":0,"1":0,icon:"youtube-play"},
    {id:9,count:0,"-1":0,"0":0,"1":0,icon:"telegram"},
]));

export const search_tags = reactive(ref([]));
export const smi_category = reactive(ref([]));
export const languages_count = reactive(ref({
    10: {
        count: 0,
        filled_count: 0,
    },
    4: {
        count: 0,
        filled_count: 0,
    },
    5: {
        count: 0,
        filled_count: 0,
    },
    3: {
        count: 0,
        filled_count: 0,
    },
}));
export const project = reactive(ref({
    id: document.querySelector('#p_id').value,
    s_date: document.querySelector('#s_date').value ?? '2022-01-28',
    f_date: document.querySelector('#f_date').value ?? '2022-01-31',
    place: document.querySelector('#place').value ?? 0,
    place_id: document.querySelector('#place_id').value ?? 0,
}));

export const isKazakstan = computed(() => project.value.place == 2 && !project.value.place_id.includes(','))

export const selected_social_categories = reactive(ref({}));
export const selected_main_sentiments = reactive(
    ref({
        "-1": true,
        0: true,
        1: true,
    })
);
