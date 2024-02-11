<template>
    <div class="nav-pagination">
        <div class="hovered-angle">
            <i
                class="fa-solid fa-angles-left first-page icon-w-0"
                @click="set_selected_page(1)"
            ></i>
            <i
                class="fa fa-angle-left first-page border-radius-0"
                @click="
                    set_selected_page(selected_page == 1 ? 1 : selected_page - 1)
                    "
            ></i>
        </div>
        <span
            v-for="page in pagination"
            :key="page"
            :class="{
                active: page == selected_page,
            }"
            @click="set_selected_page(page)"
            >{{ page }}</span
        >
        <div class="hovered-angle">
            <i
                class="fa fa-angle-right second-page border-radius-0"
                @click="
                    set_selected_page(selected_page == getPaginationCount
                        ? getPaginationCount
                        : selected_page + 1)
                    "
            ></i>
            <i
                class="fa-solid fa-angles-right second-page icon-w-0"
                :title="`${i18n('Последняя страница')}: ${getPaginationCount.push_space()}`"
                @click="set_selected_page(getPaginationCount)"
            ></i>
        </div>
    </div>
</template>

<script>
import i18n from "@/response/utils/i18n"

export default {
    setup() {
        return { i18n }
    },
    props: {
        selected_page: {
            type: Number,
            required: true,
        },
        general_count: {
            type: Number,
            required: true,
        },
        set_selected_page: {
            type: Function,
            required: true,
        },
        updateList: {
            type: Function,
            required: true,
        },
    },
    computed: {
        getPaginationCount() {
            return Math.ceil(this.general_count / 20);
        },
        pagination() {
            let pagination_array = [];
            if (this.selected_page >= 4) {
                let start_index = this.selected_page - 3;
                let end_index = start_index + 9;

                if (end_index >= this.getPaginationCount) {
                    start_index = this.getPaginationCount - 9;
                    if (start_index <= 0) start_index = 1;
                    end_index = this.getPaginationCount;
                }

                for (let i = start_index; i < end_index + 1; i++) {
                    pagination_array.push(i);
                }
            } else {
                let start_index = 1;
                let end_index = start_index + 9;

                if (end_index >= this.getPaginationCount) {
                    start_index = this.getPaginationCount - 9;
                    if (start_index <= 0) start_index = 1;
                    end_index = this.getPaginationCount;
                }

                for (let i = start_index; i < end_index + 1; i++) {
                    pagination_array.push(i);
                }
            }
            return pagination_array;
        },
    }
}

</script>