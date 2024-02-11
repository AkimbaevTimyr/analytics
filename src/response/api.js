import axios from 'axios'
import { project, socials, countries, regions, social_categories, generals_count, smi_categories, r_type, main_sentiments_count, selected_main_sentiments, languages_count, languages_general_data, categories_general_data, smi_category, search_tags, isKazakstan, selected_social_categories } from '@/response/header'
import {
    dateRange, places, selected_categories, selected_languages, resource_count, resource_full_news_count, column_news_count, resources, offsetLeft, offsetRight, resource_clipped_news_count, selected_resources, selected_resource_sentiment, bars_sentiments_selected, selected_dates, selected_sentiment_dates, selected_date_mode, dynamics, soc_metrics, enable_metrics, is_high_news_count, news_count, first_similar_date, similars_count, resources_count, items, items_loading, selected_page, selected_soc_metrics, resource_count_loading, laoding_metrics, selected_regions, reset_all, get_selected_smi_categories, isGrouped, similar_items, similar_items_loading, thumbnail_dates, countries_with_regions, getCountryRegions, p_user_id, favorites, favorites_modal, current_country_id, request } from '@/response/data/index'
import { getResourceData, selected_top_resources, start_top_resources, end_top_resources, each_number, max } from '@/response/options/columnOptions'
import { get_map_params } from '@/response/options/mapOptions'
import { selected_dates_query, selected_sentiment_dates_query } from '@/response/options/lineOptions'
import { s_time, f_time } from '@/data'
import { computed, watch } from 'vue'

import i18n from "@/response/utils/i18n"

let firstLoad = true;


export const end_clipped = computed(() => {
	
	let start_count = ((end_top_resources.value + 1) * each_number.value);

	if (start_count > resource_count.value) start_count = resource_count.value;

	return start_count
})

const reset_all_selected_data = () => {
	reset_all.value = true
	selected_regions.value = {}

    selected_categories.value = {}
    selected_languages.value = {
		"10": false,
		"4": false,
		"5": false,
		"3": false,
	}

	selected_main_sentiments.value = {
        "-1": true,
        0: true,
        1: true,
    }

    selected_resources.value = {resources:{}}

	selected_resource_sentiment.value = {
        sentiment_resources: {
            1: {},
            0: {},
            "-1": {},
        }
    }
	bars_sentiments_selected.value = {
		sentiment_places: {
			"1": {},
			"0": {},
			"-1": {},
		}
	}
    selected_dates.value = { dates: {} };
    selected_sentiment_dates.value = {
        dates: {
            "1": {},
            "0": {},
            "-1": {},
        }
    }
    isGrouped.value = false
    let years_period = new Date(dateRange.value.endDate).getFullYear() - new Date(dateRange.value.startDate).getFullYear();
    let temp_date_mode = 'daily';
    if (dateRange.value.endDate == dateRange.value.startDate) {
        temp_date_mode = 'hourly';
    }
    else if (years_period > 2) {
        temp_date_mode = 'monthly';
    }
    selected_date_mode.value = temp_date_mode
}

const obj_copy = function (obj) {
	return JSON.parse(JSON.stringify(obj))
}

