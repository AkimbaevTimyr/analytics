<template>
	<div class="modal">
		<div class="flex flex-col justify-between bg-white">
			<div class="date-title p-x-14 m-b-14 flex items-center justify-between text-white">
				<span style="font-size: 17px;">{{ i18n('Выберите период') }}</span>
				<i class="fa-solid fa-xmark cursor-pointer" style="font-size: 22px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;" @click="modal = false">
				</i>
			</div>
			<div class="flex p-x-14">
				<div class="flex flex-col justify-center date-ranges">
					<span class="date-range" :class="{
						selected: isSelectedRange(range)
					}" v-for="range in Object.keys(ranges)" :key="range" @click="select_range_period(ranges[range], range)">{{ i18n(range) }}</span>
				</div>
				<switching-by-dates :min="min" :max="max"/>
			</div>
			<div class="modal-footer m-y-10 flex items-center p-x-14">
				<div>
					<input type="time" class="m-r-10" v-model="s_time">
					<input type="time" v-model="f_time">
				</div>
				<button class="primary" @click="setDateRange">{{ i18n('Применить') }}</button>
			</div>
		</div>
	</div>
</template>

<script>
import i18n from "@/response/utils/i18n"
import { between_dates, select_range_period, min, max, ranges, s_time, f_time, modal, setDateRange } from '@/data'
import SwitchingByDates from "@/components/widgets/date-range-picker/SwitchingByDates.vue";

export default {
	setup() {
		return { i18n, between_dates, select_range_period, min, max, ranges, s_time, f_time, modal, setDateRange }
	},
	components: {
		SwitchingByDates,
	},
	methods: {
		isSelectedRange(range) {
			if (['Сегодня', 'Вчера'].includes(range)) {
				return this.between_dates[this.ranges[range][0]] && this.between_dates[this.ranges[range][1]] && !(Object.values(this.between_dates).includes('start'))
			}
			else {
				return this.ranges[range][0] == Object.keys(this.between_dates)[0] && this.ranges[range][1] == Object.keys(this.between_dates)[1]
			}
		},
	},
	//data() {
	//	return {
	//		s_date: '00:00',
	//		f_date: '23:59',
	//	}
	//},
};
</script>

<style>

.modal-footer {
	height: 42px;
    border-top: none;
}

.modal > div {
    color: #333;
}
.modal {
	position: absolute;
	top: calc(100% + 15px);
	right: 15px;
    left: unset;
    bottom: unset;
}

.primary {
	height: 30px;
	padding: 0 10px;
	color: white;
	border-radius: 3px;
    background: rgb(27, 179, 148);
    margin-left: auto;
}

.date-title {
    background: rgb(27, 179, 148);
    height: 42px;
}

.modal {
	display: inline-flex;
	/* padding: 18px 22px; */
    box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);
	border-radius: 6px;
	overflow: hidden;
}

.p-x-14 {
	padding-left: 14px;
	padding-right: 14px;
}

.m-y-10 {
    margin-top: 10px;
    margin-bottom: 10px;
}

.m-b-14 {
    margin-bottom: 14px;
}

.m-r-10 {
	margin-right: 10px;
}

.date-ranges {
	min-width: 170px;
	margin-right: 15px;
}

.date-range {
    background: #f5f5f5;
    color: #08c;
    padding: 0 12px;
    border-radius: 5px;
    cursor: pointer;
	transition: .1s;
    
    min-height: 28px;
    font-size: 13.7px;
    display: flex;
    align-items: center;
}

.date-range:hover {
    background: #08c;
    color: #fff;
}

.date-range.selected {
    background: #08c;
    color: #fff;
}
.date-range:not(.date-range:last-child) {
	margin-bottom: 8px;
}

input[type="time"] {
	border: 1px solid #bbb;
	border-radius: 3px;
	padding: 0 6px;
}
input[type="time"]::-webkit-calendar-picker-indicator {
	cursor: pointer;
}
input[type="time"]:focus {
	outline: none;
}

</style>
