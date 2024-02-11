import { reactive, ref, watch } from "vue";
import { getLang } from '@/response/utils/langIs'
import { dateRange, selected_date_mode, thumbnail_dates } from '@/response/data/index'
import { project, r_type, selected_social_categories } from '@/response/header'
import { getProjectCounts } from "@/response/api"
import axios from "axios";

export const temp_end_date = reactive(ref(null))

export const current_selected = reactive(ref({
	date: dateRange.value.endDate,
	type: 'end',
}))

export const modal = reactive(ref(false))
export const between_dates = reactive(ref({
	[dateRange.value.startDate]: 'start',
	[dateRange.value.endDate]: 'end',
}))

const default_ranges = {
	'За весь период': 'during_all_the_time',
	'Сегодня': 'today',
	'Вчера': 'yesterday',
	'Неделя': 'week',
	'30 дней': 'month',
	'Текущий месяц': 'current_month',
	'Прошлый месяц': 'last_month',
};

export function select_range_period(period, range_name) {
	between_dates.value = {
		[period[0]]: 'start',
		[period[1]]: 'end',
	}
	current_selected.value.type = 'end'
	s_time.value = '00:00'
	f_time.value = '23:59'
	// current_selected.value.date = {}

	// 

	axios.get(`/ru/user-profile?value=${default_ranges[range_name]}`)
}

export function setDateRange() {
    modal.value = false;
    let date_keys = Object.keys(between_dates.value);
	console.log('date_keys', date_keys, between_dates.value);
    if (date_keys.length == 1) {

		between_dates.value = {
			[date_keys[0]]: 'start',
			[date_keys[0]]: 'end',
		}
		temp_end_date.value = null
		current_selected.value.type = 'end'

		selected_date_mode.value = 'hourly'

		dateRange.value.startDate = date_keys[0]
        dateRange.value.endDate = date_keys[0]
    }
    else if (date_keys.length == 2) {
		let days_period = ((new Date(date_keys[1]).valueOf() - new Date(date_keys[0]).valueOf()) / 1000 / 3600 / 24) + 1;
		let temp_date_mode_condition = {
			hourly:  days_period <= 7,
			daily:   true,
			weekly:  days_period >= 7,
			monthly: days_period >= 3,
		};
		if (!temp_date_mode_condition[selected_date_mode.value]) {
			selected_date_mode.value = 'daily'
		}
        dateRange.value.startDate = date_keys[0]
        dateRange.value.endDate = date_keys[1]
    }

	update_thumbnail_dates()

    getProjectCounts(false)

	update_get_request_params()
}

//что делает данный метод
//функция обновления параметров в строке запроса ?
export const update_get_request_params = () => {
	
	let category_id = '';
	
    if (r_type.value == 2) {
        category_id = Object.keys(selected_social_categories.value).length ? (
            Object.keys(selected_social_categories.value).filter(soc_key => selected_social_categories.value[soc_key]).join(',')
        ) : '';
    }
    window.history.replaceState('', '', `/${getLang()}/analytics/beta?id=${project.value.id}&startDate=${dateRange.value.startDate}&endDate=${dateRange.value.endDate}&r_type=${r_type.value}&category_id=${category_id}`);
}

function update_thumbnail_dates() {
	let temp_thumbnail_dates = [];
	let s_date__string = selected_date_mode.value == 'monthly' ? dateRange.value.startDate.format('Y-m') : dateRange.value.startDate;
	let temp_start_date = new Date(s_date__string);
	let plus_type = {
		daily: 'date',
		weekly: 'date',
		hourly: 'hour',
		monthly: 'month'
	}[selected_date_mode.value];
	while (temp_start_date.valueOf() <= new Date(dateRange.value.endDate + ` ${f_time.value}`).valueOf()) {
		let temp_format = (selected_date_mode.value == 'monthly' ? 'Y-m' : 'Y-m-d') + (selected_date_mode.value == 'hourly' ? ' h' : '')
		temp_thumbnail_dates.push(temp_start_date.format(temp_format));
		temp_start_date.plus(plus_type, 1)
	}
	thumbnail_dates.value = temp_thumbnail_dates;
}
watch(
	() => selected_date_mode.value,
	() => {
		update_thumbnail_dates()
	}
)


export const s_time = reactive(ref('00:00'))
export const f_time = reactive(ref('23:59'))
export const min = reactive(ref(project.value.s_date))
export const max = reactive(ref(project.value.f_date))

export const picker_range = reactive(ref(new Date(project.value.f_date).format("Y-m")))
export const month = reactive(ref(new Date(project.value.f_date).format("m")))
export const year = reactive(ref(new Date(project.value.f_date).getFullYear()))


let today = new Date()
today.setHours(0, 0, 0, 0)
let priorDate = new Date(new Date().setDate(today.getDate() - 30));

let yesterday = new Date()
yesterday.setDate(today.getDate() - 1)
yesterday.setHours(0, 0, 0, 0);
let minProjectDate = new Date(min.value),
	maxProjectDate = new Date(max.value);

// let curr = new Date;
// let firstWeekDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
// let lastWeekDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
let firstWeekDay = new Date().minus('date', 6);
let lastWeekDay = new Date();


export const ranges = reactive(ref({
	'За весь период': [minProjectDate.format("Y-m-d"), maxProjectDate.format("Y-m-d")],
	'Сегодня': [today.format("Y-m-d"), today.format("Y-m-d")],
	'Вчера': [yesterday.format("Y-m-d"), yesterday.format("Y-m-d")],
	// 'Неделя': [firstWeekDay.format("Y-m-d"), lastWeekDay.format("Y-m-d")],
	'Неделя': [firstWeekDay.format("Y-m-d"), lastWeekDay.format("Y-m-d")],
	'30 дней': [priorDate.format("Y-m-d"), today.format("Y-m-d")],
	'Текущий месяц': [new Date(today.getFullYear(), today.getMonth(), 1).format("Y-m-d"), new Date(today.getFullYear(), today.getMonth() + 1, 0).format("Y-m-d")],
	'Прошлый месяц': [new Date(today.getFullYear(), today.getMonth() - 1, 1).format("Y-m-d"), new Date(today.getFullYear(), today.getMonth(), 0).format("Y-m-d")],
	//'This year': [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
}))




update_thumbnail_dates()