// первичный запрос на получение даный по проекту
export function getProjectCounts(update_period = true) {
	items_loading.value = true;

	
	generals_count.value[1] = {
		count: 0,
		"-1": 0,
		"0": 0,
		"1": 0,
	}
	generals_count.value[2] = {
		count: 0,
		"-1": 0,
		"0": 0,
		"1": 0,
	}
	let temp_soc_obj = {
		'count': 0,
		'1': 0,
		'0': 0,
		'-1': 0,
	};
	socials.value = {
		2: obj_copy(temp_soc_obj),
		4: obj_copy(temp_soc_obj),
		3: obj_copy(temp_soc_obj),
		7: obj_copy(temp_soc_obj),
		1: obj_copy(temp_soc_obj),
		8: obj_copy(temp_soc_obj),
		5: obj_copy(temp_soc_obj),
		10: obj_copy(temp_soc_obj),
		6: obj_copy(temp_soc_obj),
		9: obj_copy(temp_soc_obj),
	};

	axios
		.get(`/ru/analyticstats/get-project-count?${params.value.getQuery({}, ['p_id','s_date','f_date'])}`)
        .then(response => {
            console.log('get-project-count', response);
			let temp_soc_obj = {
				'count': 0,
				'1': 0,
				'0': 0,
				'-1': 0,
			};
			// серч теги установка
			search_tags.value = response.data.search_tags

			//сортировка по длине строки
			search_tags.value.sort((a,b) => (a.length - b.length))

			//устанавливаем метрики
			socials.value = response.data.socials.reduce((prev, social) => {
				if (prev[social.id] === undefined) {
					prev[social.id] = obj_copy(temp_soc_obj);
				}
				prev[social.id].count = parseInt(social.count) || 0
				prev[social.id]['-1'] = parseInt(social.negative) || 0
				prev[social.id]['0'] = parseInt(social.neutral) || 0
				prev[social.id]['1'] = parseInt(social.positive) || 0
				return prev
			}, {
				2: obj_copy(temp_soc_obj),
				4: obj_copy(temp_soc_obj),
				3: obj_copy(temp_soc_obj),
				7: obj_copy(temp_soc_obj),
				1: obj_copy(temp_soc_obj),
				8: obj_copy(temp_soc_obj),
				5: obj_copy(temp_soc_obj),
				10: obj_copy(temp_soc_obj),
				6: obj_copy(temp_soc_obj),
				9: obj_copy(temp_soc_obj),
			})


			// заполняем метриками соц сети
			social_categories.value.forEach(social_category => {
				if (!socials.value[social_category.id]) {
					socials.value[social_category.id] = obj_copy(temp_soc_obj);
				}
				let social = socials.value[social_category.id] ?? obj_copy(temp_soc_obj)
				social_category.count = parseInt(social.count) || 0
				social_category['-1'] = parseInt(social['-1']) || 0
				social_category['0'] = parseInt(social['0']) || 0
				social_category['1'] = parseInt(social['1']) || 0
			})

			console.log(social_categories.value, 'soc-cat');

			//общее количество метрик сми - соц сети
            response.data.generals.forEach(general => {
				generals_count.value[general.type].count = parseInt(general.count) || 0
				generals_count.value[general.type]['-1'] = parseInt(general.negative) || 0
				generals_count.value[general.type]['0'] = parseInt(general.neutral) || 0
				generals_count.value[general.type]['1'] = parseInt(general.positive) || 0
			})

			// заполняем все страны
			countries.value = response.data.countries.reduce((prev,country) => {
				prev[country.id] = country
				return prev
			}, {})

			// заполняем все регионы
			regions.value = response.data.regions.reduce((prev,region) => {
				prev[region.id] = region
				return prev
			}, {})

			// заполняем данные для  pieChart
			smi_categories.value = response.data.smi_categories.reduce((prev,smi_cat) => {
				prev[smi_cat.id_cat] = smi_cat
				return prev
			}, {})

			// что бы при изменении периода не сбрасывался r_type на сми
			if (update_period) r_type.value = request?.r_type ?? ((generals_count.value[1].count > 0) ? 1 : 2);

			console.log('request?.category_id', request?.category_id, selected_social_categories.value, request);

			// соц сети условие на выбранную соц сеть
			if (request?.category_id) {
				selected_social_categories.value = request?.category_id.split(',').reduce((prev, soc_id) => ({...prev, [soc_id]: true}), {});
				console.log('request?.category_id', request?.category_id, selected_social_categories.value);
			}
			console.log('request?.category_id', request?.category_id, selected_social_categories.value);

			// 2- соц сети
            if (firstLoad && r_type.value == 2) {
                console.log('Smi Empty');
            }
            else {
                setSentimentsCount()
            }

            firstLoad = false
		})
		.catch(error => {
			console.error(error);
			
			main_sentiments_count.value = {
				"-1": 0,
				0: 0,
				1: 0,
			}
		})
		.finally(() => {

			// для карты
			let temp_regions_file_name = '';
            let temp_country_id = 0;

			// посмотреть это
            if (isKazakstan.value) {
                let { regions_file_name = false, id = 0 } = countries.value[project.value.place_id]
                temp_regions_file_name = regions_file_name;
                temp_country_id = id;
                if (temp_regions_file_name) getCountryRegions(temp_regions_file_name, temp_country_id)
			}
			//else {
			//	temp_regions_file_name = Object.keys(countries_with_regions.value)[0];
			//}

		})
}

