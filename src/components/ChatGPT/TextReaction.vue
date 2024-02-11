<template>
<!--  чат с гпт-->
    <div @click.stop="select_options_modal = false; used_prompt_list_modal = false;" class="h-full flex flex-col">
        <div class="right-modal-menu">
            <a @click="current_user_logs_type = ''" 
                class="flex px-3 min-h-[30px] py-1 items-center gap-3 transition-colors duration-200 cursor-pointer rounded-md border dark:border-white/20 gizmo:min-h-0 hover:bg-gray-500/10 h-11 gizmo:h-10 gizmo:rounded-lg gizmo:border-[rgba(0,0,0,0.1)] bg-white dark:bg-transparent flex-grow overflow-hidden">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                    stroke-linejoin="round" class="icon-sm shrink-0" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span class="truncate">{{ i18n('Создать чат') }}</span>
            </a>
            <div class="gray-scrollbar overflow-y-auto overflow-x-hidden" style="height: calc(100% - 30px);padding-left: 2px;">
                <a v-for="chat_name in user_chat_names" :key="chat_name"
                    class="flex p-3 mt-[4px] items-center gap-3 relative rounded-md hover:bg-gray-100 cursor-pointer break-all group"
                    :class="{
                        'pr-14': chat_name == current_user_logs_type,
                        'bg-gray-100': chat_name == current_user_logs_type
                    }"
                    @click="current_user_logs_type = chat_name; "
                    :style="{
                        boxShadow: !isCorrectRequest && request_text == chat_name ? '0 0 7px rgb(255 0 0 / 30%)' : '',
                    }"
                >
                    <svg stroke="currentColor"
                        fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                        class="icon-sm text-black" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <input
                        v-if="edit_some_chat.previous_name == chat_name && current_user_logs_type == chat_name"
                        type="text"
                        :maxlength="50"
                        class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative text-black"
                        v-model="edit_some_chat.name"
                        :style="`outline: 1px solid ${validation_chat_name(edit_some_chat.name) ? 'red' : 'blue'};margin-right: 5px;padding: 8px 1px;`"
                        @keydown.enter="update_user_logs_type_name">
                    <div v-else class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative text-black" style="padding: 0 0 14px;">{{ chat_name }}
                        <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-white"></div>
                    </div>
                    <div class="absolute flex right-1 z-10 text-gray-700/50 " :class="{
                        hidden: chat_name != current_user_logs_type
                    }"><button class="p-1 hover:text-token-text-primary hover:text-gray-500">
<!--                       edit chat name-->
                            <svg v-if="edit_some_chat.previous_name != chat_name" @click="edit_some_chat.previous_name = chat_name;edit_some_chat.name = chat_name;" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <svg v-else @click="update_user_logs_type_name" stroke="currentColor" fill="none"
                                stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                                class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
<!--                      delete chat name-->
                        <button class="p-1 hover:text-token-text-primary hover:text-red-500">
                            <svg v-if="edit_some_chat.previous_name != chat_name" @click="confirm_delete_chat_modal = true" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            <svg v-else @click="edit_some_chat = { previous_name: null, name: null }" stroke="currentColor"
                                fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round" class="icon-sm" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </a>
            </div>
        </div>
        <div
            class="padding-[40px] m-auto max-w-[750px] text-center"
            style="font-size: 20px;text-wrap: pretty;color: gray;"
            v-if="current_user_logs.length == 0"
        >
            Готов ответить на ваши вопросы, помочь с задачами или просто поболтать. <br><br>Чем я могу помочь сегодня?
        </div>
<!--      содержится вопросы и ответы гпт-->
        <div class="chatgpt-messages w-full flex flex-col text-sm">
            <template v-for="(log, index) in current_user_logs" :key="log?.id">
                <div class="group w-full text-token-text-primary border-b border-black/10 gizmo:border-0 border-gray-400/50 gizmo:border-0 gizmo:bg-transparent  gizmo:bg-transparent"
                    data-testid="conversation-turn-2" style="--avatar-color: #19c37d;">
                    <div class="p-4 justify-center text-2xl md:gap-6 md:py-6 m-auto">
                        <div
                            class="flex flex-1 gap-4 text-2xl mx-auto md:gap-6 gizmo:gap-3 gizmo:md:px-5 gizmo:lg:px-1 gizmo:xl:px-5 md:max-w-2xl lg:max-w-[50rem] gizmo:md:max-w-3xl gizmo:lg:max-w-[40rem] xl:max-w-[65rem] }">
                            <div class="flex-shrink-0 flex flex-col relative items-end">
                                <div>
                                    <div class="relative flex">
                                        <i class="fa fa-user"
                                            style="font-size: 25px;text-align: center;width: 36px;color: #bda1ff;"></i>
                                    </div>
                                </div>
                                <!-- currentLogsPromt -->
                                <!-- currentLogsResult -->
                                <div v-show="Array.isArray(log?.promt) && log?.promt?.length > 1" class="text-xl flex items-center justify-center gap-1 absolute top-2 -translate-x-full mr-[10px]">
