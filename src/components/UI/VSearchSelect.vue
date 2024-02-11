<template>
    <div class="inline-flex relative">
<!--      компонент для инпута с поиском-->
        <div
            @click.stop="toggle_prompt_list_modal()" 
            class="inline-flex text-white justify-between items-center cursor-pointer select-title"
            style="background: white;border: 1px solid #3b5998;padding: 0;overflow: hidden;color: #858585;min-width: 130px;width: 100%;height: 28px;"
        >
            <input
                type="text"
                class="focus:outline-none"
                style="height: 100%;width: 100%;padding-left: 8px;"
                :placeholder="placeholder"
                autocomplete="off"
                id="analyze-input"
                @click.stop="set_list_modal(modal_name)"
                v-model="input"
                @input="inputCallback($event.target.value)">
            
            
            <i class="fa-solid fa-angle-down transition-all" style="margin-left:5px;margin-right: 6px;height:12px;" @click.stop="toggle_prompt_list_modal()" :class="{
                'rotate-x-180': list_modal == modal_name
            }"></i>
        </div>
        <div class="absolute top-full right-0 left-0 transition-all select-options" :style="{
                height: list_modal == modal_name ? '' : '0px',
            }">
            <div class="flex flex-col select-none select-options-styles scrollbar" style="max-height: 200px;">
                <div class="select-option pointer-events-none"
                    style="border-color: #ccc;color: #ccc;"
                    v-if="sorted_list.length == 0"
                >{{ 'Список пуст' }}</div>
                <div
                    class="select-option select-none" 
                    v-else
                    v-for="item in sorted_list"
                    :key="item_ids[item]"
                    :title="`${item_ids[item]} - ${item}`"
                    @click="set_list_modal('');callback(item_ids[item]);input = '';"
                    :class="{
                        active: input == item
                    }">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    methods: {
        
        toggle_prompt_list_modal() {
            let newValue = this.list_modal != this.modal_name ? this.modal_name : '';
            this.set_list_modal(newValue);
            if (newValue) {
                document.querySelector('#reaction-input')?.focus()
            }
            else {
                document.querySelector('#reaction-input')?.blur()
            }
        },
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        trigger: {
            type: String,
            required: true,
        },
        list_modal: {
            type: Boolean,
            required: true,
        },
        modal_name: {
            type: String,
            required: true,
        },
        set_list_modal: {
            type: Function,
            required: true,
        },
        defaultInput: {
            type: String,
            required: false,
            default: '',
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Карта ...',
        },
        inputCallback: {
            type: Function,
            required: false,
            default: () => {}
        },
        callback: {
            type: Function,
            required: true,
        },
    },
    data() {
        let default_input = this.defaultInput || '';
        return {
            input: default_input,
        }
    },
    computed: {
        item_ids() {
            return this.list.reduce((prev, item) => ({...prev, [item[this.name]]: item[this.trigger]}), {})
        },
        names() {
            return this.list.map(item => item[this.name]);
        },
        sorted_list() {
            if (this.input == '') return this.names;
            else {
                return this.names
                    .filter(item => (item || '').lowerIncludes(this.input))
                    .sort((a,b) => {
                        if (a?.lowerIncludes(this.input) == false && b?.lowerIncludes(this.input) == false) {
                            return 0
                        }
                        else if (a?.lowerIncludes(this.input) && b?.lowerIncludes(this.input)) {
                            return a?.indexOf(this.input) < b?.indexOf(this.input) ? -1 : 0
                        }
                        else {
                            return a?.lowerIncludes(this.input) && b?.lowerIncludes(this.input) == false ? -1 : 0
                        }
                    });
            }
        },
    },
}

</script>

<style>

.rotate-x-180 {
    transform: rotateX(180deg);
}
.select-option {
    padding:6px 7px;
    cursor:pointer;
    height:27px;
    white-space:nowrap;
    transition: .15s;
}

.select-option.active,
.select-option:hover {
    background: rgb(59, 89, 152);
    color: white;
}

.select-option:not(.select-option:last-child) {
    border-bottom:1px solid rgb(59, 89, 152);
}

.select-options {
    z-index:1;
    overflow-y: clip;
}
.select-options-styles {
    font-size:13px;
    background:white;
    border-radius:4px;
    border:1px solid rgb(59, 89, 152);
    margin-top: 5px;
}

.select-title {
    background:rgb(59, 89, 152);
    height:27px;
    padding:0px 8px 2px;
    border-radius:4px;
    font-size:13px;
    width:150px;
}
.select-input-error {
    border-color: red !important;
}


</style>