export function setSentimentsCount() {
	let temp_main_sentiments_count = {
		"-1": 0,
		0: 0,
		1: 0,
	}
	if (r_type.value == 1) {
		temp_main_sentiments_count["-1"] = generals_count.value[1]["-1"] ?? 0
		temp_main_sentiments_count["0"] = generals_count.value[1]["0"] ?? 0
		temp_main_sentiments_count["1"] = generals_count.value[1]["1"] ?? 0
	}
	else {
		let filtered_selected_socials = Object.keys(selected_social_categories.value)
			.filter(
				social => selected_social_categories.value[social]
			);
		if (filtered_selected_socials.length) {
			filtered_selected_socials.forEach(social => {
				temp_main_sentiments_count['-1'] += socials.value[social]['-1'] ?? 0
				temp_main_sentiments_count['0'] += socials.value[social]['0'] ?? 0
				temp_main_sentiments_count['1'] += socials.value[social]['1'] ?? 0
			})
		}
		else {
			temp_main_sentiments_count["-1"] = generals_count.value[2]["-1"] ?? 0
			temp_main_sentiments_count["0"] = generals_count.value[2]["0"] ?? 0
			temp_main_sentiments_count["1"] = generals_count.value[2]["1"] ?? 0
		}
	}
	main_sentiments_count.value = temp_main_sentiments_count

	getMainPlacesCount()
}


// заполнения данных для карты
export function getMainPlacesCount(reset_all_anyway = true) {
	items_loading.value = true
	if (reset_all_anyway) reset_all_selected_data()

	//получаем параметры из строка запроса params.value.getQuery
	axios
		.get(`/ru/analyticstats/get-project-places-count?${params.value.getQuery({}, ['p_id','r_type','category_id','sentiments','s_date','f_date'])}`)
		.then(response => {

			let map_world = {};
			let map_kz = {};

			countries_with_regions.value = {};

			languages_count.value[10].count = 0
			languages_count.value[4].count = 0
			languages_count.value[5].count = 0
			languages_count.value[3].count = 0

			response.data.forEach(place => {
				if (
					regions.value[place.region_id] &&
					(
						place.country_id == regions.value[place.region_id].country_id ||
						0 == regions.value[place.region_id].country_id
					)
				) {

					let temp_hc = regions.value[place.region_id].hc;

					// есди регоин не прив=язаг к стране, по умолчанию ставится ключ страны
					if (0 == regions.value[place.region_id].country_id) temp_hc = countries.value[place.country_id]?.hc;

					// для кнопки для переулбчения по региону
					// есть регионы есть кнопка перезда на регоны
					if (place.region_id != 0) {
						countries_with_regions.value[place.country_id] = true;
					}

					// map reginos
					map_kz[temp_hc] = {
						id: place.country_id + "_" + place.region_id,
						value: parseInt(place.count) || 0,
						resources: parseInt(place.resources) || 0,
						negative: parseInt(place.negative) || 0,
						neutral: parseInt(place.neutral) || 0,
						positive: parseInt(place.positive) || 0,

						ru: parseInt(place.ru) || 0,
						kz: parseInt(place.kz) || 0,
						en: parseInt(place.en) || 0,
						others: parseInt(place.others) || 0,

						"hc-key": temp_hc,
						"country": regions.value[place.region_id].name,
						"isRegion": true
					}
				}

				// языки колиество публикаций
				languages_count.value[10].count += parseInt(place.kz) || 0
				languages_count.value[4].count += parseInt(place.ru) || 0
				languages_count.value[5].count += parseInt(place.en) || 0
				languages_count.value[3].count += parseInt(place.others) || 0

				let country = countries.value[place.country_id] ?? countries.value[222]
				if (map_world[country.hc] && country) {
					map_world[country.hc].value += parseInt(place.count) || 0
					map_world[country.hc].resources += parseInt(place.resources) || 0
					map_world[country.hc].negative += parseInt(place.negative) || 0
					map_world[country.hc].neutral += parseInt(place.neutral) || 0
					map_world[country.hc].positive += parseInt(place.positive) || 0

					map_world[country.hc].kz += parseInt(place.kz) || 0
					map_world[country.hc].ru += parseInt(place.ru) || 0
					map_world[country.hc].en += parseInt(place.en) || 0
					map_world[country.hc].others += parseInt(place.others) || 0
				}
				else {
					map_world[country.hc] = {
						id: place.country_id,
						value: parseInt(place.count) || 0,
						resources: parseInt(place.resources) || 0,
						negative: parseInt(place.negative) || 0,
						neutral: parseInt(place.neutral) || 0,
						positive: parseInt(place.positive) || 0,

						ru: parseInt(place.ru) || 0,
						kz: parseInt(place.kz) || 0,
						en: parseInt(place.en) || 0,
						others: parseInt(place.others) || 0,

						"hc-key": country.hc,
						"country": country.name
					}
				}
			})

			// заполнение данных VHeader
			languages_count.value[10].filled_count = languages_count.value[10].count
			languages_count.value[4].filled_count = languages_count.value[4].count
			languages_count.value[5].filled_count = languages_count.value[5].count
			languages_count.value[3].filled_count = languages_count.value[3].count

			// заполнние регионов стран
			places.value['countries'] = map_world;
			places.value['regions'] = map_kz;

			console.log('places', places.value);

			if (r_type.value == 1) {
				getMainSmiCategoriesAndLanguagesCount()
			}
			else {
				getResourceCount()
			}
		})
		.catch(error => {
			console.error(error);
		})
}