<!--                                  переключение ответов от гпт  -->
                                  <button
                                        @click="minusCurrentPromt(log, index)"
                                        :style="currentLogsPromt[index] == 0 && 'color: darkgray;pointer-events: none;'"
                                    >
                                        <svg
                                            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon-xs" height="1.2em"
                                            width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <span class="flex-grow flex-shrink-0 tabular-nums">{{ ((currentLogsPromt[index] + 1) || log?.promt.length) }} / {{ log?.promt?.length }}</span>
                                    <button
                                        @click="plusCurrentPromt(log, index)"
                                        :style="(currentLogsPromt[index] ?? (log?.promt.length - 1)) == (log?.promt.length - 1) && 'color: darkgray;pointer-events: none;'"
                                    >
                                        <svg
                                            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon-xs" height="1.2em"
                                            width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                class="relative flex w-[calc(100%-50px)] flex-col gap-1 gizmo:w-full md:gap-3 lg:w-[calc(100%-115px)] gizmo:text-gizmo-gray-600 gizmo:text-gray-300">
                                
                                <div class="flex flex-grow flex-col gap-3 max-w-full" v-show="editable_logs[getLogPromt(log, index)]">
                                    <span
                                        :id="editable_logs[getLogPromt(log, index)] && 'chatgpt-editable-text'"
                                        tabindex="0"
                                        data-id="root"
                                        rows="1"
                                        :placeholder="i18n('Отправить сообщение')"
                                        :class="{
                                            'incorrect-request': !isCorrectRequest || user_logs_loading[current_user_logs_type]
                                        }"
                                        class="chatgpt-textbox-scrollbar gray-scrollbar m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 pl-3 md:pl-4 focus:outline-none"
                                        style="overflow-y: auto;max-height: 200px;min-height: 42px;line-height: 1.3;color: black;"
                                        role="textbox"
                                        contenteditable="plaintext-only"
                                        :style="{
                                            boxShadow: `0 0 7px ${isCorrectRequest ? 'rgba(0,0,0,.1)' : 'rgba(255,0,0,.3)'}`,
                                            borderRadius: '8px'
                                        }"
                                        @input="editable_log_text = $event.target.innerText"
                                        @keydown.enter="edit_log($event, log, index)"
                                    >{{ getLogPromt(log, index) }}</span>
                                    <div class="text-center mt-2 flex justify-center">
                                        <button class="btn relative btn-primary mr-2" as="button" @click="edit_log($event, log, index)">
                                            <div class="flex w-full gap-2 items-center justify-center">Сохранить и отправить</div>
                                        </button>
                                        <button class="btn relative btn-neutral" as="button" @click="editable_logs[getLogPromt(log, index)] = false">
                                            <div class="flex w-full gap-2 items-center justify-center">Отмена</div>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-grow flex-col gap-3 max-w-full" v-show="!editable_logs[getLogPromt(log, index)]">
                                    <div class="min-h-[20px] flex flex-col items-start gap-3 whitespace-pre-wrap break-words overflow-x-auto">
                                        <div class="">{{ getLogPromt(log, index) }}</div>
                                    </div>
                                </div>
                                <div
                                    v-show="!editable_logs[getLogPromt(log, index)]"
                                    class="text-gray-400 flex self-end lg:self-center justify-center gizmo:lg:justify-start mt-2 gizmo:mt-0 visible lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 gap-2 md:gap-3 gizmo:absolute gizmo:right-0 gizmo:top-1/2 gizmo:-translate-y-1/2 gizmo:transform">
                                    <button
                                        class="p-1 gizmo:pl-0 rounded-md disabled:hover:text-gray-400 hover:text-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 hover:bg-gray-300 md:invisible md:group-hover:visible"
                                        @click="editable_logs[getLogPromt(log, index)] = true"
                                    >
                                        <svg
                                            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1.2em"
                                            width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex justify-between empty:hidden lg:block"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="group w-full text-token-text-primary border-b border-black/10 gizmo:border-0 border-gray-400/50 gizmo:border-0 bg-gray-100 gizmo:bg-transparent bg-[#444654] gizmo:bg-transparent"
                    data-testid="conversation-turn-3" style="--avatar-color: #19c37d;">
                    <div class="p-4 justify-center text-2xl md:gap-6 md:py-6 m-auto">
                        <div
                            class="flex flex-1 gap-4 text-2xl mx-auto md:gap-6 gizmo:gap-3 gizmo:md:px-5 gizmo:lg:px-1 gizmo:xl:px-5 md:max-w-2xl lg:max-w-[50rem] gizmo:md:max-w-3xl gizmo:lg:max-w-[40rem] xl:max-w-[65rem] }">
                            <div class="flex-shrink-0 flex flex-col relative items-end">
                                <div>
                                    <div class="relative p-1 rounded-sm h-9 w-9 text-white flex items-center justify-center"
                                        style="background-color: rgb(25, 195, 125); width: 36px; height: 36px;padding: 5px;border-radius: 5px;">
                                        <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="icon-md" role="img"><text x="-9999"
                                                y="-9999">ChatGPT</text>
                                            <path
                                                d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div v-show="(typeof log.result != 'string' && getLogResultArray(log, index).length > 1)" class="text-xl flex items-center justify-center gap-1 absolute top-2 -translate-x-full mr-[10px]">
                                    <button
                                        @click="minusCurrentResult(log, index)"
                                        :style="currentLogsResult[getLogPromt(log, index)] == 0 && 'color: darkgray;pointer-events: none;'"
                                    >
                                        <svg
                                            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon-xs" height="1.2em"
                                            width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <span class="flex-grow flex-shrink-0 tabular-nums">{{ ((currentLogsResult[getLogPromt(log, index)] + 1) || getLogResultArray(log, index).length) }} / {{ getLogResultArray(log, index).length }}</span>
                                    <button
                                        @click="plusCurrentResult(log, index)"
                                        :style="(currentLogsResult[getLogPromt(log, index)] ?? (getLogResultArray(log, index).length - 1)) == (getLogResultArray(log, index).length - 1) && 'color: darkgray;pointer-events: none;'"
                                    >
                                        <svg
                                            stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon-xs" height="1.2em"
                                            width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                class="relative flex w-[calc(100%-50px)] flex-col gap-1 gizmo:w-full md:gap-3 lg:w-[calc(100%-115px)] agent-turn">
                                <div class="flex flex-grow flex-col gap-3 max-w-full">
                                    <div
                                        class="min-h-[20px] flex flex-col items-start gap-3 whitespace-pre-wrap break-words overflow-x-auto">
                                        <div class="markdown prose w-full break-words prose-invert light">
                                            <p
                                                :class="{
                                                    'gpt-response-loading': !getLogResult(log, index)
                                                }"
                                                class="font-bold"
                                            >{{ getLogResult(log, index) || '...' }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between empty:hidden lg:block">
                                    <div
                                        class="text-gray-400 flex self-end lg:self-center justify-center gizmo:lg:justify-start mt-2 gizmo:mt-0 visible lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 gap-2 md:gap-3">
                                        <button
                                            class="flex ml-auto gizmo:ml-0 gap-2 items-center rounded-md p-1 text-xl gizmo:gap-1.5 gizmo:pl-0 text-gray-400 hover:bg-gray-300 hover:text-gray-200 disabled:hover:text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                            @click="copyResponse(log)">
                                            <svg v-show="!copied_log[getLogResult(log, index)]" stroke="currentColor" fill="none" stroke-width="2"
                                                viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                                                class="icon-sm" height="1.2em" width="1.2em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                                </path>
                                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                            </svg>
                                            <svg v-show="copied_log[getLogResult(log, index)]" stroke="currentColor" fill="none" stroke-width="2"
                                                viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                                                class="icon-sm" height="1.2em" width="1.2em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
<!--      кнопка для повторной генерации запроса-->
        <div
            v-if="user_logs[current_user_logs_type]?.length && !user_logs_loading[current_user_logs_type]"
            class="mt-auto mx-auto pb-[14px] pt-[20px]"
            style="border-radius: 0px 0px 5px 5px;position: absolute;bottom: 54px;right: calc(140px + 17px);margin-bottom: -17px !important;z-index: 1;padding: 0px;">
            <button @click="regenerate_gpt_request" class="btn relative btn-neutral -z-0 whitespace-nowrap bg-white border hover:bg-gray-200" as="button" style="border-width: 1px;border-color: lightgray;">
                <div class="flex w-full gap-2 items-center justify-center"><svg stroke="currentColor" fill="none"
                        stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                        class="flex-shrink-0 icon-xs" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="1 4 1 10 7 10"></polyline>
                        <polyline points="23 20 23 14 17 14"></polyline>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>{{ i18n('Повторная генерация') }}</div>
            </button>
        </div>
        <div class="w-full mt-auto mx-auto pb-[14px] pt-[20px]"
            style="border-radius: 0 0 5px 5px;position: absolute;bottom: 0px;right: 17px;left: 17px;margin-bottom: -17px !important;max-width: 720px;z-index: 1;padding: 0;">

            <div class="flex w-full items-center">
                <div class="flex flex-col w-full flex-grow relative border border-black/10 gizmo:border-gray-100/10 border-gray-400/50 text-white rounded-xl shadow-xs shadow-xs bg-gray-700 bg-white gizmo:bg-[#F5F5F5] gizmo:shadow-[0_0_0_2px_rgba(255,255,255,0.95)] gizmo:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]"
                    style="border-radius: 0.75rem;background: white;/* background: rgb(55 65 81/var(--tw-bg-opacity)); */box-shadow: 0 0 transparent, 0 0 transparent, 0 0 15px rgba(0,0,0,.1);border: none;">
                    <span id="chatgpt-prompt-textarea" tabindex="0" data-id="root" rows="1"
                        :placeholder="i18n('Отправить сообщение')"
                        :class="{
                            'incorrect-request': !isCorrectRequest || user_logs_loading[current_user_logs_type]
                        }"
                        class="chatgpt-textbox-scrollbar gray-scrollbar m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 pl-3 md:pl-4 focus:outline-none"
                        style="overflow-y: auto;max-height: 200px;min-height: 42px;line-height: 1.3;color: black;"
                        role="textbox" contenteditable='plaintext-only' :style="{
                            boxShadow: `0 0 7px ${isCorrectRequest ? 'rgba(0,0,0,.1)' : 'rgba(255,0,0,.3)'}`,
                            borderRadius: '8px'
                        }"
                        @input="request_text = $event.target.innerText"
                        @keydown.enter="(event) => {current_editable_log_index = current_user_logs?.length;send_gpt_request(event)}"></span>
                    <!-- <span class="textarea" role="textbox" contenteditable></span> -->
                    <button @click="(event) => {current_editable_log_index = current_user_logs?.length;send_gpt_request(event)}"
                        class="chatgpt-request-send absolute p-1 rounded-md md:bottom-3 gizmo:md:bottom-2.5 md:p-2 md:right-3 hover:bg-gray-900 disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple gizmo:enabled:bg-transparent gizmo:text-gray-500 gizmo:text-gray-300 bottom-1.5 transition-colors disabled:opacity-40"
                        data-testid="send-button">
                        <span class="" data-state="closed">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
                                class="icon-sm m-1 md:m-0" width="16">
                                <path
                                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                                    fill="currentcolor"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full mt-auto mx-auto pb-[14px] pt-[20px]"
            style="border-radius: 0px 0px 5px 5px;position: absolute;bottom: 2px;right: 26px;left: 19px;width: calc(100% - 30px);width: calc(100% - 46px);margin-bottom: -34px;box-shadow: rgb(255, 255, 255) 0px -99px 58px -18px inset;height: 138px;pointer-events: none;">
        </div>

