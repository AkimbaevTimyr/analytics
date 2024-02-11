<template>
	<multi-date-range-picker :month="picker_range" :min="min" :max="max">
		<div class="flex justify-between items-center" style="height: 30px;">
			<i class="fa-solid fa-arrow-left cursor-pointer" @click="minus_picker_range" :class="{
				'gray-date cursor-default': !has_previous_month,
			}" style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22.25px;
        color: #333"></i>
			<div class="flex">
				<div class="select-container" style="margin-right:10px;">
					<select v-model.lazy="month">
						<template v-for="one_month in all_months" :key="one_month[0]">
							<option v-if="parseInt(new Date(min).format('m')) <= parseInt(one_month[0]) && parseInt(one_month[0]) <= parseInt(new Date(max).format('m'))" :value="one_month[0]">{{ i18n(one_month[1]) }}</option>
						</template>
					</select>
				</div>
				<div class="select-container">
					<select v-model.lazy="year">
						<option v-for="one_year in years" :key="one_year" :value="one_year">{{ one_year }}</option>
					</select>
				</div>
			</div>
			<i class="fa-solid fa-arrow-right cursor-pointer" @click="plus_picker_range" :class="{
				'gray-date cursor-default': !has_next_month,
			}" style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22.25px;
            color: #333"></i>
		</div>
	</multi-date-range-picker>
</template>

<script>
import i18n from "@/response/utils/i18n"
import MultiDateRangePicker from "@/components/widgets/date-range-picker/MultiDateRangePicker.vue";
import { picker_range, month, year } from '@/data'

export default {
	components: {
		MultiDateRangePicker,
    },
    setup() {
        return { i18n, picker_range, month, year }
    },
	data() {
		return {
			all_months: [
				['01', "Январь"],
				['02', "Февраль"],
				['03', "Март"],
				['04', "Апрель"],
				['05', "Май"],
				['06', "Июнь"],
				['07', "Июль"],
				['08', "Август"],
				['09', "Сентябрь"],
				['10', "Октябрь"],
				['11', "Ноябрь"],
				['12', "Декабрь"],
			],
		}
	},
	props: ['min', 'max'],
	methods: {
		minus_picker_range() {
			let temp_picker_range_date = new Date(this.picker_range).minus('month', 1);
			if (new Date(new Date(this.min).format("Y-m")).valueOf() <= temp_picker_range_date.valueOf() && temp_picker_range_date.valueOf() <= new Date(this.max).valueOf()) {
				this.picker_range = temp_picker_range_date.format('Y-m')
				this.year = temp_picker_range_date.format('Y')
				this.month = temp_picker_range_date.format('m')
			}
		},
		plus_picker_range() {
			let temp_picker_range_date = new Date(this.picker_range).plus('month', 1);
			if (new Date(new Date(this.min).format("Y-m")).valueOf() <= temp_picker_range_date.valueOf() && temp_picker_range_date.valueOf() <= new Date(this.max).valueOf()) {
				this.picker_range = temp_picker_range_date.format('Y-m')
				this.year = temp_picker_range_date.format('Y')
				this.month = temp_picker_range_date.format('m')
			}
		},
	},
	computed: {
		has_next_month() {
			let temp_picker_range_date = new Date(this.picker_range).plus('month', 1);
			return (new Date(new Date(this.min).format("Y-m")).valueOf() <= temp_picker_range_date.valueOf() && temp_picker_range_date.valueOf() <= new Date(this.max).valueOf())
		},
		has_previous_month() {
			let temp_picker_range_date = new Date(this.picker_range).minus('month', 1);
			return (new Date(new Date(this.min).format("Y-m")).valueOf() <= temp_picker_range_date.valueOf() && temp_picker_range_date.valueOf() <= new Date(this.max).valueOf())
		},
		years() {
			let years_count = parseInt(new Date(this.max).format("Y")) - parseInt(new Date(this.min).format("Y"));
			let years = []


			for (let i = 0; i < years_count + 1; i++) {
				const element = parseInt(new Date(this.min).format("Y")) + i;
				years.push(element)
			}

			return years
		},
	},
	watch: {
		year() {
			this.picker_range = `${this.year}-${this.month}`
		},
		month() {
			this.picker_range = `${this.year}-${this.month}`
		},
	},
};
</script>

<style>

.select-container {
	border: 1px solid #bbb;
	border-radius: 3px;
	cursor: pointer;
	padding: 0 2px;
    height: 21px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
select {
	/*min-width: 60px;*/
	background: white;
}
select:focus {
	outline: none;
}

</style>