// посмотреть
export function getMainSmiCategoriesAndLanguagesCount() {
	items_loading.value = true

	axios
		.get(`/ru/analyticstats/get-project-lang-and-smi-categories-count?${params.value.getQuery({}, ['p_id','r_type','category_id','countries','regions','sentiments','s_date','f_date'])}`)
		.then(response => {
			
			let result = response.data.reduce((prev, item) => {
				let lang_key = item.lang != 10 && item.lang != 4 && item.lang != 5 ? 3 : item.lang;
				let temp_count = isNaN(parseInt(item.count)) ? 0 : parseInt(item.count) || 0;

				if (prev.languages[lang_key]) {
					if (prev.languages[lang_key][item.category_id]) {
						prev.languages[lang_key][item.category_id] += temp_count;
					}
					else {
						prev.languages[lang_key][item.category_id] = temp_count;
					}
				}
				else {
					prev.languages[lang_key] = {[item.category_id]: temp_count};
				}
				if (prev.categories[item.category_id]) {
					if (prev.categories[item.category_id][lang_key]) {
						prev.categories[item.category_id][lang_key] += temp_count;
					}
					else {
						prev.categories[item.category_id][lang_key] = temp_count;
					}
				}
				else {
					prev.categories[item.category_id] = {[lang_key]: temp_count};
				}
				return prev;
			}, {
				languages: {},
				categories: {},
			})
			languages_general_data.value = result.languages
			categories_general_data.value = result.categories
			console.log(result, 'check')
			smi_category.value = Object.keys(categories_general_data.value).map(cat_id => {
				return {
					id_cat: cat_id,
                    name: i18n(smi_categories.value[cat_id]?.name_cat),
					y: Object.values(categories_general_data.value[cat_id]).reduce((a,b) => (a+b))
				}
			})

			smi_category.value.sort((a,b) => (b.y - a.y))

			getResourceCount()
		})
		.catch(error => {
			console.error(error);
		})
}

export function getResourceCount() {
	items_loading.value = true
	resource_count_loading.value = true

	axios
		.get(`/ru/analyticstats/get-project-resource-count?${params.value.getQuery({}, ['p_id','r_type','category_id','countries','regions','sentiments','language','s_date','f_date'])}`)
		.then(response => {
			resource_count.value = parseInt(response.data.resource_count) || 0
			resource_full_news_count.value = parseInt(response.data.resource_full_news_count) || 0
			column_news_count.value = parseInt(response.data.column_news_count) || 0
			resources.value = []
			selected_top_resources.value = 0
			start_top_resources.value = 0;
			max.value = end_top_resources.value = Math.round(resource_count.value / each_number.value);
			setTimeout(() => {
				let element = document.querySelector(".rs-range.pos-a-range.light_clip");
				if (element != undefined) element.value = end_top_resources.value;
				offsetLeft.value = offsetRight.value = 0;
			}, 100);

			getResourceData()
			getDynamicsData(true)
		})
		.catch(error => {
			console.error(error);
		})
}