<!--        модалка при удалении чата в гпт-->
        <div
            class="modal fade left-0 right-0 top-0 bottom-0"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            :style="confirm_delete_chat_modal ? '' : 'opacity: 0;pointer-events: none;'"
            @click="confirm_delete_chat_modal = false">
            <div class="modal-dialog" style="width: 500px;transition: .15s;" :style="confirm_delete_chat_modal ? 'top: 25%;' : ''" @click.stop>
                <div class="modal-content" style="border-radius: 10px;">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-size: 26px;">{{ i18n('Удалить чат?') }}</h1>
                    </div>
                    <div class="modal-body" style="line-height: 1.42857143;">{{ i18n('Будет удален следующий чат') }}: <b>{{ current_user_logs_type }}</b></div>
                    <div class="modal-footer" style="height: auto;border-top: 1px solid #e5e5e5;">
                        <button class="btn btn-w-m btn-default" @click="confirm_delete_chat_modal = false" style="min-width: unset;margin-right: 10px;">{{ i18n('Отмена') }}</button>
                        <button class="btn btn-w-m btn-danger" @click="delete_user_logs_by_type" style="min-width: unset;">{{ i18n('Удалить') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="modal fade left-0 right-0 top-0 bottom-0"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            :style="chatgpt_error_modal ? '' : 'opacity: 0;pointer-events: none;'"
            @click="chatgpt_error_modal = false">
            <div class="modal-dialog" style="width: 500px;transition: .15s;" :style="chatgpt_error_modal ? 'top: 25%;' : ''" @click.stop>
                <div class="modal-content" style="border-radius: 10px;">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-size: 26px;">{{ i18n('Ошибка при формировании ответа') }}</h1>
                    </div>
                    <div class="modal-body" style="line-height: 1.42857143;">{{ i18n('Извините, ваш запрос содержит слишком много слов.') }}<br>{{ i18n('Пожалуйста, сократите текст запроса.') }}</div>
                    <div class="modal-footer" style="height: auto;border-top: 1px solid #e5e5e5;">
                        <button class="btn btn-w-m btn-primary" @click="chatgpt_error_modal = false" style="min-width: unset;">{{ i18n('Хорошо') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from "@/response/utils/i18n"
import { Configuration, OpenAIApi } from "openai"
import { chatgpt_item, chatgpt_tab, chatgpt_log } from '@/response/data/index'
import { getGptLogs, getGptUserLogs } from '@/response/api'
import { r_type, search_tags } from '@/response/header'
import { getLang } from "@/response/utils/langIs"
import axios from 'axios'

const configuration = new Configuration({
    apiKey: process.env.VUE_APP_APIKEY,
});

const openai = new OpenAIApi(configuration);

export default {
    data() {
        const default_requests = {
            "бизнес": this.i18n("с точки зрения бизнеса"),
            "государство": this.i18n("с точки зрения государства"),
            "граждане страны": this.i18n("с точки зрения гражданина страны"),
            "сил.структуры": this.i18n("с точки зрения силовых структур"),
            "разные т.з.": this.i18n("с разных точек зрения"),
            "пресс-релиз": this.i18n("и составь пресс-релиз по этой публикации, объемом до 1800 знаков, на русском языке"),
            "план действий таблицей": this.i18n("и составь план действий для всех участников этой ситуации для ее разрешения и улучшения"),
            "выработай рекомендации": this.i18n("и выработай список из 3-5 рекомендаций для улучшения деятельности организации ... по описанной ситуации"),
            "негатив в позитив": this.i18n("и предложи 5 идей как отреагировать на эту публикацию так, чтобы негативный эффект для организации ... перевести в позитивный"),
        };
        const tab_info = this.i18n(`Анализ перспективы - это инструмент, при помощи которого вы можете получить от языковой модели подробный анализ публикации с той или иной точки зрения. На вход GPT подается выражение - запрос: <b>"Проведите подробный анализ данной новости с точки зрения ..."</b> <br> В меню <b>"Условие"</b> можно выбрать одну из общественных групп или задать свою.<br><br> После выбора нажмите <b>"Запуск"</b> и подождите, пока сформируется ответ (10-20 секунд).`)
        return {
            tab_info: tab_info,
            default_type_requests: {
                analyze: 'Проведите подробный анализ данной новости',
                reaction: 'Проанализируйте данную новость и сформируйте публичный комментарий для прессы по событию от лица',
                generalization: 'Сформулируйте главную информацию новости в 3-4 предложения. Затем выделите основных действующих лиц, компании, службы',
            },
            request_type: 'analyze',
            default_requests: default_requests,
            select_options_modal: false,

            condition: "",
            input: "",
            output: "",
            confirm_delete_chat_modal: false,
            dropdown_menu: false,
            used_prompt_list_modal: false,
            used_prompt_list: [],
            all_default_request_list: [...Object.values(default_requests), `${this.i18n("Обобщение")}`, `${this.i18n("организации ... в позитивном ключе, объемом на английском языке.")}`],
            answer_lang: {
                ru: 'Russian',
                en: 'English',
                kz: 'Kazakh',
            },
            additional_info: '',

            analyze_prompts_modal: null,
            reaction_prompts_modal: null,
            request_text: '',
            current_user_logs_type: '',
            user_logs: {},
            user_logs_loading: {},
            edit_some_chat: {
                previous_name: null,
                name: null,
            },
            chatgpt_error_modal: false,
            currentLogsResult: {},
            currentLogsPromt: {},
            current_editable_log_index: 0,
            editable_logs: {},
            copied_log: {},
        }
    },
    setup() {
        return {
            i18n,
            getGptLogs,
            getGptUserLogs,
            chatgpt_item,
            chatgpt_tab,
            chatgpt_log,
            r_type,
            search_tags,
            getLang,
        }
    },
    computed: {
        current_user_logs() {
            if (!this.current_user_logs_type) return []

            let user_logs = [];
            
            JSON.parse(JSON.stringify(this.user_logs[this.current_user_logs_type] ?? []))?.forEach(log => {
                if (user_logs.length == 0 || (user_logs?.at(log.news_id)) == undefined) {
                    log.result = {
                        [log.promt]: [log.result]
                    }
                    log.promt = [log.promt]
                    user_logs.push(log)
                    return;
                }
                let lastLog = user_logs?.at(log.news_id) ?? log;

                // В каком формате хранить чтобы потом мочь свапать

                if (!Array.isArray(lastLog?.promt)) {
                    lastLog.promt = [lastLog?.promt];
                }
                if (!lastLog?.promt.includes(log.promt)) {
                    lastLog?.promt?.push(log.promt)
                }
                
                if (typeof lastLog.result == 'string') {
                    lastLog.result = {};
                }
                if (lastLog.result[log.promt] === undefined) {
                    lastLog.result[log.promt] = [];
                }
                lastLog.result[log.promt] = [...lastLog.result[log.promt], log.result]

                user_logs[log.news_id] = lastLog;
            });

            user_logs = user_logs.filter(val => val)

            console.log('user_logs', user_logs);

            return user_logs
        },
        isCorrectRequest() {
            return !(['analyze','reaction',...this.user_chat_names].includes(this.request_text))
        },
        load_circle_analyze() {
            return this.chatgpt_item?.logs && this.condition && this.chatgpt_item?.logs[this.condition] == 'loading'
        },
        user_chat_names() {
            let user_log_types = Object.entries(this.user_logs)
                ?.map(
                    ([chat_name, logs]) => {
                        const timestamp = Math.max(...logs.map(
                            log => (new Date(log.date).valueOf())
                        ))
                        return [chat_name, timestamp]
                    }
                );

            user_log_types?.sort((a,b) => (b[1] - a[1]))

            return user_log_types?.map((user_log) => user_log[0])
        },
    },
    methods: {
        async edit_log(event, log, index) {
            this.current_editable_log_index = index;
            this.request_text = document.querySelector('#chatgpt-editable-text').innerText;
            this.editable_logs[this.getLogPromt(log, index)] = false;
            await this.send_gpt_request(event);
        },
        getLogPromt(log, index) {
            return log?.promt[
                this.currentLogsPromt[index] ?? (log?.promt?.length - 1)
            ];
        },
        getLogResult(log, index) {
            let temp_promt = log?.promt[
                this.currentLogsPromt[index] ?? (log?.promt?.length - 1)
            ];

            return log?.result[temp_promt]?.at(this.currentLogsResult[temp_promt] ?? -1);
        },
        getLogResultArray(log, index) {
            let temp_promt = log?.promt[
                this.currentLogsPromt[index] ?? (log?.promt?.length - 1)
            ];

            return log?.result[temp_promt] ?? [];
        },
        minusCurrentResult(log, index) {
            console.log(log, index, 'minus');

          //   пример log -  {
          //   "id": "2021",
          //   "user_id": "2073",
          //   "date": "2024-01-28 14:37:14",
          //   "news_type": "0",
          //   "news_id": "3",
          //   "promt": [
          //     "расскажи про сериал декстер",
          //     "расскажи про сериал декстер кратко"
          //   ],
          //   "result": {
          //     "расскажи про сериал декстер": [
          //       "\"Декстер\" - американский драматический телесериал, созданный компанией Showtime и основанный на серии книг Джеффа Линдсея. Главный герой, Декстер Морган, работает судебным экспертом-криминалистом по крови в полицейском департаменте Майами. В то же время он является серийным убийцей, охотящимся на преступников, которых закон не может или не хочет наказать.\r\n\r\nДекстер убивает исключительно в соответствии с непреложным \"кодексом\", который установил его покойный приемный отец - бывший полицейский Гарри Морган. Согласно этому кодексу, Декстер должен убедиться в виновности жертвы и не попасться на глаза полиции.\r\n\r\nСериал получил в основном положительные отзывы и был номинирован на 24 премии \"Эмми\".",
          //       "\"Декстер\" - это американский телесериал, который был на вещании c 2006 по 2013 год на канале Showtime. Главный персонаж, Декстер Морган, работает судмедэкспертом в полицейском департаменте Майами. Однако у него есть темная сторона - он серийный убийца, который убивает только тех преступников, кто смог избежать наказания в суде. \r\n\r\nДекстер живет по \"коду\", который его отец перенёс на него. Код этот требует непосредственных доказательств или признания вины жертвы прежде, чем Декстер совершит убийство. Код также требует, чтобы Декстер никогда не попадался.\r\n\r\nСериал был хорошо принят критиками и зрителями, получив множество наград и номинаций."
          //     ],
          //     "расскажи про сериал декстер кратко": [
          //       "\"Декстер\" - это американский телесериал о судмедэксперте Майами по имени Декстер Морган, которого в дневное время привлекает анализ места преступления и кровь, а ночью он становится серийным убийцей. Однако Декстер - не обычный убийца: он следует строгому \"кодексу\", ученому ему его приемным отцом, и убивает только тех, кто заслуживает этого, основываясь на доказательствах своих преступлений."
          //     ]
          //   },
          //   "type": "\"Виртуальный ассистент помогает с вопросами на рус",
          //   "total_tokens": "528",
          //   "deleted_at": null
          // }
          // index пример - 3

          //получаем проомпт запроса по типу - расскажи про сериал декстер
            let temp_promt = this.getLogPromt(log, index);
            // получаем result пример - массив с ответами от гпт
            let temp_results = this.getLogResultArray(log, index);

            console.log(temp_promt, temp_results)

            if (this.currentLogsResult[temp_promt] == undefined) {
                this.currentLogsResult[temp_promt] = temp_results.length - 1;
            }
            this.currentLogsResult[temp_promt] = (this.currentLogsResult[temp_promt] - 1).minmax(0, temp_results.length - 1)
        },
        plusCurrentResult(log, index) {
            console.log(log, index, 'plus');
            let temp_promt = this.getLogPromt(log, index);
            let temp_results = this.getLogResultArray(log, index);
            console.log(temp_promt, temp_results)

            if (this.currentLogsResult[temp_promt] == undefined) {
                this.currentLogsResult[temp_promt] = temp_results.length - 1;
            }
            this.currentLogsResult[temp_promt] = (this.currentLogsResult[temp_promt] + 1).minmax(0, temp_results.length - 1)
        },
        //log - запрос
        //index ответа
        minusCurrentPromt(log, index) {
            if (this.currentLogsPromt[index] == undefined) {
                this.currentLogsPromt[index] = log?.promt?.length - 1;
            }
            this.currentLogsPromt[index] = (this.currentLogsPromt[index] - 1).minmax(0, log?.promt?.length - 1)
        },
        plusCurrentPromt(log, index) {
            if (this.currentLogsPromt[index] == undefined) {
                this.currentLogsPromt[index] = log?.promt?.length - 1;
            }
            this.currentLogsPromt[index] = (this.currentLogsPromt[index] + 1).minmax(0, log?.promt?.length - 1)
        },
      // регенерируем запрос
        regenerate_gpt_request() {
            const index = this.current_user_logs.length - 1;
            this.current_editable_log_index = index;
            const temp_log = this.current_user_logs?.at(index);
            this.request_text = this.getLogPromt(temp_log, index);

            this.currentLogsResult[this.request_text] = this.getLogResultArray(temp_log, index).length - 1
            this.send_gpt_request();
        },
        update_user_logs_type_name() {
            const new_chat_name = this.edit_some_chat.name;
            const previous_name_chat_name = this.edit_some_chat.previous_name;
            this.edit_some_chat = {
                previous_name: null,
                name: null,
            };
            console.log('edit_some_chat.name =', new_chat_name);

            if (this.validation_chat_name(new_chat_name) || new_chat_name == this.current_user_logs_type) return;

            this.user_logs[new_chat_name] = this.user_logs[this.current_user_logs_type];

            delete this.user_logs[this.current_user_logs_type];

            this.current_user_logs_type = new_chat_name;
            
            setTimeout(() => {
                this.current_user_logs_type = new_chat_name;
            }, 10)

            let formData = new FormData();

            formData.append('old_type', previous_name_chat_name)
            formData.append('new_type', new_chat_name)

            axios.post(`/ru/gpt-service/update-user-logs-type`, formData)
                .then((response) => {
                    console.log('update-user-logs-type = ', response);
                    // if (response?.data == 1) {
                    // }
                })
                .catch(error => {
                    console.log('error', error);
                })
        },
        validation_chat_name(new_chat_name) {
            let temp_user_logs = Object.keys(this.user_logs)?.filter(chat_name => chat_name != new_chat_name);
            return temp_user_logs.includes(new_chat_name) || !new_chat_name;
        },
        // функция удаления чата в гпт
        delete_user_logs_by_type() {

            this.confirm_delete_chat_modal = false;

            delete this.user_logs[this.current_user_logs_type];

            let formData = new FormData();

            formData.append('type', this.current_user_logs_type)

            this.current_user_logs_type = '';

            axios.post(`/ru/gpt-service/delete-user-logs`, formData)
                .then((response) => {
                    console.log('delete-user-logs = ', response);
                    // if (response?.data == 1) {
                    // }
                })
                .catch(error => {
                    console.log('error', error);
                })
        },
        // копирование ответа от чат гпт
        copyResponse(log, index) {

            var tmp = document.createElement("INPUT");
            let temp_result = this.getLogResult(log, index);
            tmp.value = temp_result;

            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand("copy");
            document.body.removeChild(tmp);

            this.copied_log[temp_result] = true;
            setTimeout(() => {
                this.copied_log[temp_result] = false;
            }, 1500);
        },
        scrollToResponse() {
            setTimeout(() => {
                let element = document.querySelector('.chatgpt-messages > *:last-child');

                if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 20);
        },
      // запрос на отправку введенного юсера текста в гпт
        async send_gpt_request(event) {
            if (!this.request_text?.length || (event?.shiftKey) || !this.isCorrectRequest || this.user_logs_loading[this.current_user_logs_type]) return;

            // после отправки запроса очищается инпут с текстом юсера
            setTimeout(() => {
                document.querySelector('#chatgpt-prompt-textarea').innerHTML = '';
            }, 10);

            // храним введенный запрос юсера
            const temp_request_text = this.request_text;
            console.log('send_gpt_request', temp_request_text);
            // ?
            const temp_current_editable_index = this.current_editable_log_index;
            // текущиии логи юсера вопросы  ответы
            const temp_current_user_logs = this.current_user_logs;
            // очищаем текст
            this.request_text = '';

            console.log('send_gpt_request', temp_request_text)

            this.chatgpt_error = false;

            // как получаем type ?
            let type = this.current_user_logs_type ?? temp_request_text;

            if (!type || (typeof type) != 'string' || type == '') {
                this.current_user_logs_type = type = temp_request_text;
            }
            
            this.current_user_logs_type = type = type.slice(0, 50);

            if (!this.user_logs[type]) {
                this.user_logs[type] = [];
            }

            // устанавливаем длину чата в 28к символов
            const maxLength = 28_000;
            let textLength = parseInt((`The response language must be in ${this.answer_lang[this.getLang()]}.` + temp_request_text).length);
            let previousMessages = [];

            // this.user_logs[type] лежат запроса пользователя
            console.log('user_logs', this.user_logs[type]);

            // проверка на длину чата что бы оььем не был преы=вышен
            for (let i = temp_current_user_logs.length - 1; i >= 0; i--) {
                const log = temp_current_user_logs[i];

                textLength += parseInt((this.getLogPromt(log, i) + this.getLogResult(log, i)).length);

                if (textLength >= maxLength) break;

                previousMessages.push({ role: 'user', content: this.getLogPromt(log, i) });
                previousMessages.push({ role: 'assistant', content: this.getLogResult(log, i) });

                console.log('temp_current_user_logs content', this.getLogResult(log, i), log, i, this.currentLogsResult);
            }

            delete

            this.user_logs[type].push({
                date: new Date().format('Y-m-d h:i:s'),
                promt: temp_request_text,
                result: "",
                type: type,
                news_id: temp_current_editable_index
            });

            // происходит скролл до ответа от гпт
            this.scrollToResponse();

            //задаем массив с вопросом пользотвелям
            //задаем поведение гпт что бы от отвечал нам на определенном языке
            let messages = [
                { role: 'system', content: `The response language must be in ${this.answer_lang[this.getLang()]}.` },
                ...previousMessages,
                { role: 'user', content: temp_request_text },
            ];

            // для отображения лоадера
            this.user_logs_loading[type] = true;

            // проверка длины чата и переключение движка
            const total_length = messages.reduce((num, message) => (parseInt(num?.content?.length ?? 0) + parseInt(message?.content?.length ?? 0)), 0)
            let model = total_length > 14_000 ? "gpt-3.5-turbo-16k" : "gpt-4";

            // создаем чат
            try {
                //completion содержит ответ от гпт
                const completion = await openai.createChatCompletion({
                    model,
                    messages,
                })
    
                console.log('completion', completion);
                //хранится ответ от гпт
                let temp_output = completion.data.choices[0].message.content

                // если его нету return
                if (!temp_output) return;
    
                if (type != '') {
                    // ?
                    this.user_logs[type].at(-1).result = temp_output;
                    
                    this.currentLogsResult[this.user_logs[type].at(-1).promt] = (temp_current_user_logs?.at(-1)?.result?.length ?? 1) - 1
    
                    // scrollToBottom
                    if (this.current_user_logs_type == type) {
                        this.scrollToResponse();
                    }
                }

                let completion2 = {data:{usage:{total_tokens:0}}};

                // создание названия чата
                if (this.user_logs[type].length == 1) {
                    this.user_logs_loading[type] = false;
                    try {
                        messages.push({ role: 'assistant', content: temp_output });
                        messages.push({ role: 'user', content: this.i18n('Сгенерируй название этой беседы (ближе к сути), длиной не более 50 символов.') });

                        completion2 = await openai.createChatCompletion({
                            model: "gpt-4",
                            messages,
                        })

                        const old_log = this.user_logs[type];
                        delete this.user_logs[type];
                        
                        type = completion2.data.choices[0].message.content;
                        this.current_user_logs_type = type = type.slice(0, 50);
                        this.user_logs[type] = old_log;
                    }
                    catch (error) {
                        console.log('error', error, JSON.parse(JSON.stringify(error)));
                    }
                }
                this.user_logs_loading[type] = false;

                let formData = new FormData();

                // запись запроса в базу
                formData.append('news_id', temp_current_editable_index)
                formData.append('news_type', 0)
                formData.append('type', type)
                formData.append('promt', temp_request_text)
                formData.append('result', temp_output)
                formData.append('total_tokens', (completion?.data?.usage?.total_tokens ?? 0) + (completion2?.data?.usage?.total_tokens ?? 0))
    
                axios.post(`/ru/gpt-service/create-log`, formData)
                    .then((response) => {
                        console.log('create-log = ', response);
                    })
                    .catch(error => {
                        console.log('error', error);
                    })
                    .finally(async () => {
                        this.user_logs = await this.getGptUserLogs();
                    })
            }
            // модалка с ошибкой
            catch (err) {
                const error = JSON.parse(JSON.stringify(err));
                console.log('completion error status 400 is -', error.status == 400);
                if (error.status == 400) {
                    this.user_logs[type] = this.user_logs[type].filter(log => log.promt != temp_request_text);
                    this.chatgpt_error_modal = true;
                    setTimeout(() => {
                        document.querySelector('#chatgpt-prompt-textarea').innerHTML = temp_request_text;
                    }, 15);
                }
                else console.log('completion error', error);
            }

        },
        updateOutput() {
            if (!this.chatgpt_item?.logs) {
                this.condition = ''
                this.input = ''
                this.output = ''
                return;
            }
            const log_keys = Object.keys(this.chatgpt_item?.logs);

            if (log_keys.length == 0) return;
            // if (log_keys.length == 1 && log_keys[0] == this.i18n('Обобщение')) return;



            const temp_log_key = log_keys.find(prompt => (this.all_default_request_list.includes(prompt)))

            if (temp_log_key) {
                this.condition = temp_log_key

                if (temp_log_key == `${this.i18n("Обобщение")}`) this.request_type = 'generalization';
                else if (temp_log_key == `${this.i18n("организации ... в позитивном ключе, объемом на английском языке.")}`) this.request_type = 'reaction';
            }

            if (this.condition == '') {
                const log_key = log_keys.find(prompt => (!this.all_default_request_list.includes(prompt)))
                if (log_key) this.input = log_key
            }

            this.output = this.chatgpt_item?.logs[this.input != '' ? this.input : this.condition]?.result
        },
    },
    watch: {
        chatgpt_item(newValue) {
            this.scrollToResponse();
            if (newValue != null && this.chatgpt_tab == 'TextReaction') {
                this.updateOutput()
                const local_prompts = this.all_default_request_list;
                this.used_prompt_list = Object.values(this.chatgpt_item?.logs).filter(log => (
                    !local_prompts.includes(log?.promt)
                )).map(log => ({ ...log, name: log?.promt }))

                console.log('used_prompt_list', this.used_prompt_list);
            }
            else if (newValue == null) this.output = '';
        },
        chatgpt_tab(newValue) {
            this.scrollToResponse();
            newValue;

        },
        condition(newValue) {

            if (newValue != undefined) this.input = '';

            const log_keys = Object.keys(this.chatgpt_item?.logs);

            if (log_keys.length == 0) return;

            let temp_log = this.chatgpt_item?.logs[this.input != '' ? this.input : newValue];

            let currentPromptType = {
                analyze: 'analyze',
                generalization: 'analyze',
                reaction: 'reaction',
            }[this.request_type];

            this.output = currentPromptType == temp_log?.type ? temp_log?.result : ''
        },
        input(newValue) {
            const log_keys = Object.keys(this.chatgpt_item?.logs);
            if (log_keys.length == 0) return;
            let temp_result = this.chatgpt_item?.logs[newValue != '' ? newValue : this.condition]?.result;
            this.output = temp_result || ''

            this.gpt_type = 'analyze';
        },
        current_user_logs_type() {
            this.scrollToResponse();
            this.currentLogsResult = {};
            this.currentLogsPromt = {};
        },
    },
    async mounted() {

        this.user_logs = await this.getGptUserLogs();
        this.current_user_logs_type = this.user_chat_names[0];
    },
}
</script>
<style scoped>
/* Scrollbar */

.scrollbar {
    overflow-x: clip;
    overflow-y: scroll;
}

.scrollbar::-webkit-scrollbar {
    width: 7px;
    margin-left: 2px;
}

.scrollbar::-webkit-scrollbar-track {
    margin-left: 2px;
    background-color: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
    /*background-color: #eaeaea;*/
    background-color: rgb(170, 227, 255);
    border-radius: 5px;
}

/* ... */

.btn-help {
    margin: 0 auto;
    margin-top: 30px;
}

.cond {
    display: inline-block;
    margin-top: 5px;
}

.dropdown_inline {
    display: inline-block;
}

#load-circle-analyze {
    margin-left: 2px;
}

/* .main-block {
    margin-top: 50px;
} */
.btn-control {
    margin-top: 20px;
}

.btn-success {
    color: #fff !important;
    background-color: #3B5998 !important;
    border-color: #3B5998 !important;
}

.btn-success:hover {
    color: #fff !important;
    background-color: #324c82 !important;
    border-color: #324c82 !important;
}

.btn-info:hover,
.btn-info:focus,
.btn-info:active,
.btn-info.active,
.open .dropdown-toggle.btn-info,
.btn-info:active:focus,
.btn-info:active:hover,
.btn-info.active:hover,
.btn-info.active:focus {
    background-color: #21b9bb !important;
    border-color: #21b9bb !important;
    color: #FFFFFF !important;
}

.tab-content .dropdown-menu {
    padding: 5px;
    font-size: 16px;
}

.tab-content .dropdown-menu li:hover {
    color: #1e2125;
    background-color: #e9ecef;
    border-radius: 3px;
}

.tab-content .dropdown-menu li {
    padding: 5px 10px;
}

.chatgpt-error {
    color: red;
    font-weight: 300;
    font-size: 14px;
    margin-left: 8px;
}

.tab-content .dropdown-toggle:after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
}


.input-angle-down {
    position: absolute;
    top: 0;
    right: 8px;
    bottom: 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    transition: .15s;
}

.rotate-x-180 {
    transform: rotateX(180deg);
}

.used-prompt-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);
    max-height: 300px;
    overflow-y: scroll;
}

.used-prompt:hover {
    background: #e9ecef;
}

.used-prompt {
    padding: 7px 10px;
    cursor: pointer;
    color: #1e2125;
    border-radius: 3px;
    height: 30px;
    min-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

textarea.form-control {
    word-spacing: 2px;
    letter-spacing: .7px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.7 !important;
    font-size: 13.5px !important;
}

.empty-list_item {
    background: white !important;
    color: #ccc;
    cursor: default;
}

/*  */

.select-option {
    padding: 6px 7px;
    cursor: pointer;
    height: 27px;
    white-space: nowrap;
    transition: .15s;
}

.select-option.active,
.select-option:hover {
    background: rgb(59, 89, 152);
    color: white;
}

.select-option:not(.select-option:last-child) {
    border-bottom: 1px solid rgb(59, 89, 152);
}

.select-options {
    z-index: 1;
    overflow-y: clip;
}

.select-options-styles {
    font-size: 13px;
    background: white;
    border-radius: 4px;
    border: 1px solid rgb(59, 89, 152);
    margin-top: 5px;
}

.select-title {
    background: rgb(59, 89, 152);
    height: 27px;
    padding: 0px 8px 2px;
    border-radius: 4px;
    font-size: 13px;
    width: 150px;
}

.right-modal-menu {
    padding: 14px 10px 14px 0;
    position: absolute;
    left: calc(100% - 1px);
    top: 48.42px;
    /* width: 265px; */
    width: 220px;
    bottom: -48.4px;
    background: #fff;
    overflow: hidden;
    border-radius: 0 0 4px 0;
    font-size: 14px;
}

.information-btn {
    font-size: 13px;
    color: #1c84c6;
    position: absolute;
    right: 0px;
    top: -5px;
    padding: 0.875rem 1.75rem;
    border: 1px solid #1c84c6;
    border-radius: 0.4em;
    transition: .15s;
}

.information-btn:hover {
    background: #1c84c6;
    color: white;
}

.full-item-text *:has(> img) {
    max-width: 100% !important;
}

.full-item-text *>img {
    height: auto !important;
}

.success-btn-hover,
.delete-btn-hover {
    transition: .15s;
    cursor: pointer;
    font-size: 14.5px;
}

.delete-btn-hover:hover {
    background: #d55454 !important;
}

.success-btn-hover:hover {
    background: rgb(20, 131, 109) !important;
}

.gray-scrollbar::-webkit-scrollbar {
    height: 1rem;
    width: 0.5rem;
}

.gray-scrollbar::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(236, 236, 241, var(--tw-bg-opacity));
}

.gray-scrollbar::-webkit-scrollbar-thumb {
    --tw-border-opacity: 1;
    background-color: rgba(217, 217, 227, .8);
    border-color: rgba(255, 255, 255, var(--tw-border-opacity));
    border-radius: 9999px;
    border-width: 1px;
}

.gray-scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 9999px;
}


