<template>
	<div class="table-container">
		<slot></slot>
		<table>
			<thead>
				<tr>
					<th v-for="w in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']" :key="w">{{ i18n(w) }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(curr_date, i) in current_date" :key="i">
					<template v-for="date in  curr_date" :key="date">
						<td
							:class="{
								'line-through': !(
									new Date(min).valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= new Date(max).valueOf()
								),
                                'pointer-events-none': !selected_one_date && Object.keys(between_dates).length == 1 && new Date(date.date).valueOf() < new Date(Object.keys(between_dates)[0]).valueOf(),
								'gray-date': new Date(month).format('m') != date.DATE.format('m') || !(
									new Date(min).valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= new Date(max).valueOf()
								),
								'selected-date': between_dates[date.date] != null || show_old_start(date) || temp_end_date == date.date,
								'start-date': Object.keys(between_dates).length == 2 && (between_dates[date.date] == 'start' || show_old_start(date)),
								'end-date': (current_selected.type == 'end' && between_dates[date.date] == 'end') || temp_end_date == date.date && !(temp_end_date == date.date),
								'between-date': (current_selected.type == 'end' && isBetween(date)) || (
									current_selected.type != 'end' && isBetweenEnter(date)
								),
								'after-date': Object.keys(between_dates).length == 2 && current_selected.type == 'start',
								'once-date': selected_one_date && between_dates[date.date] != null,
							}"
							@click="select_date(date)"
							@mouseenter="() => {if (this.current_selected.type == 'start') mouseEnterEndDate(date)}"
						>{{ date.DATE.getDate() }}</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import i18n from "@/response/utils/i18n"
import { between_dates, current_selected, temp_end_date } from '@/data'

export default {
	setup() {
		return { i18n, between_dates, current_selected, temp_end_date }
	},
	data() {
		return {
			current_date: [],
			// between_dates: {},
		}
	},
	props: {
		month: {
			type: String,
			required: true,
			default: new Date().format("Y-m")
		},
		min: {
			type: String,
			required: true,
			default: new Date().minus("date", 30).format("Y-m-d")
		},
		max: {
			type: String,
			required: true,
			default: new Date().format("Y-m-d")
		},
	},
	methods: {
		mouseEnterEndDate(date) {
			this.temp_end_date = date.date
		},
		show_old_start(date) {
			return this.current_selected.date?.date == date.date && this.current_selected.type == 'start'
		},
		isBetween(date) {
			let between_dates_keys = Object.keys(this.between_dates);
			if (between_dates_keys.length < 2) return
			let [one_date, two_date] = between_dates_keys

			let bool = false;
			if (new Date(one_date).valueOf() < new Date(two_date).valueOf()) {
				bool = new Date(one_date).valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= new Date(two_date).valueOf();
			}
			else {
				bool = new Date(two_date).valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= new Date(one_date).valueOf();
			}

			return bool
		},
		isBetweenEnter(date) {

			let bool = false;
			if (this.current_selected.date?.DATE?.valueOf() < new Date(this.temp_end_date).valueOf()) {
				bool = this.current_selected.date?.DATE?.valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= new Date(this.temp_end_date).valueOf();
			}
			else {
				bool = new Date(this.temp_end_date).valueOf() <= date.DATE.valueOf() && date.DATE.valueOf() <= this.current_selected.date?.DATE?.valueOf();
			}

			return bool
		},
		select_date(date) {
			if (Object.keys(this.between_dates).length >= 2 || Object.keys(this.between_dates).length == 0 || this.selected_one_date) {
				this.between_dates = {
					[date.date]: 'start'
				}
			}
			if (this.current_selected.type == 'start' && (this.current_selected.type != 'start' ? 'start' : 'end') == 'end') {

				this.temp_end_date = null

				this.between_dates[date.date] = 'end'
				if (this.current_selected.date?.DATE?.valueOf() > date.DATE.valueOf()) {
					this.between_dates[this.current_selected.date?.date] = 'end'
					this.between_dates[date.date] = 'start'
				}
				
				// this.createCurrentDateRange()
			}
			this.current_selected.date = date;
			this.current_selected.type = this.current_selected.type != 'start' ? 'start' : 'end'
		},
		createCurrentDateRange() {
			this.current_date = [];
			let temp_current_date = new Date(new Date(this.month).format("Y-m"));
			
			let minus_days = temp_current_date.getDay()
			
			if (minus_days == 0) minus_days = 7
			temp_current_date.minus('date', minus_days)

			// let isEmptyBetweenDates = this.between_dates.length == 0

			// if (isEmptyBetweenDates) this.between_dates = [[]]

			for (let i = 0; i < 6; i++) {
				let week_dates = [];
				for (let i = 0; i < 7; i++) {
					let date = temp_current_date.plus('date', 1).format("Y-m-d");

					let temp_obj = {
						date,
						DATE: new Date(date),
						// selected: this.between_dates[date] ?? null,
					};

					week_dates.push(temp_obj)
				}
				this.current_date.push(week_dates)
			}

			// if (isEmptyBetweenDates) this.between_dates = []
		},
	},
	computed: {
		// between_dates_object() {
		// 	return this.between_dates.reduce((prev, [start, end]) => {
		// 		prev[start?.date] = 'start'
		// 		prev[end?.date] = 'end'
		// 		return prev
		// 	}, {})
		// },
		selected_one_date() {
			return Object.keys(this.between_dates).length == 1 && Object.values(this.between_dates)[0] == 'end'
		},
	},
	watch: {
		month() {
			this.createCurrentDateRange()
		},
	},
	created() {
		setTimeout(() => {
		}, 2000);
		this.createCurrentDateRange()
	}
}
</script>

<style>
.between-date {
	background: #ebf4f8;
	border-radius: 0;
	/* pointer-events: none; */
}
.selected-date {
	color: white;
	background: #357ebd;
}
.start-date {
	border-radius: 4px 0 0 4px;
}
.end-date {
	border-radius: 0 4px 4px 0;
}
.once-date {
	border-radius: 50%;
}
.gray-date {
	color: #bbb !important;
	pointer-events: none;
}
.table-container {
	padding: 5px;
	display: table;
	border-radius: 4px;
	border-width: 1px;
	user-select: none;
}
th, td {
	min-width: 32px;
	height: 32px;
	/* padding: 5px; */
	text-align: center;
	vertical-align: middle;
}
td {
	transition: .1s;
	cursor: pointer;
	border-radius: 4px;
	background: white;
}
td:not(td.selected-date):hover {
	background: #eee;
}
.before-date {
	/* pointer-events: none; */
}
</style>