// метод для формирования динамики публикаций
export const getDynamicsData = () => {
	items_loading.value = true
    resource_count_loading.value = true

    axios
        .get(`/ru/analyticstats/get-project-dynamics-data?${params.value.getQuery({}, ['dates_filter', 'sentiment_dates_filter'], true)}`)
        .then(response => {

            console.log('dynamics-data', response);

			let obj_dates = response.data.dates.reduce((prev, date) => ({ ...prev, [date.date]: date }), {})

			dynamics.value = thumbnail_dates.value.map(date => {

				let temp_start_date = new Date(dateRange.value.startDate)

				if (date.date >= 1) {

					temp_start_date = new Date(temp_start_date.valueOf() + ((7*24*3600*1000) * date.date))

					let minus_days = temp_start_date.getDay()
			
					if (minus_days == 0) minus_days = 7

					if (minus_days != 1) {
						temp_start_date = temp_start_date.minus('date', minus_days - 1)
					}
				}

				// y - общее количество
				return {
					y: parseInt((obj_dates[date] && obj_dates[date].y) ?? 0),
					'-1': parseInt((obj_dates[date] && obj_dates[date]['-1']) ?? 0),
					'0': parseInt((obj_dates[date] && obj_dates[date]['0']) ?? 0),
					'1': parseInt((obj_dates[date] && obj_dates[date]['1']) ?? 0),
					date: date,
					x: selected_date_mode.value == 'weekly'
						? temp_start_date.valueOf()
						: new Date(`${date}${selected_date_mode.value == 'hourly' ? ':00:00' : ''}`).valueOf(),
				};
			})

			console.log(dynamics, 'dynamics-check')

			if (selected_date_mode.value == 'weekly') {
				
				let temp_weekly_dates = [];
				let temp_start_date = new Date(dateRange.value.startDate);
				while (temp_start_date.valueOf() <= new Date(dateRange.value.endDate + ` ${f_time.value}`).valueOf()) {
					let weekdates = [temp_start_date.format('Y-m-d')];
					temp_start_date.plus('date', 1)
					let old_week = +temp_start_date.format('w')
					while (old_week != 1) {
						weekdates.push(temp_start_date.format('Y-m-d'))
						temp_start_date.plus('date', 1)
						old_week = +temp_start_date.format('w')
					}
					temp_weekly_dates.push(weekdates);
				}

				dynamics.value = temp_weekly_dates.map(weekdates => {
					let start_date = weekdates[0];

					let counts = weekdates.reduce((prev,date) => ({
						y: prev.y + parseInt((obj_dates[date] && obj_dates[date].y) ?? 0),
						'-1': prev['-1'] + parseInt((obj_dates[date] && obj_dates[date]['-1']) ?? 0),
						'0': prev['0'] + parseInt((obj_dates[date] && obj_dates[date]['0']) ?? 0),
						'1': prev['1'] + parseInt((obj_dates[date] && obj_dates[date]['1']) ?? 0),
					}), {
						y: 0,
						"-1": 0,
						"0": 0,
						"1": 0,
					})
					

					return {
						...counts,
						date: start_date,
						week_dates: weekdates,
						x: new Date(start_date).valueOf(),
					};
                })
                
			}

            resource_clipped_news_count.value = parseInt(response.data.resource_clipped_news_count);
			resource_count_loading.value = false
            getGeneralCount()
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					if (r_type.value == 2) {
						getSocialMetrics()
					}
				})

            if (selected_page.value == 1) {
                getItems()
            }
            else {
                selected_page.value = 1
            }
        })
        .catch(error => {
            console.error(error);
        })
};

// получения по сми и соц сетям количества для  range
export const getGeneralCount = () => {

    return axios
        .get(`/ru/analyticstats/get-project-general-count?${params.value.getQuery({
			from_page: (selected_page.value - 1) * 20,
			grouped: isGrouped.value,
		})}`)
        .then(response => {

            news_count.value = parseInt(response.data.news_count)
			first_similar_date.value = false
			if (isGrouped.value) {
                news_count.value = parseInt(response.data.similars_count)
                first_similar_date.value = response.data.first_similar_date
			}
            similars_count.value = false;
			check_full_news_count(news_count.value)
            resources_count.value = parseInt(response.data.resources_count)
        })
};

// на вклюбчение метрпик для метрик по соцсетям
watch(enable_metrics, (newValue) => {
	if (!newValue) {
		soc_metrics.value = {
			likes: 0,
			comments: 0,
			reposts: 0,
			members: 0,
		}
	}
	else {
		getSocialMetrics()
	}
})

// запрос при групперовке
watch(isGrouped, () => {
            
	getGeneralCount()
		.catch(error => {
			console.error(error);
		})

	if (selected_page.value == 1) {
		getItems()
	}
	else {
		selected_page.value = 1
	}
})

export function check_full_news_count(full_news_count) {
	full_news_count = parseInt(full_news_count) ?? 0;
	is_high_news_count.value = full_news_count > 1_500_000

	if (enable_metrics.value == 'active_metrics') return ;

	if (is_high_news_count.value) {
		enable_metrics.value = false
	}
	else {
		enable_metrics.value = true
	}
}

export const getSocialMetrics = () => {

	if (!enable_metrics.value) return;

	laoding_metrics.value = true

	soc_metrics.value = {
		likes: 'loading',
		comments: 'loading',
		reposts: 'loading',
		members: 'loading',
	}

	axios
		.get(`/ru/analyticstats/get-project-metrics-data?${params.value.getQuery()}`)
		.then(response => {
			soc_metrics.value = response.data.metrics
			laoding_metrics.value = false
		})
		.catch(error => {
			console.error(error);
		})

};