.chatgpt-textbox-scrollbar[placeholder]:empty::before {
    content: attr(placeholder);
    color: #7d7e90;
    font-weight: 400;
}

.chatgpt-textbox-scrollbar[placeholder]:empty {
    box-shadow: 0 0 7px rgba(0, 0, 0, .1);
}

.chatgpt-textbox-scrollbar[placeholder]:not(.chatgpt-textbox-scrollbar[placeholder]:empty)::before {
    content: "";
}

.chatgpt-request-send {
    /* color: #7d7e90; */
    color: #7d7e9063;
}

.chatgpt-textbox-scrollbar:not(.chatgpt-textbox-scrollbar.incorrect-request):not(.chatgpt-textbox-scrollbar:empty)+.chatgpt-request-send {
    color: white;
    background-color: rgb(25, 195, 125);
    opacity: 1;
    cursor: pointer;
}

.chatgpt-textbox-scrollbar.incorrect-request + .chatgpt-request-send,
.chatgpt-textbox-scrollbar:empty + .chatgpt-request-send {
    pointer-events: none;
}

.chatgpt-messages {
    padding-bottom: calc(76px + 33px + 5px);
}

.chatgpt-messages::-webkit-scrollbar {
    height: 1rem;
    width: 0.5rem;
}

.chatgpt-messages::-webkit-scrollbar-thumb {
    --tw-border-opacity: 1;
    background-color: rgba(217, 217, 227, .8);
    border-color: rgba(255, 255, 255, var(--tw-border-opacity));
    border-radius: 9999px;
    border-width: 1px;
}

.chatgpt-messages::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 9999px;
}

.gpt-response-loading {
    font-weight: bold;
    display: inline-block;
    clip-path: inset(0 1.8ch 0 0);
    animation: gpt-response-loading 1s steps(4) infinite;
}

@keyframes gpt-response-loading {
    to {
        clip-path: inset(0 -.6ch 0 0)
    }
}

.modal.fade {
    display: block;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.42);
    position: fixed;
}

.modal-dialog {
    top: 0px;
}

</style>