<template>
    <div class="made-requests-content">
        <div class="flex justify-around gap-x-10">
            <div class="flex flex-col w-1/2">
                <h2>{{ i18n('Анализ новости') }}</h2>
<!--              analyze type-->
<!--              поиск по анализам новостей-->
                <input v-model="condition_name" class="form-control my-3" type="text" :placeholder="i18n('Введите условие')" >
                <div class="used-prompt-list static scrollbar" style="max-height: 400px;">
                    <div class="used-prompt empty-list_item" v-if="sorted_analyze_prompt_list.length == 0">{{ i18n('Список пуст') }}</div>
                    <div
                        class="used-prompt"
                        v-else v-for="used_prompt in sorted_analyze_prompt_list"
                        :key="used_prompt"
                        :title="used_prompt"
                        @click="chatgpt_more(chatgpt_item?.logs[used_prompt])"
                    >{{ used_prompt }}</div>
                </div>
            </div>
<!--          последние две reaction-->
            <div class="flex flex-col w-1/2">
                <h2>{{ i18n('Ответ') }}</h2>
<!--              поиск по ответам от бизнеса - государства и тд-->
                <input v-model="person_name" class="form-control my-3" type="text" :placeholder="i18n('Введите, от чьего лица вы ожидали ответ')" >
                <div class="used-prompt-list static scrollbar" style="max-height: 400px;">
                    <div class="used-prompt empty-list_item" v-if="sorted_reaction_prompt_list.length == 0">{{ i18n('Список пуст') }}</div>
                    <div
                        class="used-prompt"
                        v-else v-for="used_prompt in sorted_reaction_prompt_list"
                        :key="used_prompt"
                        :title="used_prompt"
                        @click="chatgpt_more(chatgpt_item?.logs[used_prompt])"
                    >{{ used_prompt }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from "@/response/utils/i18n"
import { chatgpt_item, chatgpt_more } from '@/response/data/index'

export default {
    setup() {
        return { i18n, chatgpt_item, chatgpt_more }
    },
    data() {
        return {
            condition_name: '',
            person_name: '',
        }
    },
    computed: {
        analyze_prompt_list() {
            return Object.values(this.chatgpt_item?.logs ?? {}).filter(log => log?.type == 'analyze').map(log => log?.promt)
        },
        reaction_prompt_list() {
            return Object.values(this.chatgpt_item?.logs ?? {}).filter(log => log?.type == 'reaction').map(log => log?.promt)
        },
      // фильтрация введенного текста на условия
        sorted_analyze_prompt_list() {
            let temp_prompt_list = this.analyze_prompt_list
                .filter(used_prompt => used_prompt?.lowerIncludes(this.condition_name))
            temp_prompt_list.sort((a,b) => {
                if (a?.lowerIncludes(this.condition_name) == false && b?.lowerIncludes(this.condition_name) == false) {
                    return 0
                }
                else if (a?.lowerIncludes(this.condition_name) && b?.lowerIncludes(this.condition_name)) {
                    return a?.indexOf(this.condition_name) < b?.indexOf(this.condition_name) ? -1 : 0
                }
                else{
                    return a?.lowerIncludes(this.condition_name) && b?.lowerIncludes(this.condition_name) == false ? -1 : 0
                }
            });

            return temp_prompt_list;
        },
        sorted_reaction_prompt_list() {
            let temp_prompt_list = this.reaction_prompt_list
                .filter(used_prompt => used_prompt?.lowerIncludes(this.person_name))
            temp_prompt_list.sort((a,b) => {
                if (a?.lowerIncludes(this.person_name) == false && b?.lowerIncludes(this.person_name) == false) {
                    return 0
                }
                else if (a?.lowerIncludes(this.person_name) && b?.lowerIncludes(this.person_name)) {
                    return a?.indexOf(this.person_name) < b?.indexOf(this.person_name) ? -1 : 0
                }
                else{
                    return a?.lowerIncludes(this.person_name) && b?.lowerIncludes(this.person_name) == false ? -1 : 0
                }
            });

            return temp_prompt_list;
        },
    }

}

</script>

<style scoped>
h2 {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    font-size: 19px;
    font-weight: 700;
}
.form-control {
    height: 35px !important;
    border-radius: 3px;
    /* max-width: 400px; */
    font-size: 15px !important;
}
.empty-list_item {
    background: white !important;
    color: #ccc;
    cursor: default;
}
</style>