// получение новостей метрики тональность и тд
export const getItems = () => {


	items_loading.value = true


    axios
        .get(`/ru/analyticstats/get-project-items?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			from_page: (selected_page.value - 1) * 20,
			grouped: isGrouped.value,
		})}`)
        .then(response => {
            console.log('get-project-items', response);
            let obj_similar_items = response?.data?.similar_items?.reduce((prev, item) => ({
				...prev, [item.item_id]: {
					similars_count: {
						...prev[item.item_id]?.similars_count,
						[item.similars_count]: true
					}
				}
			}), {})
			Object.keys(obj_similar_items).forEach(similar_item_id => {
				obj_similar_items[similar_item_id].similars_count = Object.keys(obj_similar_items[similar_item_id].similars_count)
			})
            let obj_items_items = response?.data?.items?.reduce((prev, item) => ({ ...prev, [item.news_id]: item }), {})
            let obj_items_metrics = response?.data?.metrics?.metrics?.reduce((prev, item) => ({ ...prev, [item.news_id]: item }), {})
            let obj_items_members = response?.data?.metrics?.members?.reduce((prev, item) => ({ ...prev, [item.id]: item }), {})
			let obj_item_folders = response?.data?.folders?.reduce((prev, item_folder) => ({ ...prev, [item_folder.item_id]: prev[item_folder.item_id] ? [
				...prev[item_folder.item_id],
				{
					id: item_folder.folder_id,
					name: item_folder.name
				}
			] : (
				[{
					id: item_folder.folder_id,
					name: item_folder.name
				}]
			) }), {})
            let temp_items = response?.data?.params?.filter(item => (item?.item_id?.length))?.map(item => ({
				likes: 0,
				comments: 0,
				reposts: 0,
				members: 0,
				...item,
				...obj_items_items[item.item_id],
				...obj_similar_items[item.item_id],
				...obj_items_metrics[item.item_id],
				...obj_items_members[item.res_id],
				folders: obj_item_folders[item.item_id] ?? [],
			}))

			items.value = temp_items.map(item => ({
				...item,
                text: remove_script_from_text(item.full_text)
			}))

        })
        .catch(error => {
            console.error(error);
			items.value = [];
        })
        .finally(() => {
			reset_all.value = items_loading.value = false

			const item_ids = items.value.map(item => item.item_id).join(',');

			if (item_ids) getGptLogs(item_ids)
        })
};


// получение запросов польщователя в гпт и тип
export const getGptLogs = (item_ids = items.value?.map(item => item?.item_id)?.join(','), items_array = items.value) => {
	
	axios
		.get(`/ru/gpt-service/get-logs?news_type=${r_type.value}&news_id=${item_ids}`)
		.then(response => {
			items_array.forEach(item => {
				item.logs = {}
			})

			if (response?.data?.length) {
				let logs = response?.data?.reduce((prev, log) => ({ ...prev, [log.news_id]: prev[log.news_id] == undefined ? [log] : [...prev[log.news_id], log] }), {})
				
				items_array.forEach(item => {
					item.logs = logs[item.item_id]
						? logs[item.item_id].reduce((prev, log) => ({...prev, [log.promt]: log}), {})
						: {}
				})
			}
        })
        .catch(error => {
			items_array.forEach(item => {
				item.logs = null
			})
            console.error(error);
        })
        .finally(() => {
			reset_all.value = false
        })
};

// при переключении на свои запроса чат гпт
export const getGptUserLogs = async () => {
	
	try {
		let response = await axios.get(`/ru/gpt-service/get-user-logs`);
		
		let user_logs = {};
		
		response?.data?.forEach(log => {
			if (!user_logs[log.type]) {
				user_logs[log.type] = [];
			}

			user_logs[log.type] = [...user_logs[log.type], log];
		});

		
		return user_logs
	}
	catch (error) {
		console.error('getGptUserLogs', error);
	}
};

// список новостей группы с пагинацией
export const getSimilarItems = (item_id, per_page = 1) => {
	
	similar_items_loading.value = true;

	if (!item_id) return;

    axios
        .get(`/ru/similar-items/get-items?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			from_page: (per_page - 1) * 20,
			item_id,
		})}`)
        .then(response => {
            let obj_items_items = response?.data?.items?.reduce((prev, item) => ({ ...prev, [item.news_id]: item }), {})
            let obj_items_metrics = response?.data?.metrics?.metrics?.reduce((prev, item) => ({ ...prev, [item.news_id]: item }), {})
            let obj_items_members = response?.data?.metrics?.members?.reduce((prev, item) => ({ ...prev, [item.id]: item }), {})
			let obj_item_folders = response?.data?.folders?.reduce((prev, item_folder) => ({ ...prev, [item_folder.item_id]: prev[item_folder.item_id] ? [
				...prev[item_folder.item_id],
				{
					id: item_folder.folder_id,
					name: item_folder.name
				}
			] : (
				[{
					id: item_folder.folder_id,
					name: item_folder.name
				}]
			) }), {})
            let temp_similar_items = response?.data?.params?.filter(item => (item?.item_id?.length))?.map(item => ({
				likes: 0,
				comments: 0,
				reposts: 0,
				members: 0,
				...item,
				...obj_items_items[item.item_id],
				...obj_items_metrics[item.item_id],
				...obj_items_members[item.res_id],
				folders: obj_item_folders[item.item_id] ?? [],
			}))

			similar_items.value = temp_similar_items.map(item => ({
				...item,
                text: remove_script_from_text(item.full_text)
			}));

        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
			similar_items_loading.value = false;

			const item_ids = similar_items.value.map(item => item.item_id).join(',');

			if (item_ids) getGptLogs(item_ids, similar_items.value)
        })
};

// для групп
export const updateGroupSentiment = (item_id, selected_sentiment) => {

	
	similar_items_loading.value = true;

	if (!item_id || !(
		['-1','0','1'].includes(selected_sentiment + '')
	)) return;

    axios
        .get(`/ru/analyticstats/update-group-sentiment?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			item_id,
			selected_sentiment,
		})}`)
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
			similar_items_loading.value = false;
        })
};

// удаление новостей и группы
export const deleteGroupItems = (item_id) => {

	
	similar_items_loading.value = true;

	if (!item_id) return;

    axios
        .get(`/ru/analyticstats/delete-group-items?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			item_id,
			p_user_id: p_user_id.value,
		})}`)
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
			similar_items_loading.value = false;
        })
};

// получение папок для избранногг
export const getGroupFolders = (item_id) => {


	if (!item_id) return;

    let item = items.value.find(item => item.item_id === item_id);
    let group_folders = {};

    axios
        .get(`/ru/analyticstats/get-group-folders?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			item_id,
			p_user_id: p_user_id.value,
		})}`)
        .then(response => {
            response?.data?.forEach(folder => {
                group_folders[folder.id] = {
                    ...folder,
                    selected: item.similars_count.find(
                        similar_id => !(folder.item_ids.includes(+similar_id))
                    ) == undefined
                }
            })
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {


            axios
                .get(
                    `/ru/news/labelslist?news_id=${item_id}&r_type=${r_type.value}&get_data=true`
                )
                .then((response) => {
                    favorites.value = response?.data?.folders?.map((folder) => ({
                        selected: false,
                        ...(group_folders[folder.id] == undefined ? folder : group_folders[folder.id]),
                    }));
                    favorites_modal.value = item_id;
                })
                .catch((error) => {
                    console.error(error);
                });
        })
};

// для доабвление группы паубликаций в избаррное или удаление
export const updateGroupFolders = (item_id, favorite) => {

    if (!favorites_modal.value) return;

	if (!item_id) return;

    let label_type = favorite.selected ? "add_label" : "remove_from_label";
    axios
        .get(`/ru/analyticstats/update-group-folders?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			item_id,
			f_id: favorite.id,
			label_type,
		})}`)
        .catch(error => {
            console.error(error);
        })
};

// создания нового избранногго
export const general_add_to_folder = (favorite) => {

    if (!favorites_modal.value || favorite.selected) return;

	favorite.selected = true;

    axios
        .get(`/ru/analyticstats/add-to-folders?${params.value.getQuery({
			metrics: selected_soc_metrics.value,
			f_id: favorite.id,
		})}`)
		.then(response => {
			console.log('add-to-folders', response);
		})
        .catch(error => {
            console.error(error);
        })
};


export const get_favorites = () => {
	axios
		.get(
			`/ru/analyticstats/get-folders`
		)
		.then((response) => {
			console.log('get-folders', response);
			favorites.value = response?.data?.map((folder) => ({
				...folder,
				selected: false,
			})) ?? [];
			favorites_modal.value = 'general_add_to_folder';
		})
		.catch((error) => {
			console.error(error);
		});
}

// удаление html + scrpts tags from item_content
function remove_script_from_text(text) {
	document.getElementById('text-thumbnail').innerHTML = text;
	text = document.getElementById('text-thumbnail').innerText || document.getElementById('text-thumbnail').textContent;
	document.getElementById('text-thumbnail').innerHTML = '';
	return text;
}

// подготовка параметров для отправки запроса на рест
// идет с каждым запросом и передаются все аргументы
const params = computed(() => {
    let countries = get_map_params.value.countries.join(',')
    let regions = get_map_params.value.regions.join(',')
    if (regions.length && countries == '') {
        countries = current_country_id.value + '';
    }

	// выбранные соц сети подставляем в запрос через ,
    let category_id;
    if (r_type.value == 2) {
        category_id = Object.keys(selected_social_categories.value).length ? (
            Object.keys(selected_social_categories.value).filter(soc_key => selected_social_categories.value[soc_key]).join(',')
        ) : '';
    }
	// спросить про это
    else {
        category_id = get_selected_smi_categories(selected_categories.value).join(',');
    }

	let language = Object.keys(selected_languages.value).length ? (
		Object.keys(selected_languages.value).filter(lang_id => selected_languages.value[lang_id]).map(lang_id => parseInt(lang_id))
	) : [];

	language = language.join(',')
	// сентименты негатив позитив
	// берем те у кооторых значение тру
    let sentiments = Object.keys(selected_main_sentiments.value).filter(sentiment => selected_main_sentiments.value[sentiment]).join(',')

    let from = start_top_resources.value == 0 ? 0 : start_top_resources.value * each_number.value;

    let _resources = Object.keys(selected_resources.value.resources).length ? (
        Object.keys(selected_resources.value.resources).filter(lang_id => selected_resources.value.resources[lang_id]).join(',')
    ) : '';

    let specifying_sentiments = [1, 0, -1].map(sentiment => {
        let res_obj = selected_resource_sentiment.value.sentiment_resources[sentiment]
        let res_ids = Object.keys(res_obj).length ? (
            Object.keys(res_obj).filter(lang_id => res_obj[lang_id]).join(',')
        ) : '';

        let place_obj = bars_sentiments_selected.value.sentiment_places[sentiment]

        let countries = [];
        let regions_countries = [];
        let regions = [];

        Object.keys(place_obj).filter(place_id => place_obj[place_id]).forEach(place_id => {
            if (place_id.includes('_')) {
                regions.push(place_id.split('_')[1])
                regions_countries.push(place_id.split('_')[0])
            }
            else {
                countries.push(place_id)
            }
        })

        return `${sentiment}_${res_ids}_${regions.join(',')}_${[...countries, ...regions_countries].join(',')}`
    })

    specifying_sentiments = specifying_sentiments.join(';')

    let temp_sentiment_dates_query = [
        selected_main_sentiments.value['1'] ? selected_sentiment_dates_query.value['1'] : '',
        selected_main_sentiments.value['0'] ? selected_sentiment_dates_query.value['0'] : '',
        selected_main_sentiments.value['-1'] ? selected_sentiment_dates_query.value['-1'] : '',
    ].join('_');
	let result = {
		p_id: project.value.id,
		r_type: r_type.value,
		category_id: category_id,
		countries: countries,
		regions: regions,
		sentiments: sentiments,
		language: language,
		s_date: `${dateRange.value.startDate.format("Y-m-d")} ${s_time.value}`,
		f_date: `${dateRange.value.endDate.format("Y-m-d")} ${f_time.value}`,
		from: from,
		to: end_clipped.value,
		resource_length: resource_count.value,
		resources: _resources,
		specifying_sentiments: specifying_sentiments,
		date_mode: selected_date_mode.value == 'weekly' ? 'daily' : selected_date_mode.value,
		dates_filter: selected_dates_query.value,
		sentiment_dates_filter: temp_sentiment_dates_query,
    };
    
    console.log('params', result);

	const params = {
		getObject(redefine = {}, only = [], except = false) {
			result = { ...result, ...redefine };
			if (only?.length) {
				if (except) {
					only = Object.keys(result).filter((key) => !only.includes(key))
				}
				result = Object.defineProperties(
					result,
					only.reduce((prev, next) => ({
						...prev,
						[next]: {},
					}), {})
				);
			}
			return result;
		},
		getQuery(redefine = {}, only = [], except = false) {
			result = this.getObject(redefine, only, except);
			return Object.entries(result)
				.map(([key_name, value]) => `${key_name}=${value}`)
				.join('&');
		},
	};

	return params;
})