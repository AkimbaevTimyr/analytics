<template>
    <div class="wrap-body m-b-15 flex items-center result-info-1439">
        <span style="color:#A8A8A8;line-height: 1.2;">
            <span style="font-size: 16px;color: #333 !important;">{{ i18n('Результат фильтра') }}:&nbsp;</span>
            <span class="whitespace-nowrap"><span class="result-count result-count__items" :style="isGrouped ? 'color: #11866E;' : ''"
                >{{ news_count.push_space() }}</span
            >
            {{ i18n(`${isGrouped ? 'групп ' : ''}новостей`) }}</span> <span class="whitespace-nowrap">
            (<span class="result-count result-count__resource"
                >{{ resources_count.push_space() }}</span
            > {{ i18n('источников') }})</span>
        </span>

        <div
            class="sort-by-metrics flex items-center result-info-m-l-0-1439 overflow-hidden"
            v-show="r_type == 2 && !isGrouped"
            style="max-height: 27px;"
        >
            <svg fill="#A7B1C2" class="sort-by-metric prompt-parent" 
                    onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_metrics_sort', metric_type: 'reactions'})"
                    :class="{
                        active: selected_soc_metrics == 'likes',
                        disabled:
                            soc_metrics.likes == 'loading' ||
                            soc_metrics.likes <= 0,
                    }"
                    @click="select_metric('likes')" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="width: 33px;padding-bottom: 5.5px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>

                <div
                    class="prompt"
                    :style="soc_metrics.likes == 'loading' || soc_metrics.likes <= 0
                            ? '--prompt-color: #ccc'
                            : ''
                        "
                >
                    {{ i18n('Сортировка по реакция (по убыванию)') }}
                </div>
            </svg>
            <i
                class="fa sort-by-metric prompt-parent fa-comments"
                @click="select_metric('comments')"
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_metrics_sort', metric_type: 'comments'})"
                :class="{
                    active: selected_soc_metrics == 'comments',
                    disabled:
                        soc_metrics.comments == 'loading' ||
                        soc_metrics.comments <= 0,
                }"
            >
                <div
                    class="prompt"
                    :style="
                        soc_metrics.comments == 'loading' ||
                        soc_metrics.comments <= 0
                            ? '--prompt-color: #ccc'
                            : ''
                    "
                >
                    {{ i18n('Сортировка по комментариям (по убыванию)') }}
                </div>
            </i>
            <i
                class="fa sort-by-metric prompt-parent fa-share"
                @click="select_metric('reposts')"
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_metrics_sort', metric_type: 'reposts'})"
                :class="{
                    active: selected_soc_metrics == 'reposts',
                    disabled:
                        soc_metrics.reposts == 'loading' ||
                        soc_metrics.reposts <= 0,
                }"
            >
                <div
                    class="prompt"
                    :style="
                        soc_metrics.reposts == 'loading' ||
                        soc_metrics.reposts <= 0
                            ? '--prompt-color: #ccc'
                            : ''
                    "
                >
                    {{ i18n('Сортировка по репостам (по убыванию)') }}
                </div>
            </i>
            <i
                class="fa sort-by-metric prompt-parent fa-users"
                @click="select_metric('members')"
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_metrics_sort', metric_type: 'audience'})"
                :class="{
                    active: selected_soc_metrics == 'members',
                    disabled:
                        soc_metrics.members == 'loading' ||
                        soc_metrics.members <= 0,
                }"
            >
                <div
                    class="prompt"
                    :style="
                        soc_metrics.members == 'loading' ||
                        soc_metrics.members <= 0
                            ? '--prompt-color: #ccc'
                            : ''
                    "
                >
                    {{ i18n('Сортировка по аудитории (по убыванию)') }}
                </div>
            </i>
            <i
                class="fa-solid sort-by-metric prompt-parent fa-calendar"
                style="font-size: 17px; padding-bottom: 5px"
                @click="select_metric('')"
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_metrics_sort', metric_type: 'date'})"
                :class="{
                    active: selected_soc_metrics == '',
                }"
            >
                <div class="prompt">{{ i18n('Сортировка по дате (по убыванию)') }}</div>
            </i>
        </div>

        
        <div class="switcher ml-auto">
            <div
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_single_view'})"
                style="border-radius: 3px 0 0 3px;"
                @click="isGrouped = false"
                :class="{
                    active: !isGrouped
                }">{{ i18n('По одной') }}</div>
            <div
                onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_grouped_view'})"
                style="border-radius: 0 3px 3px 0;"
                @click="isGrouped = true"
                :class="{
                    active: isGrouped
                }"
            >{{ i18n('По группам') }}
                <i class="fa-solid fa-circle-exclamation prompt-parent transition-all" :style="{
                    width: isGrouped ? '15px' : '0px',
                    'padding-left': isGrouped ? '1px' : '0px',
                    'margin-left': isGrouped ? '5px' : '0px',
                    'margin-right': isGrouped ? '-2px' : '0px',
                    opacity: isGrouped ? 1 : 0,
                    'font-size': '14px',
                }">
                    <div class="prompt before-bottom">
                        <template v-if="getLang() == 'kz'">{{ `Жаңалықтарды топтастыру ${getGroupedDate(new Date(first_similar_date))} бастап жүзеге асырылды` }}</template>
                        <template v-else>{{ i18n('Группирование публикаций проводится с') }} {{ getGroupedDate(new Date(first_similar_date)) }}</template>
                    </div>
                </i>
            </div><!-- сгруппировано -->
        </div>

        <v-pagination
            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_switch_news_tab'})"
            :selected_page="selected_page"
            :general_count="news_count"
            :set_selected_page="set_selected_page"/>
    </div>

    <!-- Удаление источника модалка гпт у новости -->
    <div
        class="delete-resource-modal"
        style="z-index: 100000"
        v-show="delete_resource_modal"
        @click.stop="delete_resource_modal = false"
    >
        <div class="flex flex-col" @click.stop>
            <div class="delete-resource-title">{{ i18n('Удаление источника') }}</div>
            <div class="delete-resource">
                <div
                    class="item-title__icon"
                    :style="delete_resource.logo"
                ></div>
                <div class="flex flex-col" style="margin-right: 8px">
                    <a
                        target="_blank"
                        class="item-resource"
                        :href="delete_resource.link"
                        :title="delete_resource.name"
                        style="margin-bottom: 4px;"
                    >{{ delete_resource.name }}</a>
                    <div class="resource-category">
                        {{ i18n(delete_resource.category) }}
                    </div>
                </div>
                <div
                    class="resource-place ml-auto flex items-center"
                    style="margin-right: 8px"
                    :title="countries[delete_resource.country_id]?.name"
                >
                    <img
                        :src="`/media/img/country/${
                            countries[delete_resource.country_id]?.hc
                        }.png`"
                        width="23"
                        height="23"
                        alt=""
                    />&nbsp;
                    {{ delete_resource.place }}
                </div>
                <div
                    class="resource-news_count ml-auto font-semibold"
                    title="Публикации"
                >
                    <i
                        class="fa-solid fa-spinner"
                        v-if="delete_resource.news_count == 'loading'"
                    ></i>
                    <template v-else>{{ delete_resource.news_count }}</template>
                </div>
            </div>
            <div class="flex item-center" style="padding: 9px">
                <button
                    class="default-btn cancel-btn"
                    @click="delete_resource_modal = false"
                >
                    {{ i18n('Отмена') }}
                </button>
                <button
                    class="default-btn delete-resource-btn"
                    @click="delete_item_resource"
                    :disabled="delete_resource.news_count == 'loading'"
                    :style="
                        delete_resource.news_count == 'loading'
                            ? 'background: #ccc'
                            : ''
                    "
                >
                    Удалить из проекта
                </button>
            </div>
        </div>
    </div>

    <!-- Confirm update all items in group -->
    <div
        class="delete-resource-modal"
        style="z-index: 100000"
        v-show="confirm_group_action_modal"
        @click.stop="confirm_group_action_modal = false"
    >
        <div class="flex flex-col" @click.stop>
            <div class="delete-resource-title" style="background: #f2b90a;">{{ i18n('Внимание') }}</div>
            <span style="padding: 12px 12px 0;font-size: 14px;">{{ i18n('Это действие изменит все публикации данной группы') }} ({{ group_items_count }}).<br/> {{ i18n('Применить для всех?') }}</span>
            <div class="flex item-center" style="padding: 9px">
                <button
                    class="default-btn cancel-btn"
                    @click="cancel_group_action"
                >
                    {{ i18n('Отмена') }}
                </button>
                <button
                    class="default-btn delete-resource-btn"
                    @click="update_group_items"
                    style="background: rgb(28, 179, 148)"
                >
                    {{ i18n('Применить') }}
                </button>
            </div>
        </div>
    </div>
    
    <!-- Дубликаты -->
    <div
        class="favorites-modal"
        :class="{
            active: similars_modal,
        }"
        style="padding: 8px"
        @click.stop="similars_modal = false"
    >
        <div
            style="
                background: white;
                max-width: 900px;
                min-height: 90%;
                max-height: 90%;
                min-width: 400px;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 0 11px #ffffff6e;
            "
            @click.stop="item_modal = false"
        >
            <div class="delete-resource-title" style="background: #1cb394;">
                Схожие новости
                <i class="fa fa-close close-item-modal" @click="similars_modal = false"></i>
            </div>
            <div style="padding: 10px 8px 15.5px 8px;height: calc(100% - 43px);background: #f3f3f4;">
                <div class="wrap-body flex items-center" style="margin-bottom: 10px;">
                    <v-pagination
                        onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_switch_news_tab'})"
                        class="result-info-m-r-auto-1439"
                        :selected_page="selected_similars_page"
                        :general_count="items.find(item => item.item_id == similars_modal)?.similars_count?.length || 0"
                        :set_selected_page="set_selected_similars_page"/>
                </div>
                <div class="favorite-buttons flex scrollbar" style="overflow-y: scroll;max-height: calc(100% - 38px);">
                    
                    <div
                        class="flex justify-center items-center h-full w-full"
                        v-if="similar_items_loading"
                    >
                        <i class="fa-solid fa-spinner" style="font-size: 25px"></i>
                    </div>
                    <div class="items m-b-15" id="project_news" v-else>
                        <div class="item-container w-full" v-for="similar_item in similar_items" :key="similar_item.item_id">
                            <div
                                class="item"
                                style="height: unset"
                                :style="similars_modal == similar_item.item_id ? 'outline: 2px solid #3b5998;margin: 7px 0;' : ''"
                                :class="{
                                    // 'item-favorites-min-height': favorites_modal == similar_item.item_id
                                }"
                            >
                                <div class="inline-flex justify-between m-b-10">
<!--                                    TITLE-->
                                    <div class="inline-flex items-center">
                                        <div
                                            class="item-title__icon"
                                            :style="
                                                getResourceLogo(similar_item.res_logo, similar_item.category_id)
                                            "
                                        ></div>
                                        <div
                                            class="item-title__text hover-underline"
                                            :title="similar_item.title"
                                            @click="modal_item = similar_item"
                                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_card_open'})"
                                        >
                                            {{ similar_item.title }}
                                        </div>
                                    </div>
                                    <div
                                        class="item-title__menu"
                                        @click.stop="
                                            item_modal =
                                                item_modal == similar_item.item_id
                                                    ? false
                                                    : similar_item.item_id
                                        "
                                    >
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                        <div
                                            class="item-modal"
                                            :class="{
                                                active: item_modal == similar_item.item_id,
                                            }"
                                            @click.stop
                                        >
                                            <div
                                                class="item-action"
                                                style="color: #ec5d5d"
                                                @click="delete_item(similar_item.item_id)"
                                                v-if="similars_modal != similar_item.item_id"
                                            >
                                                <i
                                                    class="fa fa-trash-o"
                                                    style="font-size: 17px"
                                                ></i>
                                                <span>{{ i18n('Удалить новость') }}</span>
                                            </div>
                                            <div
                                                v-if="similars_modal != similar_item.item_id"
                                                class="item-action"
                                                style="color: #ec5d5d"
                                                @click="
                                                    confirm_delete_resource(
                                                        similar_item.res_id,
                                                        similar_item,
                                                        getResourceLogo(
                                                            similar_item.res_logo,
                                                            similar_item.category_id
                                                        )
                                                    )
                                                "
                                            >
                                                <i
                                                    class="fa fa-minus-circle"
                                                    style="font-size: 17px"
                                                ></i>
                                                <!-- <i class="fa fa-trash-o" style="font-size: 17px;"></i> -->
                                                <span>{{ i18n('Удалить источник') }}</span>
                                            </div>
                                            <div
                                                class="item-action"
                                                @click="copy_item_id(similar_item.item_id)"
                                            >
                                                <i
                                                    class="fa fa-copy"
                                                    style="font-size: 15px"
                                                ></i>
                                                <span>{{ i18n('Скопировать id-новости') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex item-info items-center m-b-10">
                                    <a
                                        target="_blank"
                                        :href="similar_item.link"
                                        class="item-date hover-underline whitespace-nowrap"
                                        >{{ getItemDate(new Date(similar_item.date * 1000)) }}</a
                                    >
                                    <template
                                        v-if="
                                            r_type == 2 &&
                                            similar_item.likes +
                                                similar_item.comments +
                                                similar_item.reposts +
                                                similar_item.members >
                                                0
                                        "
                                    >
                                        &nbsp;|&nbsp;
                                        <span
                                            class="item-likes whitespace-nowrap"
                                            v-if="similar_item.likes > 0"
                                            :title="similar_item.likes.push_space()"
                                        >
                                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="margin-right: 4px;margin-top: -3px;display: inline;width: 12px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                                <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                                <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                                            </svg>
                                            <!--<i class="fa-solid fa-thumbs-o-up"></i>-->
                                            {{ similar_item.likes.short() }}&nbsp;
                                            <!-- <i class="fa fa-heart"></i> {{ similar_item.likes }}&nbsp; -->
                                        </span>
                                        <span
                                            class="item-comments whitespace-nowrap"
                                            v-if="similar_item.comments > 0"
                                            :title="similar_item.comments.push_space()"
                                        >
                                            &nbsp;<i class="fa fa-comments"></i>
                                            {{ similar_item.comments.short() }}&nbsp;
                                        </span>
                                        <span
                                            class="item-share whitespace-nowrap"
                                            v-if="similar_item.reposts > 0"
                                            :title="similar_item.reposts.push_space()"
                                        >
                                            &nbsp;<i class="fa fa-share"></i>
                                            {{ similar_item.reposts.short() }}&nbsp;
                                        </span>
                                        <span
                                            class="item-users whitespace-nowrap"
                                            v-if="similar_item.members > 0"
                                            :title="similar_item.members.push_space()"
                                        >
                                            &nbsp;<i class="fa fa-users"></i>
                                            {{ similar_item.members.short() }}&nbsp;
                                        </span>
                                    </template>
                                    &nbsp;|&nbsp;
                                    <i
                                        v-if="r_type == 2"
                                        :class="`fa fa-${
                                            social_categories_obj[similar_item.category_id]
                                        }`"
                                    ></i>
                                    <template v-if="r_type == 2">&nbsp;</template>
                                    <a
                                        target="_blank"
                                        :href="similar_item.res_link"
                                        class="item-resource"
                                        :title="similar_item.resource_name"
                                        >{{ similar_item.resource_name }}</a
                                    >
                                    &nbsp;|&nbsp;<img
                                        :src="`/media/img/country/${
                                            countries[similar_item.country_id]?.hc
                                        }.png`"
                                        style="margin-top: -3px;"
                                        width="23"
                                        height="23"
                                        alt=""
                                    />&nbsp;
                                    <span class="truncate" style="min-height:13px;margin-bottom: -1px;" :title="countries[similar_item.country_id]?.name">{{
                                        `${
                                            similar_item.region_id != 0
                                                ? regions[similar_item.region_id]?.name
                                                : countries[similar_item.country_id]?.name
                                        } | ${i18n(similar_item.resource_category.trim())}`
                                    }}</span>
                                </div>

<!--                              подстановка обрещанного текста-->
<!--                              КОНТЕНТ-->
                                <div class="item-content m-b-10" v-html="each_replace_all(similar_item.text)"></div>
                                <div class="flex item-btns">
<!--                                  блок с переключением сентиментов-->
                                    <div class="item-sentiments flex items-center">
                                        <i
                                            @click="update_item_sentiment(similar_item, -1)"
                                            class="negative negative-btn fa metrik_btn"
                                            :class="{
                                                'fa-check-circle': -1 == similar_item.sentiment,
                                                'checked-btn': -1 == similar_item.sentiment,
                                                'fa-circle': -1 != similar_item.sentiment,
                                            }"
                                        ></i>
                                        <i
                                            @click="update_item_sentiment(similar_item, 0)"
                                            class="neutral neutral-btn fa metrik_btn"
                                            :class="{
                                                'fa-check-circle': 0 == similar_item.sentiment,
                                                'checked-btn': 0 == similar_item.sentiment,
                                                'fa-circle': 0 != similar_item.sentiment,
                                            }"
                                        ></i>
                                        <i
                                            @click="update_item_sentiment(similar_item, 1)"
                                            class="positive positive-btn fa metrik_btn"
                                            :class="{
                                                'fa-check-circle': 1 == similar_item.sentiment,
                                                'checked-btn': 1 == similar_item.sentiment,
                                                'fa-circle': 1 != similar_item.sentiment,
                                            }"
                                        ></i>
                                    </div>
<!--                                    список папок избранного-->
                                    <div class="flex items-center item-folders">
                                        <span
                                            class="inline-flex items-center item-folder select-none"
                                            :title="item_folder.name"
                                            v-for="item_folder in similar_item.folders"
                                            :key="item_folder.id"
                                            style="color: #6fa2cf"
                                        >
                                            <span class="h-full">{{ item_folder.name }}</span>
                                            <i
                                                class="fa-solid fa-xmark remove-item-folder"
                                                @click="
                                                    remove_item_from_folder(
                                                        similar_item,
                                                        item_folder.id
                                                    )
                                                "
                                            ></i>
                                        </span>
                                    </div>
<!--                                  АНАЛИЗ ЧАТ ГПТ  - ИЗБРАННОЕ-->
                                    <div class="flex">
                                        <button
                                            class="favorites"
                                            style="margin-right: 8px"
                                            @click="chatgpt_item = similar_item"
                                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_card_llm'})"
                                            v-show="similar_item?.logs !== null"
                                            :disabled="similar_item?.logs === undefined"
                                            :style="similar_item?.logs === undefined ? 'cursor: wait;' : ''"
                                        >
                                            {{ i18n('Анализ ChatGPT') }}
                                            <i v-if="Object.values(similar_item?.logs || {}).includes('loading')" class="fa-solid fa-spinner" style="margin-right: -2px;padding-top: 1px;"></i>
                                            <i v-else-if="Object.keys(similar_item?.logs || {}).length" class="fa fa-check" style="color: #18a689;margin-right: -2px;"></i>
                                        </button>
                                        <button
                                            class="favorites"
                                            @click="get_item_favorites(similar_item.item_id)"
                                        >
                                            {{ i18n('Избранное') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ChatGPT  МОДАЛКА-->
    <div
        class="delete-resource-modal"
        style="z-index: 100000"
        v-show="chatgpt_item"
        @click.stop="chatgpt_item = null"
    >
        <div class="flex flex-col chat-gpt-modal relative bg-white" @click.stop :class="{
            'ml-[-110px]': chatgpt_tab != 'MadeRequests'
        }">
            <div class="modal-content h-full">
				<div class="modal-header bg-primary b-r-0" :style="chatgpt_tab != 'MadeRequests' ? 'width: calc(100% + 220px);' : ''">
					<div class="col-lg-12 p-0">
						<h3 class="f-l m-0">{{ i18n('Анализ ChatGPT') }}</h3>
						<button class="close btn p-absolute" data-dismiss="modal" @click.stop="chatgpt_item = null" style="font-size: 20px !important; text-shadow: none; line-height: 20px; opacity: 1; color: #fff; right: 0px;top: 0px">
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>
				<div class="tab-content-container">
<!--                  работа с табами-->
                    <div class="tab-head" style="margin: 14px 17px 0;">
                        <div class="w-1/2 flex">
                            <div class="tab-item inline-block" @click="chatgpt_tab = 'MadeRequests'" :class="{
                                selected: chatgpt_tab == 'MadeRequests'
                            }">{{ i18n('Проделанные запросы') }}</div>
                        </div>
                        <div class="tab-item" @click="chatgpt_tab = 'TextAnalyze'" :class="{
                            selected: chatgpt_tab == 'TextAnalyze'
                        }">{{ i18n('Анализ новости') }}</div>
                        <div class="tab-item" @click="chatgpt_tab = 'TextReaction'" :class="{
                            selected: chatgpt_tab == 'TextReaction'
                        }">{{ i18n('Свой запрос') }}</div>
                    </div>
                    <div class="tab-content" style="margin-top: 0;" :style="{
                        padding: chatgpt_tab != 'TextReaction' ? '14px 17px' : '0'
                    }">
                        <MadeRequests v-show="chatgpt_tab == 'MadeRequests'" />
                        <TextAnalyze v-show="chatgpt_tab == 'TextAnalyze'" />
                        <TextReaction v-show="chatgpt_tab == 'TextReaction'" />
                    </div>
				</div>
			</div>
        </div>
    </div>

    <!-- One-Item - ОТОБРАЖЕНИЕ МОДАЛКИ С САМОЙ НОВОСТЬЮ -->

    <div
        class="delete-resource-modal justify-end"
        v-show="modal_item != null"
        @click.stop="modal_item = null"
    >
        <div
            class="flex flex-col relative item-modal-window"
            style="
                /* min-width: 900px; */
                width: 75%;
                height: 90%;
                margin-bottom: 20px;
            "
            @click.stop
        >
            <div
                class="delete-resource-title flex items-center justify-center relative"
                style="background: #2f4050 !important; min-height: 121px"
            >
                <i
                    class="fa fa-close close-item-modal"
                    @click="modal_item = null"
                ></i>
                <div class="inline-flex w-full" style="max-width: 1000px">
                    <div
                        class="item-title__icon"
                        style="min-width: 80px; height: 80px"
                        :style="
                            getResourceLogo(
                                modal_item?.res_logo,
                                modal_item?.category_id
                            )
                        "
                    ></div>
                    <div class="flex flex-col">
                        <a
                            target="_blank"
                            :href="modal_item?.link"
                            class="item-title__text hover-underline hover:text-white focus:text-white"
                            style="font-size: 24px; line-height: 1"
                            :title="modal_item?.full_title"
                            v-html="modal_item?.full_title"
                        ></a>

                        <div
                            class="flex item-info items-center m-b-10"
                            id="project_news"
                            style="
                                margin-top: 7px;
                                margin-bottom: 0 !important;
                                font-size: 14px;
                            "
                        >
                            <a
                                target="_blank"
                                :href="modal_item?.link"
                                style="color: white"
                                class="item-date hover-underline whitespace-nowrap"
                                >{{
                                    getItemDate(
                                        new Date(modal_item?.date * 1000)
                                    )
                                }}</a
                            >
                            <template
                                v-if="
                                    r_type == 2 &&
                                    modal_item?.likes +
                                        modal_item?.comments +
                                        modal_item?.reposts +
                                        modal_item?.members >
                                        0
                                "
                            >
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <span
                                    class="item-likes whitespace-nowrap"
                                    v-if="modal_item?.likes > 0"
                                    :title="modal_item?.likes.push_space()"
                                >
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="margin-right: 5px;margin-top: -3.5px;display: inline;width: 13px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                        <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                        <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                                    </svg>
                                    <!--<i class="fa-solid fa-thumbs-o-up"></i>-->
                                    {{ modal_item?.likes.short() }}&nbsp;
                                    <!-- <i class="fa fa-heart"></i> {{ modal_item?.likes }}&nbsp; -->
                                </span>
                                <span
                                    class="item-comments whitespace-nowrap"
                                    v-if="modal_item?.comments > 0"
                                    :title="modal_item?.comments.push_space()"
                                >
                                    &nbsp;<i class="fa fa-comments"></i>
                                    {{ modal_item?.comments.short() }}&nbsp;
                                </span>
                                <span
                                    class="item-share whitespace-nowrap"
                                    v-if="modal_item?.reposts > 0"
                                    :title="modal_item?.reposts.push_space()"
                                >
                                    &nbsp;<i class="fa fa-share"></i>
                                    {{ modal_item?.reposts.short() }}&nbsp;
                                </span>
                                <span
                                    class="item-users whitespace-nowrap"
                                    v-if="modal_item?.members > 0"
                                    :title="modal_item?.members.push_space()"
                                >
                                    &nbsp;<i class="fa fa-users"></i>
                                    {{ modal_item?.members.short() }}&nbsp;
                                </span>
                            </template>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <i
                                v-if="r_type == 1"
                                class="fa fa-newspaper-o"
                                style="color: white; margin-right: 3px"
                            ></i>
                            <i
                                v-else-if="r_type == 2"
                                :class="`modal-item-social-icon fa fa-${
                                    social_categories_obj[
                                        modal_item?.category_id
                                    ]
                                }`"
                            ></i>
                            &nbsp;
                            <a
                                target="_blank"
                                :href="modal_item?.res_link"
                                :title="modal_item?.resource_name"
                                class="item-resource"
                                style="height: 1.1em"
                                >{{ modal_item?.resource_name }}</a
                            >
                            &nbsp;&nbsp;|&nbsp;&nbsp;<img
                                :src="`/media/img/country/${
                                    countries[modal_item?.country_id]?.hc
                                }.png`"
                                style="margin-top: -3px;"
                                width="23"
                                height="23"
                                alt=""
                            />&nbsp;
                            <span
                                class="truncate"
                                style="height: 1.1em;min-height:13px;margin-bottom: -1px;"
                                :title="countries[modal_item?.country_id]?.name"
                                v-html="
                                    `${
                                        modal_item?.region_id != 0
                                            ? regions[modal_item?.region_id]?.name
                                            : countries[modal_item?.country_id]?.name
                                    } &nbsp;|&nbsp; ${
                                        i18n(modal_item?.resource_category)
                                    }`
                                "
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="delete-resource-title scrollbar h-full"
                id="newspaper-height"
                style="
                    background: white !important;
                    min-height: 121px;
                    color: #333;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                "
                :style="
                    (r_type == 1 && modal_item?.category_id == 13
                        ? 'padding-bottom: 0;'
                        : 'overflow-y: scroll;') +
                    (modal_item?.newspaper_modal
                        ? 'padding: 0;overflow-x:visible;'
                        : 'overflow-x:hidden;margin: 0 5px;')
                "
            >
                <div
                    style="max-width: 1150px; width: 100%; font-size: 16px"
                    :style="{
                        maxHeight: modal_item?.newspaper_modal ? '0px' : '',
                        overflow: modal_item?.newspaper_modal ? 'hidden' : '',
                    }"
                >
                    <div
                        class="modal-item_btns"
                        style="
                            justify-content: space-between;
                            display: flex;
                            margin: 0px -5px 0px;
                        "
                    >
                        <div
                            class="relative"
                            style="font-size: 15px; margin-right: 9px"
                        >
                            <button
                                class="modal-item_btn modal-item_btn-sentiment"
                                :class="
                                    sentiment_names[modal_item?.sentiment]
                                        ?.class
                                "
                                @click.stop="set_sentiment_modal(modal_item)"
                            >
                                {{
                                    i18n(sentiment_names[modal_item?.sentiment]?.name)
                                }}
                                <i
                                    class="fa-solid fa-angle-down transition"
                                    style="height: 12px"
                                    :style="{
                                        transform: modal_item?.sentiment_modal
                                            ? 'rotateX(180deg)'
                                            : '',
                                    }"
                                ></i>
                            </button>
                            <div
                                class="absolute top-full flex flex-col bg-white overflow-hidden"
                                style="
                                    left: 5px;
                                    right: -5px;
                                    transition: all 0.15s;
                                "
                                :style="{
                                    height: !modal_item?.sentiment_modal
                                        ? '0px'
                                        : '80px',
                                }"
                                @click.stop
                            >
                                <template
                                    v-for="sentiment in Object.keys(
                                        sentiment_names
                                    )"
                                    :key="sentiment"
                                >
                                    <button
                                        class="modal-item_btn modal-item_btn-sentiment"
                                        style="margin: 5px 0 0"
                                        :class="
                                            sentiment_names[sentiment]?.class
                                        "
                                        @click="update_item_sentiment(modal_item, sentiment)"
                                        v-if="
                                            sentiment != modal_item?.sentiment
                                        "
                                    >
                                        {{ i18n(sentiment_names[sentiment]?.name) }}
                                    </button>
                                </template>
                            </div>
                        </div>
                        <button
                            class="modal-item_btn favorites"
                            @click="get_item_favorites(modal_item?.item_id)"
                        >
                            <i class="fa fa-bookmark-o"></i>{{ i18n('Избранное') }}
                        </button>
                        <a
                            class="modal-item_btn favorites"
                            target="_blank"
                            :href="modal_item?.link"
                            ><i class="fa fa-share"></i>{{ i18n('Публикация') }}</a
                        >
                        <a
                            class="modal-item_btn favorites"
                            target="_blank"
                            :href="modal_item?.res_link"
                            style="color: #7cb5ec; border-color: #7cb5ec"
                            ><i class="fa fa-share-alt"></i>{{ i18n('Источник') }}</a
                        >
                        <button
                            class="modal-item_btn favorites"
                            style="margin-right: 8px;cursor: pointer;"
                            @click="chatgpt_item = modal_item"
                            v-show="modal_item?.logs !== null"
                            :disabled="modal_item?.logs === undefined"
                            :style="modal_item?.logs === undefined ? 'cursor: wait;' : ''"
                        >
                            {{ i18n('Анализ ChatGPT') }}
                            <i v-if="Object.values(modal_item?.logs || {}).includes('loading')" class="fa-solid fa-spinner" style="margin-right: -2px;padding-top: 1px;"></i>
                            <i v-else-if="Object.keys(modal_item?.logs || {}).length" class="fa fa-check" style="color: #18a689;margin-right: -2px;"></i>
                        </button>
                        <button
                            class="modal-item_btn favorites red-border-color red-color"
                            @click="delete_item(modal_item?.item_id)"
                            v-if="similars_modal != modal_item?.item_id && (modal_item?.similars_count?.length ?? 0) <= 1"
                        >
                            <i class="fa fa-trash-o"></i>{{ i18n('Уд. новость') }}
                        </button>
                        <button
                            class="modal-item_btn favorites red-border-color red-color"
                            @click="
                                confirm_delete_resource(
                                    modal_item?.res_id,
                                    modal_item,
                                    getResourceLogo(
                                        modal_item?.res_logo,
                                        modal_item?.category_id
                                    )
                                )
                            "
                            v-if="similars_modal != modal_item?.item_id && (modal_item?.similars_count?.length ?? 0) <= 1"
                        >
                            <i class="fa fa-minus-circle"></i>{{ i18n('Уд. источник') }}
                        </button>
                    </div>
                    <div
                        class="flex items-center item-folders"
                        style="font-size: 13px; margin-top: 12px"
                    >
                        <span
                            class="inline-flex items-center item-folder select-none"
                            :title="item_folder?.name"
                            v-for="item_folder in modal_item?.folders"
                            :key="item_folder?.id"
                            style="color: #6fa2cf"
                        >
                            <span class="h-full">{{ item_folder?.name }}</span>
                            <i
                                class="fa-solid fa-xmark remove-item-folder"
                                @click="
                                    remove_item_from_folder(
                                        modal_item,
                                        item_folder?.id
                                    )
                                "
                            ></i>
                        </span>
                    </div>
                </div>
                <div
                    v-html='
                        r_type == 1 && modal_item?.category_id == 13
                            ? ""
                            : each_replace_all(
                                modal_item?.full_text
                                    .replaceAll(`href="/`,`href="${modal_item?.res_link}/`)
                                    .replaceAll(`href=`,` target="_blank" href=`)
                                    .replaceAll(`src="/`,`src="${modal_item?.res_link}/`)
                                    .replaceAll(`srcset="/`,`srcset="${modal_item?.res_link}/`)
                                 + "<br/><br/><br/><br/>", false
                            )
                    '
                    class="full-item-text w-full"
                    :style="{
                        maxHeight: modal_item?.newspaper_modal ? '0px' : '',
                        paddingTop: modal_item?.newspaper_modal
                            ? '0px'
                            : '10px',
                    }"
                ></div>

                <div
                    class="absolute left-0 right-0 flex"
                    style="transition: 0.15s"
                    :style="{
                        bottom: modal_item?.newspaper_modal
                            ? 'calc(100% - 121px)'
                            : '0px',
                    }"
                    v-if="r_type == 1 && modal_item?.category_id == 13"
                >
                    <div
                        class="toggle-newspaper mx-auto"
                        @click="toggleNewspaper(modal_item)"
                    >
                        <span>{{
                            modal_item?.newspaper_modal
                                ? i18n("Скрыть")
                                : i18n("Показать газету")
                        }}</span>
                        <i
                            class="fa-solid fa-angle-down"
                            :style="{
                                transform: modal_item?.newspaper_modal
                                    ? ''
                                    : 'rotateX(180deg)',
                            }"
                            style="margin-left: 8px"
                        ></i>
                    </div>
                </div>
                <div
                    v-if="r_type == 1 && modal_item?.category_id == 13"
                    class="relative w-full mt-auto"
                    style="transition: 0.15s"
                    :style="{
                        height: modal_item?.newspaper_modal ? '100%' : '0px',
                    }"
                >
                    <iframe
                        :src="modal_item?.link"
                        frameborder="0"
                        scrolling="auto"
                        width="100%"
                        height="100%"
                        style="transition: 0.15s; margin-top: auto"
                    ></iframe>
                </div>
                <h2
                    class="comment-title"
                    style="padding-top: 2px"
                    v-else-if="
                        r_type == 2 &&
                        comments_loading &&
                        !hasIn(modal_item?.category_id, [3, 8, 5, 10])
                    "
                >
                    {{ i18n('Комментарии') }}:
                    <i
                        style="
                            margin-right: 5px;
                            font-size: 14px;
                            margin-left: 6px;
                        "
                        class="fa-solid fa-spinner"
                    ></i>
                </h2>
                <div
                    v-else-if="
                        r_type == 2 &&
                        comments?.status != 'does not have permission' &&
                        !hasIn(modal_item?.category_id, [3, 8, 5, 10])
                    "
                    class="comments"
                    style="width: 100%; max-width: 1000px; font-size: 16px"
                >
                    <div class="flex">
                        <h2 class="comment-title" style="padding-top: 2px">
                            {{ i18n('Комментарии') }}:
                        </h2>

                        <span
                            class="comment-status comment-parsing"
                            v-if="comments?.status == 'ready'"
                            >{{ i18n('Комментарии собираются') }}</span
                        >
                        <span
                            class="comment-status comment-error"
                            v-else-if="comments?.status == 'failed'"
                            >{{ i18n('Не получилось собрать') }}</span
                        >
                        <span
                            class="comment-status comment-error"
                            v-else-if="
                                comments?.status == 'done' &&
                                comments?.list?.length == 0
                            "
                            >{{ i18n('Нет найденных комментариев') }}</span
                        >
                        <div
                            v-else-if="comments?.list?.length != 0"
                            class="flex items-center"
                            style="
                                width: 100%;
                                margin: 0 20px 0 8px;
                                max-width: 450px;
                            "
                        >
                            <input
                                type="text"
                                class="search-comments-input"
                                v-model="search_comment"
                                :placeholder="i18n('Поиск по комментариям')"
                            />
                            <div
                                class="sort-by-metrics flex items-center"
                                v-if="hasIn(modal_item?.category_id, [1, 6, 7])"
                            >
                                <svg class="sort-by-metric"
                                        :class="{
                                            active:
                                                comments?.sort_by == 'likes' &&
                                                search_comment == '',
                                        }"
                                        @click="comments.sort_by = 'likes'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="padding-bottom: 5.5px;padding-top: 4.5px;width: 33px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                    <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                    <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                                </svg>
                                <!--<i
                                    class="sort-by-metric fa fa-thumbs-o-up"
                                    :class="{
                                        active:
                                            comments?.sort_by == 'likes' &&
                                            search_comment == '',
                                    }"
                                    @click="comments.sort_by = 'likes'"
                                ></i>-->
                                <i
                                    class="sort-by-metric fa-solid fa-calendar"
                                    :class="{
                                        active:
                                            comments?.sort_by == 'date' &&
                                            search_comment == '',
                                    }"
                                    @click="comments.sort_by = 'date'"
                                ></i>
                            </div>
                        </div>

                        <button
                            class="apply-btn"
                            :class="{
                                disabled: comments?.status == 'ready',
                            }"
                            v-if="
                                !hasIn(comments?.status, [
                                    'done',
                                    'ready',
                                    'failed',
                                ])
                            "
                            @click="get_one_comments"
                        >
                            {{ i18n('Получить комментарии новости') }}
                            <i
                                v-if="comments?.status == 'ready'"
                                style="margin-left: 6px"
                                class="fa-solid fa-spinner"
                            ></i>
                        </button>
                        <button
                            class="apply-btn"
                            :class="{
                                disabled: comments?.status == 'ready',
                            }"
                            v-else
                            @click="get_one_comments"
                        >
                            {{ i18n('Обновить') }}
                            <i
                                v-if="comments?.status == 'ready'"
                                style="margin-left: 6px"
                                class="fa-solid fa-spinner"
                            ></i>
                        </button>
                    </div>
                    <div
                        class="comment"
                        v-for="(comment, i) in sorted_comments"
                        :key="i"
                    >
                        <a
                            class="comment-user"
                            :href="comment?.profile_link"
                            :title="comment?.name"
                            target="_blank"
                            >{{ comment?.name.maxLength(22) }}</a
                        >

                        <a
                            class="comment-text"
                            :href="comment?.comment_link"
                            target="_blank"
                            v-html="comment?.comment_text"></a>

                        <span class="comment-info">
                            <span
                                class="comment-likes"
                                v-if="hasIn(modal_item?.category_id, [1, 6, 7])"
                            >
                                <svg fill="#2f4050" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="margin-right: 4px;margin-top: -1.5px;display: inline;width: 13px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                    <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                    <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                                </svg>
                                <!--<i
                                    :class="`fa fa-thumbs${
                                        comment?.likes == 0 ? '-o' : ''
                                    }-up`"
                                ></i>-->
                                {{ comment?.likes }}
                            </span>
                            <span class="comment-date">{{
                                getItemDate(
                                    new Date(comment?.comment_date),
                                    false
                                )
                            }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Выберите избранное -->
    <div
        class="favorites-modal"
        :class="{
            active: favorites_modal,
        }"
        style="padding: 8px"
        @click.stop="favorites_modal = false"
    >
        <div
            style="
                background: white;
                max-width: 900px;
                min-height: 550px;
                max-height: 550px;
                min-width: 400px;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 0 11px #ffffff6e;
            "
            @click.stop
        >
            <div class="delete-resource-title" style="background: #1cb394;">
                {{ favorites_modal != 'general_add_to_folder' ? i18n('Выберите избранное') : i18n('Добавление в избранное') }}
                <i class="fa fa-close close-item-modal" @click="favorites_modal = false"></i>
            </div>
            <div style="padding: 8px;height: 100%;">
                <div class="flex items-center w-full" style="margin-bottom: 8px">
                    <div
                        class="favorite-search flex items-center w-full"
                        style="margin-right: 7px"
                    >
                        <i class="fa fa-search" style="font-size: 14px"></i>
                        <input
                            type="text"
                            v-model="favorite_search"
                            :placeholder="i18n('Поиск по избранным')"
                        />
                    </div>
                    <i
                        v-if="favorites_modal != 'general_add_to_folder'"
                        @click="
                            favorite_search = '';
                            checked_favorites =
                                checked_favorites == true ? null : true;
                        "
                        :class="`fa-solid ${checked_favorites != true ? '' : 'selected'} label-color label-filter fa-square-check`"
                        style="font-size: 20px; margin-right: 7px"
                    ></i>
                    <i
                        v-if="favorites_modal != 'general_add_to_folder'"
                        @click="
                            favorite_search = '';
                            checked_favorites =
                                checked_favorites == false ? null : false;
                        "
                        :class="`fa-regular ${checked_favorites != false ? '' : 'selected'} label-color label-filter fa-square`/* fa-square-plus */"
                        
                        style="font-size: 20px; margin-right: 7px"
                    ></i>
    
                    <!-- <label class="toggle">
                        <input class="toggle-checkbox" type="checkbox" v-model.lazy="inline_labels" />
                        <div class="toggle-switch"></div>
                    </label> -->
                </div>
                <div
                    class="favorite-list"
                    :style="
                        paginationSortedLabels.length == 1 ||
                        sortedLabels.length < 101
                            ? 'height: calc(100% - (80px + 44px));'
                            : 'height: calc(100% - (80px + 44px + 29px));'
                    "
                >
                    <label
                        class="favorite inline-flex items-center list-labels"
                        :class="{
                            active: favorite.selected,
                        }"
                        v-for="(favorite, i) in sortedLabels.slice(
                            (selected_label_page - 1) * 100,
                            (selected_label_page - 1) * 100 + 100
                        )"
                        :key="i"
                        @click="favorites_modal == 'general_add_to_folder' ? general_add_to_folder(favorite) : multi_toggle_folder(favorite)"
                        :title="favorite.name"
                    >
                        <i
                            :class="`transition-all fa-${
                                !favorite.selected ? 'regular' : 'solid'
                            } label-color fa-square${
                                !favorite.selected ? '' : '-check'
                            }`"
                            style="font-size: 20px; margin-right: 8px"
                        ></i>
                        <span
                            style="
                                margin-bottom: -2px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                height: 1.1em;
                            "
                            >{{ favorite.name }}</span
                        >
                    </label>
                </div>
    
                <div
                    class="nav-pagination"
                    style="
                        padding-top: 9px;
                        border-top: 2px solid #e4e4e4;
                        margin-bottom: 12px;
                        justify-content: center;
                    "
                    :style="
                        paginationSortedLabels.length == 1 ||
                        sortedLabels.length < 101
                            ? 'height: 0;overflow: hidden;padding-top: 0;margin-bottom: 9px;'
                            : ''
                    "
                >
                    <div class="hovered-angle">
                        <i
                            class="fa-solid fa-angles-left first-page icon-w-0"
                            style="width: 22px;margin-left: 0;"
                            @click="selected_label_page = 1"
                        ></i>
                        <i
                            class="fa fa-angle-left first-page border-radius-0"
                            @click="
                                selected_label_page =
                                    selected_label_page == 1
                                        ? 1
                                        : selected_label_page - 1
                            "
                        ></i>
                    </div>
                    <span
                        v-for="page in paginationSortedLabels"
                        :key="page"
                        :class="{
                            active: page == selected_label_page,
                        }"
                        @click="selected_label_page = page"
                        >{{ page }}</span
                    >
                    <div class="hovered-angle">
                        <i
                            class="fa fa-angle-right second-page border-radius-0"
                            @click="
                                selected_label_page =
                                    selected_label_page == getLabelsPaginationCount
                                        ? getLabelsPaginationCount
                                        : selected_label_page + 1
                            "
                        ></i>
                        <i
                            class="fa-solid fa-angles-right second-page icon-w-0"
                            style="width: 22px; margin-right: 0"
                            :title="`${i18n('Последняя страница')}: ${getLabelsPaginationCount.push_space()}`"
                            @click="selected_label_page = getLabelsPaginationCount"
                        ></i>
                    </div>
                </div>
                <div class="favorite-buttons flex">
                    <input
                        type="text"
                        @keydown.enter="add_new_label()"
                        :placeholder="i18n('Введите название избранного...')"
                        v-model="label_name"
                    />
                    <button
                        class="favorite-apply"
                        :disabled="hasLabelName"
                        :style="
                            hasLabelName
                                ? 'pointer-events: none;background: #ccc;'
                                : ''
                        "
                        @click="add_new_label()"
                    >
                        {{ i18n('Создать') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading... -->
    <div
        class="flex justify-center"
        v-if="items_loading"
        style="height: 700px"
    >
        <i class="fa-solid fa-spinner" style="font-size: 25px"></i>
    </div>
    <!-- Items -->
    <div class="items m-b-5" id="project_news" v-else>
        <div class="item-container" v-for="item in items" :key="item.item_id">
            <div
                class="item"
                :class="{
                    // 'item-favorites-min-height': favorites_modal == item.item_id
                }"
            >
                <div class="inline-flex justify-between m-b-10">
                    <div class="inline-flex items-center">
                        <div
                            class="item-title__icon"
                            :style="
                                getResourceLogo(item.res_logo, item.category_id)
                            "
                        ></div>
                        <div
                            class="item-title__text hover-underline"
                            :title="item.title"
                            @click="modal_item = item"
                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type:'click_card_open'})"
                        >
                            {{ item.title }}
                        </div>
                    </div>
<!--                  выпадающее меню с 3-мя кнопками у каждой новости-->
                    <div
                        class="item-title__menu"
                        @click.stop="
                            item_modal =
                                item_modal == item.item_id
                                    ? false
                                    : item.item_id
                        "
                    >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <div
                            class="item-modal"
                            :class="{
                                active: item_modal == item.item_id,
                            }"
                            @click.stop
                        >
                            <div
                                class="item-action"
                                style="color: #ec5d5d"
                                @click="group_action_type = 'deleteGroupItems';check_is_group(item, () => { delete_item(item.item_id) })"
                            >
                                <i
                                    class="fa fa-trash-o"
                                    style="font-size: 17px"
                                ></i>
                                <span>{{ i18n('Удалить новость') }}</span>
                            </div>
                            <div
                                class="item-action"
                                style="color: #ec5d5d"
                                @click="
                                    confirm_delete_resource(
                                        item.res_id,
                                        item,
                                        getResourceLogo(
                                            item.res_logo,
                                            item.category_id
                                        )
                                    )
                                "
                                v-if="!(item?.similars_count?.length > 1)"
                            >
                                <i
                                    class="fa fa-minus-circle"
                                    style="font-size: 17px"
                                ></i>
                                <!-- <i class="fa fa-trash-o" style="font-size: 17px;"></i> -->
                                <span>{{ i18n('Удалить источник') }}</span>
                            </div>
                            <div
                                class="item-action"
                                @click="copy_item_id(item.item_id)"
                            >
                                <i
                                    class="fa fa-copy"
                                    style="font-size: 15px"
                                ></i>
                                <span>{{ i18n('Скопировать id-новости') }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="similars-count" @click="similars_modal = item.item_id" v-if="item?.similars_count?.length > 0">дубликаты: {{ item?.similars_count?.length }}</div> -->
                </div>

                <div class="flex item-info items-center m-b-10">
                    <a
                        target="_blank"
                        :href="item.link"
                        class="item-date hover-underline whitespace-nowrap"
                        >{{ getItemDate(new Date(item.date * 1000)) }}</a
                    >
                    <template
                        v-if="
                            r_type == 2 &&
                            item.likes +
                                item.comments +
                                item.reposts +
                                item.members >
                                0
                        "
                    >
                        &nbsp;|&nbsp;
                        <span
                            class="item-likes whitespace-nowrap"
                            v-if="item.likes > 0"
                            :title="item.likes.push_space()"
                        >
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" style="margin-right: 4px;margin-top: -3px;display: inline;width: 12px;" viewBox="0 0 2182 2087" enable-background="new 0 0 2182 2087" xml:space="preserve">
                                <path opacity="1.000000" stroke="none" d=" M1442.000000,2.000000   C1459.375122,2.000000 1476.750366,2.000000 1494.375488,2.571172   C1496.941895,4.204090 1499.170288,5.558801 1501.587524,6.283990   C1543.167358,18.758310 1570.935669,45.179615 1584.474487,86.752563   C1594.666260,118.048645 1595.719360,150.128525 1593.406616,182.374268   C1591.222900,212.821579 1585.984863,242.925522 1578.510376,272.553436   C1556.081177,361.459045 1531.305176,449.707703 1500.759644,536.191772   C1483.835693,584.108765 1464.978149,631.340515 1447.255127,678.978943   C1441.837036,693.542725 1437.291870,708.431274 1432.181030,723.665466   C1434.999634,723.855286 1436.643921,724.049072 1438.290161,724.064880   C1480.902588,724.475098 1523.514648,725.155334 1566.127686,725.207031   C1691.752808,725.359375 1817.378418,725.165405 1943.003418,725.383728   C1958.585938,725.410828 1974.246460,726.402344 1989.729248,728.180054   C2020.587769,731.723328 2049.266357,742.220703 2075.235107,759.155090   C2123.743896,790.787781 2154.970703,835.538879 2172.305908,890.334534   C2175.500000,900.430237 2177.671875,910.849182 2180.319336,921.118042   C2180.807617,923.013062 2180.559082,925.867859 2184.000000,924.000000   C2184.000000,949.375122 2184.000000,974.750244 2183.474365,1001.277588   C2183.299072,1002.953247 2183.649414,1003.476624 2184.000000,1004.000000   C2184.000000,1008.083313 2184.000000,1012.166687 2183.311279,1017.034180   C2183.081787,1018.545532 2183.540771,1019.272766 2184.000000,1020.000000   C2184.000000,1031.376099 2184.000000,1042.752075 2183.346680,1054.313965   C2181.909912,1056.535889 2180.663086,1058.522583 2180.439697,1060.618530   C2179.982422,1064.906982 2180.233154,1069.265991 2179.915039,1073.575317   C2178.061523,1098.703613 2176.348145,1123.845215 2174.154541,1148.944580   C2172.219971,1171.074951 2169.973145,1193.185547 2167.406006,1215.251587   C2163.885742,1245.514771 2160.007080,1275.737183 2156.142822,1305.959229   C2152.655518,1333.235840 2149.212402,1360.521484 2145.336914,1387.744385   C2138.983643,1432.370361 2132.355957,1476.957886 2125.728516,1521.544312   C2121.488281,1550.067871 2117.063232,1578.563965 2112.679688,1607.066040   C2107.188232,1642.773926 2101.840576,1678.505249 2096.082764,1714.170288   C2091.064697,1745.254639 2086.896484,1776.559814 2080.015137,1807.243286   C2062.260254,1886.408325 2025.760498,1955.344971 1964.872803,2010.270142   C1927.377930,2044.093140 1884.117188,2067.163330 1835.274902,2079.676514   C1824.364014,2082.471680 1813.130737,2084.011230 1802.042603,2086.110596   C1799.350952,2086.620605 1799.344727,2086.587646 1798.000000,2090.000000   C1468.624878,2090.000000 1139.249756,2090.000000 809.604797,2089.416992   C806.076233,2087.411133 802.936096,2085.550049 799.541016,2084.631592   C750.426575,2071.349121 711.614685,2023.299683 711.569275,1967.148315   C711.333984,1675.886475 710.757263,1384.625000 710.392212,1093.363281   C710.373901,1078.747437 710.865906,1064.109131 711.746399,1049.519043   C712.985107,1028.992188 713.887085,1008.378845 716.576904,988.019653   C722.151367,945.827576 730.913269,904.264404 743.441406,863.499451   C766.009094,790.067383 798.536072,721.513306 845.022766,660.251526   C879.775208,614.453430 915.391418,569.231445 952.364868,525.216003   C1012.861938,453.196747 1074.791504,382.381073 1136.085327,311.030518   C1164.671875,277.753479 1191.889771,243.402649 1217.921875,208.074142   C1254.233032,158.795700 1291.279175,110.078285 1336.159668,68.015656   C1357.120483,48.370888 1379.510986,30.564367 1405.627686,18.241156   C1416.365112,13.174614 1427.974609,9.965403 1439.139282,5.783081   C1440.654785,5.215382 1444.179321,5.592262 1442.000000,2.000000  z"/>
                                <path opacity="1.000000" stroke="none" d=" M2.000000,928.937317   C4.626325,928.600464 5.374965,927.171448 5.861569,924.869690   C10.223710,904.235840 19.665791,886.201355 33.562897,870.358093   C53.706264,847.393799 78.955406,833.868225 109.030930,829.430481   C116.553436,828.320496 124.265274,828.137695 131.890472,828.132812   C251.521973,828.056580 371.154175,828.314026 490.784851,827.989502   C560.352722,827.800842 616.491333,883.127502 616.440613,954.066711   C616.200134,1290.634399 616.188965,1627.202515 616.475830,1963.770142   C616.523376,2019.527710 580.957214,2068.929688 528.440430,2084.605469   C525.061157,2085.614014 521.916870,2087.410156 519.331665,2089.419922   C381.291534,2090.000000 242.583084,2090.000000 103.250626,2089.275879   C100.499718,2087.708008 98.436348,2086.611328 96.236351,2086.058350   C64.947044,2078.194092 40.803364,2060.339844 22.912054,2033.734985   C14.883975,2021.797119 9.383645,2008.767212 6.115458,1994.750854   C5.637127,1992.699463 6.466059,1988.862183 2.000000,1990.000000   C2.000000,1636.624878 2.000000,1283.249756 2.000000,928.937317  z"/>
                            </svg>
                            <!--<i class="fa-solid fa-thumbs-o-up"></i>-->
                            {{ item.likes.short() }}&nbsp;
                            <!-- <i class="fa fa-heart"></i> {{ item.likes }}&nbsp; -->
                        </span>
                        <span
                            class="item-comments whitespace-nowrap"
                            v-if="item.comments > 0"
                            :title="item.comments.push_space()"
                        >
                            &nbsp;<i class="fa fa-comments"></i>
                            {{ item.comments.short() }}&nbsp;
                        </span>
                        <span
                            class="item-share whitespace-nowrap"
                            v-if="item.reposts > 0"
                            :title="item.reposts.push_space()"
                        >
                            &nbsp;<i class="fa fa-share"></i>
                            {{ item.reposts.short() }}&nbsp;
                        </span>
                        <span
                            class="item-users whitespace-nowrap"
                            v-if="item.members > 0"
                            :title="item.members.push_space()"
                        >
                            &nbsp;<i class="fa fa-users"></i>
                            {{ item.members.short() }}&nbsp;
                        </span>
                    </template>
                    &nbsp;|&nbsp;
                    <i
                        v-if="r_type == 2"
                        :class="`fa fa-${
                            social_categories_obj[item.category_id]
                        }`"
                    ></i>
                    <template v-if="r_type == 2">&nbsp;</template>
                    <a
                        target="_blank"
                        :href="item.res_link"
                        class="item-resource"
                        :title="item.resource_name"
                        >{{ item.resource_name }}</a
                    >
                    &nbsp;|&nbsp;<img
                        :src="`/media/img/country/${
                            countries[item.country_id]?.hc
                        }.png`"
                        style="margin-top: -3px;"
                        width="23"
                        height="23"
                        alt=""
                    />&nbsp;
                    <span class="truncate" style="min-height:13px;margin-bottom: -1px;" :title="countries[item.country_id]?.name">{{
                        `${
                            item.region_id != 0
                                ? regions[item.region_id]?.name
                                : countries[item.country_id]?.name
                        } | ${i18n(item.resource_category)}`
                    }}</span>
                </div>

                <div class="item-content m-b-10" v-html="each_replace_all(item.text)"></div>
                <div class="flex item-btns">
                    <div class="item-sentiments flex items-center">
                        <i
                            @click="group_action_type = 'updateGroupSentiment';check_is_group(item, () => { update_item_sentiment(item, -1) }, -1)"
                            class="negative negative-btn fa metrik_btn"
                            :class="{
                                'fa-check-circle': -1 == item.sentiment,
                                'checked-btn': -1 == item.sentiment,
                                'fa-circle': -1 != item.sentiment,
                            }"
                        ></i>
                        <i
                            @click="group_action_type = 'updateGroupSentiment';check_is_group(item, () => { update_item_sentiment(item, 0) }, 0)"
                            class="neutral neutral-btn fa metrik_btn"
                            :class="{
                                'fa-check-circle': 0 == item.sentiment,
                                'checked-btn': 0 == item.sentiment,
                                'fa-circle': 0 != item.sentiment,
                            }"
                        ></i>
                        <i
                            @click="group_action_type = 'updateGroupSentiment';check_is_group(item, () => { update_item_sentiment(item, 1) }, 1)"
                            class="positive positive-btn fa metrik_btn"
                            :class="{
                                'fa-check-circle': 1 == item.sentiment,
                                'checked-btn': 1 == item.sentiment,
                                'fa-circle': 1 != item.sentiment,
                            }"
                        ></i>
                    </div>
                    <div class="flex items-center item-folders">
                        <span
                            class="inline-flex items-center item-folder select-none"
                            :title="item_folder.name"
                            v-for="item_folder in item.folders"
                            :key="item_folder.id"
                            style="color: #6fa2cf"
                        >
                            <span class="h-full">{{ item_folder.name }}</span>
                            <i
                                class="fa-solid fa-xmark remove-item-folder"
                                @click="
                                    remove_item_from_folder(
                                        item,
                                        item_folder.id
                                    )
                                "
                            ></i>
                        </span>
                    </div>
                    <div class="flex">
                        <button
                            class="favorites"
                            style="margin-right: 8px"
                            @click="similars_modal = item.item_id"
                            v-if="item?.similars_count?.length > 1"
                        >
                            <i class="fa fa-clone" style="margin-right: 5px;"></i>
                            {{ item?.similars_count?.length - 1 }}
                        </button>
                        <button
                            class="favorites"
                            style="margin-right: 8px"
                            @click="chatgpt_item = item"
                            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_card_llm'})"
                            v-show="item?.logs !== null"
                            :disabled="item?.logs === undefined"
                            :style="item?.logs === undefined ? 'cursor: wait;' : ''"
                        >
                            {{ i18n('Анализ ChatGPT') }}
<!--                          отображение у новости был ли анализ по гпт на карточки новости-->
                            <i v-if="Object.values(item?.logs || {}).includes('loading')" class="fa-solid fa-spinner" style="margin-right: -2px;padding-top: 1px;"></i>
                            <i v-else-if="Object.keys(item?.logs || {}).length" class="fa fa-check" style="color: #18a689;margin-right: -2px;"></i>
                        </button>
                        <button
                            class="favorites"
                            @click="check_is_group(item, () => { item?.similars_count?.length > 1 ? getGroupFolders(item.item_id) : get_item_favorites(item.item_id) })"
                        >
                            {{ i18n('Избранное') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div class="wrap-body m-b-15 flex items-center" v-show="items?.length">
        <v-pagination
            onclick="amplitude_event(event, document.querySelector('#p_id').value, 'analytics_reborn', {media_type: document.querySelector('#media_type').value, event_type: 'click_switch_news_tab'})"
            class="result-info-m-r-auto-1439"
            :selected_page="selected_page"
            :general_count="news_count"
            :set_selected_page="set_selected_page"/>
    </div>
    <!-- <i class="fa-solid fa-arrow-up-wide-short"></i> -->
</template>

<script>

import { getLang } from '@/response/utils/langIs'
import i18n from "@/response/utils/i18n"
// inline_labels
//import axios from 'axios'
import {
    news_count,
    similars_count,
    resources_count,
    items,
    items_loading,
    similar_items_loading,
    selected_page,
    set_selected_page,
    selected_similars_page,
    set_selected_similars_page,
    selected_label_page,
    item_modal,
    selected_soc_metrics,
    soc_metrics,
    chatgpt_tab,
    chatgpt_item,
    isGrouped,
    similar_items,
    p_user_id,
    favorites,
    favorites_modal,
    first_similar_date,
} from "@/response/data/index";
import { getItems, getSimilarItems, updateGroupSentiment, deleteGroupItems, getGroupFolders, updateGroupFolders, get_favorites, general_add_to_folder } from "@/response/api";
// import items from '@/response/json/items';
import {
    r_type,
    regions,
    countries,
    social_categories,
    project,
    search_tags,
} from "@/response/header";
import axios from "axios";
import TextAnalyze from '@/components/ChatGPT/TextAnalyze.vue'
import TextReaction from '@/components/ChatGPT/TextReaction.vue'
// import VGeneralization from '@/components/ChatGPT/VGeneralization.vue'
import MadeRequests from '@/components/ChatGPT/MadeRequests.vue'
import VPagination from '@/components/UI/VPagination.vue'

export default {
    components: {
        TextAnalyze,
        TextReaction,
        // VGeneralization,
        MadeRequests,
        VPagination,
    },
    setup() {
        return {
            getLang,
            i18n,
            news_count,
            similars_count,
            resources_count,
            items,
            items_loading,
            similar_items_loading,
            p_user_id,
            r_type,
            regions,
            countries,
            social_categories,
            selected_page,
            set_selected_page,
            selected_similars_page,
            set_selected_similars_page,
            selected_label_page,
            item_modal,
            selected_soc_metrics,
            soc_metrics,
            getItems,
            project,
            search_tags,
            updateGroupSentiment,
            deleteGroupItems,
            getGroupFolders,
            getSimilarItems,
            chatgpt_tab,
            chatgpt_item,
            isGrouped,
            similar_items,
            favorites,
            favorites_modal,
            first_similar_date,
            general_add_to_folder,
            updateGroupFolders,
            get_favorites,
        };
    },
    data() {
        return {
            confirm_group_action_modal: false,
            group_action_type: '',
            group_action: () => {},
            group_params: [],
            group_items_count: 0,
            similars_modal: false,
            sentiment_name: {
                1: "Позитив",
                0: "Нейтрал",
                "-1": "Негатив",
            },
            favorite_search: "",
            checked_favorites: null,
            inline_labels: false,
            delete_resource: {},
            delete_resource_modal: false,
            label_name: "",
            modal_item: null,
            sentiment_names: {
                1: {
                    class: "positive",
                    name: "Позитив",
                },
                0: {
                    class: "neutral",
                    name: "Нейтрал",
                },
                "-1": {
                    class: "negative",
                    name: "Негатив",
                },
            },
            search_comment: "",
            comments: {
                status: "does not have permission",
                list: [],
                sort_by: "date",
            },
            comments_loading: true,
        };
    },
    methods: {
        check_is_group(item, cb, ...args) {

            let similars = [];
            if (item?.similars_count) {
                similars = item?.similars_count;
            }
            if (similars?.length > 1) {
                this.confirm_group_action_modal = true;
                this.group_action = cb;
                this.p_user_id = item?.user_id;
                this.group_params = [item.item_id, ...args];
                this.group_items_count = similars?.length;
            }
            else {
                this.group_action = () => {};
                this.p_user_id = null;
                this.group_action_type = '';
                this.group_params = [];
                this.group_items_count = 0;
                cb();
            }

        },
        update_group_items() {
            this.confirm_group_action_modal = false;
            if (this.group_params?.length && this.group_action_type) {
                this[this.group_action_type](...this.group_params);
            }
            this.group_action();
            this.group_action = () => {};
            this.p_user_id = null;
            this.group_action_type = '';
            this.group_params = [];
        },
        cancel_group_action() {
            this.confirm_group_action_modal = false;
            this.group_params = [];
            this.group_action = () => {};
            this.group_items_count = 0;
        },
        each_replace_all(text, slice_text = true) {
            text = text.trim();
            if (!text) return text;

            // замена тегов подставновкаЮ
            this.search_tags.forEach(tag => {
                text = text?.replaceAll(new RegExp(tag, 'g'), (temp) => temp ? `<span class="imas-tag">${temp}</span>` : '')
            })

            let tagIndex = text.indexOf('<span class="imas-tag">')

            if (tagIndex != -1 && slice_text) {
                let start = tagIndex - 250;
                let end = tagIndex + 350;
                if (start < 0) {
                    start = 0;
                    end = 600
                }
                else if (end > text.length && start + 190 > text.length || end >= text.length) {
                    start = text.length - 450;
                    if (start < 0) start = 0;
                }
                text = text.slice(start, end)
            }

            return text;
        },
        get_one_comments() {
            let formData = new FormData();

            formData.append("project_id", this.project.id);
            formData.append("p_id", this.modal_item?.item_id);
            formData.append("type", this.modal_item?.category_id);

            axios
                .post(`/ru/news/one-comments`, formData)
                .then((response) => {
                    if (response?.status == 200 && this.modal_item) {
                        this.comments.status = "ready";
                    }
                })
                .catch((error) => {
                    console.error("one-item-comments - error", error);
                });
        },
        hasIn(value, values) {
            return values?.filter((val) => val == value)?.length != 0;
        },
        toggleNewspaper(modal_item) {
            if (modal_item)
                modal_item.newspaper_modal = !modal_item?.newspaper_modal;
        },
        set_sentiment_modal(modal_item) {
            if (modal_item) {
                modal_item.sentiment_modal = !modal_item?.sentiment_modal;
            }
        },
        getResourceLogo(res_logo, item_category_id) {
            return `background: url(${
                this.r_type == 2
                    ? item_category_id == 9
                        ? "/media/img/resource_logo/9.png"
                        : res_logo
                    : ""
            }) center center / cover no-repeat, url(${
                this.r_type == 1
                    ? "/media/img/resource_logo/news_img.svg"
                    : "/media/img/resource_logo/no-image.png"
            }) center center / cover no-repeat;`;
        },
        select_metric(metric_name) {
            this.selected_soc_metrics = metric_name;
        },
        multi_toggle_folder(favorite) {
            if (this.favorites_modal == 'general_add_to_folder') {
                console.log('favorites_modal', this.favorites_modal);
                return;
            }

            let temp_item = this.items.find(item => item.item_id == this.favorites_modal)
            this.toggle_folder(favorite)
            if (temp_item?.similars_count?.length > 1) {
                this.updateGroupFolders(this.favorites_modal, favorite)
            }
        },
        toggle_folder(favorite) {
            if (this.favorites_modal) {
                favorite.selected = !favorite.selected;
                let route = favorite.selected ? "addlabel" : "deletelabel";

                // let selected_item = [...this.items, ...this.similar_items].find(
                //     (item) => item.item_id == this.favorites_modal
                // );
                let temp_all_items = [...this.items, ...this.similar_items].filter(item => item.item_id == this.favorites_modal)
                if (route == "addlabel") {
                    temp_all_items.forEach(item => {
                        if (item.folders?.find(folder => folder.id == favorite.id) == undefined) {
                            item.folders.push({
                                id: favorite.id,
                                name: favorite.name,
                            });
                        }
                    })
                } else {
                    temp_all_items.forEach(item => {
                        item.folders = item.folders.filter(item_folder => item_folder.id != favorite.id);
                    })
                }

                axios
                    .get(
                        `/ru/news/${route}?news_id=${this.favorites_modal}&r_type=${this.r_type}&l_id=${favorite.id}&p_id=${this.project.id}`
                    )
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        remove_item_from_folder(item, folder_id) {
            item.folders = item.folders.filter(
                (folder) => folder.id != folder_id
            );
            axios
                .get(
                    `/ru/news/deletelabel?news_id=${item.item_id}&r_type=${this.r_type}&l_id=${folder_id}&p_id=${this.project.id}`
                )
                .catch((error) => {
                    console.error(error);
                });
        },
        add_new_label() {
            let formData = new FormData();
            formData.append("new_labels", "true");
            formData.append("name", this.label_name);
            axios
                .post(`/ru/newlabels`, formData)
                .then(() => {
                    if (this.favorites_modal == 'general_add_to_folder') {
                        this.get_favorites();
                    }
                    else {
                        let temp_item = [...this.items, ...this.similar_items].find(item => item.item_id == this.favorites_modal) ?? { similars_count: [] };
                        if (temp_item?.similars_count?.length > 1) {
                            this.getGroupFolders(this.favorites_modal);
                        }
                        else {
                            this.get_item_favorites(this.favorites_modal);
                        }
                    }
                    this.label_name = "";
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        get_item_favorites(item_id) {
            axios
                .get(
                    `/ru/news/labelslist?news_id=${item_id}&r_type=${this.r_type}&get_data=true`
                )
                .then((response) => {
                    let selected_folders = response?.data?.f_array.reduce(
                        (prev, folder_id) => ({ ...prev, [folder_id]: true }),
                        {}
                    );
                    this.favorites = response?.data?.folders?.map((folder) => ({
                        ...folder,
                        selected: Boolean(selected_folders[folder.id]),
                    }));
                    this.favorites_modal = item_id;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        update_item_sentiment(item, sentiment) {
            item.sentiment = sentiment;

            let temp_item = this.items.find(_item => _item.item_id == item.item_id);
            if (temp_item.sentiment != item.sentiment) temp_item.sentiment = sentiment

            axios
                .get(
                    `/ru/news/updatesentiment?p_id=${this.project.id}&id=${item.item_id}&r_type=${this.r_type}&sentiment=${sentiment}`
                )
        },
        delete_item(item_id) {
            axios
                .get(
                    `/ru/news/deletenews?p_id=${this.project.id}&id=${item_id}&r_type=${this.r_type}`
                )
                .then(() => {
                    this.items = this.items.filter(
                        (item) => item.item_id != item_id
                    );
                    if (this.items.length < 10) {
                        this.getItems();
                    }
                    this.modal_item = null;
                });
        },
        confirm_delete_resource(res_id, item, res_logo) {
            this.item_modal = false;
            this.delete_resource_modal = true;
            this.delete_resource = {
                id: res_id,
                place: item.region_id != 0
                    ? this.regions[item.region_id]?.name
                    : this.countries[item.country_id]?.name,
                category: item.resource_category,
                country_id: item.country_id,
                link: item.res_link,
                name: item.resource_name,
                logo: res_logo,
                news_count: "loading",
            };

            axios
                .get(
                    `/ru/projectstats/resourceinfo?p_id=${this.project.id}&res_id=${res_id}&r_type=${this.r_type}&only_news_count=true`
                )
                .then((response) => {
                    this.delete_resource["news_count"] = response?.data ?? 0;
                });
        },
        delete_item_resource() {
            this.delete_resource_modal = false;
            axios
                .get(
                    `/ru/projectstats/deleteresource?p_id=${this.project.id}&res_id=${this.delete_resource.id}&r_type=${this.r_type}&del_type=project`
                )
                .then(() => {
                    this.getItems();
                })
                .finally(() => {
                    this.delete_resource = {};
                    this.modal_item = null;
                });
        },
        copy_item_id(item_id) {
            var tmp = document.createElement("INPUT");
            tmp.value = item_id;

            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand("copy");
            document.body.removeChild(tmp);

            this.item_modal = false;
        },
        getItemDate(date, week_day = true) {
            // '23:35, 15 Марта 2023, Среда'
            let year =
                new Date().getFullYear() == date.getFullYear()
                    ? ""
                    : " " + date.getFullYear();
            return (
                `${date.format("h:i")}, ${parseInt(
                    date.format("d")
                )} ${i18n(date.format("m", true))}${year}` +
                (week_day ? `, ${i18n(date.format("w", true))}` : "")
            ).trim();
        },
        getGroupedDate(date) {
            let year =
                new Date().getFullYear() == date.getFullYear()
                    ? ""
                    : " " + date.getFullYear();
            return (
                `${parseInt(
                    date.format("d")
                )} ${i18n(date.format("m", true))}${year}, ${date.format("h:i")}`
            ).trim();
        },
        login_for_newspapers(temp_url) {
            const username = 'imas';
            const password = 'imas';

            fetch(temp_url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': `Basic ${credentials}`
                },
                method: 'post',
                mode: 'no-cors',
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })
                .then(response => {
                    console.log('newspapers-service', response);
                })
                .catch(error => {
                    console.error('Error downloading PDF file:', error);
                });

        },
    },
    computed: {
        sortedLabels() {
            let temp_labels = [...this.favorites];

            if (this.checked_favorites != null) {
                temp_labels = temp_labels.filter(
                    (label) => label?.selected == this.checked_favorites
                );
            }

            temp_labels = temp_labels.filter((label) =>
                label?.name?.lowerIncludes(this.favorite_search)
            );

            temp_labels.sort((a, b) => {
                if (
                    a?.name?.lowerIncludes(this.favorite_search) == false &&
                    b?.name?.lowerIncludes(this.favorite_search) == false
                ) {
                    return 0;
                } else if (
                    a?.name?.lowerIncludes(this.favorite_search) &&
                    b?.name?.lowerIncludes(this.favorite_search)
                ) {
                    return a?.name?.indexOf(this.favorite_search) <
                        b?.name?.indexOf(this.favorite_search)
                        ? -1
                        : 0;
                } else {
                    return a?.name?.lowerIncludes(this.favorite_search) &&
                        b?.name?.lowerIncludes(this.favorite_search) == false
                        ? -1
                        : 0;
                }
            });

            return temp_labels;
        },
        social_categories_obj() {
            return this.social_categories.reduce(
                (prev, social) => ({ ...prev, [social.id]: social.icon }),
                {}
            );
        },
        getLabelsPaginationCount() {
            return Math.ceil(parseInt(this.sortedLabels.length) / 100);
        },
        paginationSortedLabels() {
            let pagination_array = [];
            if (this.selected_label_page >= 4) {
                let start_index = this.selected_label_page - 3;
                let end_index = start_index + 9;

                if (end_index >= this.getLabelsPaginationCount) {
                    start_index = this.getLabelsPaginationCount - 9;
                    if (start_index <= 0) start_index = 1;
                    end_index = this.getLabelsPaginationCount;
                }

                for (let i = start_index; i < end_index + 1; i++) {
                    pagination_array.push(i);
                }
            } else {
                let start_index = 1;
                let end_index = start_index + 9;

                if (end_index >= this.getLabelsPaginationCount) {
                    start_index = this.getLabelsPaginationCount - 9;
                    if (start_index <= 0) start_index = 1;
                    end_index = this.getLabelsPaginationCount;
                }

                for (let i = start_index; i < end_index + 1; i++) {
                    pagination_array.push(i);
                }
            }
            return pagination_array;
        },
        hasLabelName() {
            return (
                this.favorites.find(
                    (favorite) => favorite.name == this.label_name
                ) != undefined || this.label_name == ""
            );
        },
        sorted_comments() {
            if (this.modal_item == null) return [];

            let comments = [...this.comments?.list] ?? [];

            if ((comments?.length ?? 0) == 0) return [];

            if (this.search_comment != "") {
                comments = comments?.filter((comment) =>
                    comment?.comment_text?.lowerIncludes(this.search_comment)
                );

                comments.sort((a, b) => {
                    if (
                        a?.comment_text?.lowerIncludes(this.search_comment) ==
                            false &&
                        b?.comment_text?.lowerIncludes(this.search_comment) ==
                            false
                    ) {
                        return 0;
                    } else if (
                        a?.comment_text?.lowerIncludes(this.search_comment) &&
                        b?.comment_text?.lowerIncludes(this.search_comment)
                    ) {
                        return a?.comment_text?.indexOf(this.search_comment) <
                            b?.comment_text?.indexOf(this.search_comment)
                            ? -1
                            : 0;
                    } else {
                        return a?.comment_text?.lowerIncludes(
                            this.search_comment
                        ) &&
                            b?.comment_text?.lowerIncludes(
                                this.search_comment
                            ) == false
                            ? -1
                            : 0;
                    }
                });
            } else if (this.comments?.sort_by == "date") {
                comments.sort(
                    (a, b) =>
                        new Date(b?.comment_date).valueOf() -
                        new Date(a?.comment_date).valueOf()
                );
            } else if (this.comments?.sort_by == "likes") {
                comments.sort(
                    (a, b) => parseInt(b?.likes) - parseInt(a?.likes)
                );
            }

            return comments ?? [];
        },
    },
    watch: {
        similars_modal(newValue) {
            this.set_selected_similars_page(1)
            this.getSimilarItems(newValue)
        },
        selected_page(page) {
            this.getItems(page);
        },
        selected_similars_page(per_page) {
            getSimilarItems(this.similars_modal, per_page)
        },
        // запрос для получения комментариев для определенной новости при откртии модалки
        modal_item(newValue) {
            if (newValue?.category_id === 13) {
                this.login_for_newspapers(newValue?.link)
            }
            
            if (!(this.r_type == 2 && newValue)) return;
            this.comments_loading = true;

            axios
                .get(
                    `/ru/news/get-comments?p_id=${this.project.id}&post_id=${newValue?.item_id}`
                )
                .then((response) => {
                    console.log('get-comments', response)
                    let item_status = response?.data?.status;
                    let item_comments = response?.data?.comments;

                    if (newValue) {
                        this.search_comment = "";
                        this.comments.status = item_status;
                        this.comments.list = item_comments;
                        this.comments.sort_by = "date";
                    }
                })
                .catch((error) => {
                    console.error("get-comments - error", error);
                })
                .finally(() => {
                    this.comments_loading = false;
                });
        },
    },
};
</script>

<style>
.items {
    display: flex;
    flex-wrap: wrap;
    padding: 0 2.5px;
}

.item-container {
    width: 50%;
    padding: 0 7.5px;
    margin-bottom: 15px;
}
.item {
    height: 100%;
    background: white;
    padding: 10px 15px;
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 7px #7f7f7f59;
    border-radius: 4px;
}
.m-b-10 {
    margin-bottom: 10px;
}
.item-title__icon {
    margin-right: 8px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    min-width: 40px;
    cursor: pointer;
}
.item-title__text {
    /* padding-top: 7px; */
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.item-title__menu {
    cursor: pointer;
    border: 1px solid #e7eaec;
    border-radius: 50%;
    display: flex;
    height: 30px;
    min-width: 30px;
    position: relative;
    margin-top: 6px;
    position: relative;
}
.item-title__menu:hover {
    background: #e7eaecbe;
}
.item-title__menu:active {
    background: #c9cccebe;
}
.item-title__menu .fa-ellipsis-vertical {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
}
.item-info {
    font-size: 12px;
}
.item-resource {
    color: #2d9cdb;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25ch;
    height: 13px;
    margin-bottom: -1px;
}
.item-resource:hover {
    color: #306ea4;
    /* color: #23527c; */
    text-decoration: underline;
}
.item-date {
    color: #676a6c;
    cursor: pointer;
}
.hover-underline:hover {
    text-decoration: underline;
}

.item-content {
    text-align: justify;

    max-height: 80px;
    line-height: 20px;
    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.item-btns {
    flex-grow: 1;
    justify-content: space-between;
    align-items: end;
}
.favorites {
    border: 1px solid #e7eaec;
    font-size: 15px;
    height: 29px;
    padding: 0 8px;
    border-radius: 3px;
    transition: 0.25s;
    white-space: nowrap;
    user-select: none;
}
.favorites:hover {
    background: #e7eaec70;
}
.favorites:active {
    background: #e7eaec;
}
.item-sentiment {
    border: 1px solid #e7eaec;
    font-size: 15px;
    height: 29px;
    padding: 0 8px;
    border-radius: 3px;
    color: white;
}
.item-sentiment_1 {
    background: #1bb394;
}
.item-sentiment_0 {
    background: #f2c94c;
}
.item-sentiment_-1 {
    background: #ec5d5d;
}

.nav-pagination {
    margin-left: auto;
    display: flex;
    height: 28px;
    align-items: center;
    padding: 0 4px;
    position: relative;
    z-index: 5;
    user-select: none;
}
.nav-pagination span {
    background: white;
    padding: 0 7px;
    padding-top: 1px;
    cursor: pointer;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-pagination span:hover,
.nav-pagination span.active {
    border-bottom: 1px solid #3b5998;
    color: #3b5998;
    font-weight: 600;
}

.result-count {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    font-size: 15px;
    font-weight: 600;
}

.result-count__items {
    color: #1cb394;
}
.result-count__resource {
    color: #7cb5ec;
}

.nav-pagination i {
    font-size: 16px;
    font-weight: 600;
    background: white;
    height: 28px;
    width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.15s;
}

.nav-pagination i:hover {
    color: white;
    background: #3b5998;
}

.first-page.icon-w-0 {
    margin-left: 0;
}

.first-page {
    margin-right: 3px;
    border-radius: 4px 0 0 4px;
}

.second-page {
    margin-left: 3px;
    border-radius: 0 4px 4px 0;
}

.hovered-angle {
    display: flex;
    align-items: center;
}

.hovered-angle:hover .border-radius-0 {
    border-radius: 0;
}

.icon-w-0 {
    overflow: hidden;
}

.hovered-angle:not(.hovered-angle:hover) .first-page.icon-w-0 {
    margin-left: 22px;
}
.hovered-angle:not(.hovered-angle:hover) .icon-w-0 {
    width: 0;
}

.hovered-angle:not(.hovered-angle:hover) .fa-angle-right + .icon-w-0 {
    margin-right: 22px;
}

.sentiment {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
}

.item-sentiments i {
    font-size: 22px;
    cursor: pointer;
    transition: 0.15s;
    opacity: 0.25;
}

.item-sentiments i.checked-btn,
.item-sentiments i:hover {
    opacity: 1;
    /* font-size: 27px; */
    transform: scale(1.3);
    margin-bottom: -1px;
}
i.negative {
    background: transparent;
    color: #ec5d5d;
}
i.neutral {
    background: transparent;
    color: #f2c94c;
}
i.positive {
    background: transparent;
    color: #1bb394;
}

.item-sentiments i:not(.item-sentiments i:last-child) {
    margin-right: 7px;
}
.item-modal {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    background: white;
    padding: 3px;
    border-radius: 4px;
    border: 1px solid #e7eaec;
    transition: 0.15s;
    opacity: 0;
    user-select: none;
}
.item-modal:not(.item-modal.active) {
    pointer-events: none;
}
.item-modal.active {
    opacity: 1;
}
.item-action i {
    margin-right: 11px;
}
.item-action {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    white-space: nowrap;
    border-radius: 3px;
}
.item-action:hover {
    background: #f5f5f5;
}

#project_news .fa-globe,
#project_news .fa-newspaper-o,
#project_news .fa-vk,
#project_news .fa-facebook-square,
#project_news .fa-twitter,
#project_news .fa-telegram,
#project_news .fa-google-plus,
#project_news .fa-youtube-play,
#project_news .fa-odnoklassniki-square {
    font-size: 20px;
    vertical-align: text-bottom;
}

#project_news .fa-instagram,
#project_news .fa-at,
.publication_news .fa-instagram,
.publication_news .fa-at {
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    width: 19px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: text-bottom;
}
#project_news .fa-globe {
    color: #1ab394;
}
#project_news .fa-newspaper-o {
    color: #785f50;
}
#project_news .fa-vk {
    color: #4a76a8;
}
#project_news .fa-facebook-square {
    color: #4267b2;
}
#project_news .fa-telegram {
    color: #1da1f2;
}
#project_news .fa-twitter {
    color: #1da1f2;
}
#project_news .fa-instagram {
    background: linear-gradient(#a900ff, #ea3701, #ec920b);
}
#project_news .fa-google-plus {
    color: #4a76a8;
}
#project_news .fa-youtube-play {
    color: #ff0000;
}
#project_news .fa-odnoklassniki-square {
    color: #ee8208;
}
#project_news .fa-at {
    background: #5a90ce;
    color: #ee8208;
    vertical-align: text-bottom;
}
#project_news .fa-tiktok {
    background: #000;
    color: #fff;
    width: 20px;
    display: flex;
    height: 20px;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    border-radius: 4px;
    padding-top: 1.3px;
}

.favorites-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    top: 0;
    overflow: hidden;
    /* transition: .15s; */
    height: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #00000078 !important;
}
.favorites-modal:not(.favorites-modal.active) {
    display: none;
    /* height: 0;
    padding: 0 !important; */
}

.favorite-search {
    min-height: 30px;
    background: #e7eaec;
    border-radius: 3px;
}

.favorite-search .fa-search {
    padding: 0 10px;
    color: #a7b1c2;
}

.favorite-search input {
    width: 100%;
    background: #e7eaec;
    height: 100%;
    font-size: 16px;
}

.favorite-search input:focus {
    outline: none;
}

.favorites-modal-close {
    font-size: 21px;
    padding: 0 4px;
    margin-left: 5px;
    background: red;
    height: 26px;
    width: 26px;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    border-radius: 3px;
}
.favorite-list {
    overflow: hidden;
    overflow-y: scroll;
    height: calc(100% - 109px);
    user-select: none;
}

.favorite-list::-webkit-scrollbar {
    width: 7px;
    margin-left: 2px;
}

.favorite-list::-webkit-scrollbar-track {
    margin-left: 2px;
    background-color: transparent;
}

.favorite-list::-webkit-scrollbar-thumb {
    /*background-color: #eaeaea;*/
    background-color: rgb(170, 227, 255);
    border-radius: 5px;
}

.favorite input {
    margin-right: 8px;
    height: 16px;
    width: 16px;
    margin-top: 0;
}

.favorite span {
    font-size: 15px;
}

.favorite {
    background: #ccc;
    color: white;
    font-weight: 400;
    padding: 1px 11px 0px 11px;
    border-radius: 12px;
    height: 27px;
    line-height: 1;
    cursor: pointer;
    transition: 0.15s;
}
.favorite.list-labels {
    background: transparent;
    color: #333;
    display: flex !important;
    align-items: center !important;
    height: 24px;
    border-radius: 4px;
    padding: 0 6px;
}

/* .favorite:hover {
    background: #8fa9df;
} */
.favorite:hover {
    background: rgb(28, 179, 148, .4);
}

.favorite:not(.favorite.list-labels).active,
.favorite:not(.favorite.list-labels):active {
    background: #3b5998;
}

/* .favorite-buttons {
    padding-top: 9px;
    border-top: 2px solid #e4e4e4;
} */

.favorite-buttons > input {
    width: 100%;
    border: 1px solid #e4e4e4 !important;
    border-radius: 3px 0px 0px 3px !important;
    border-right: 0px !important;
    padding-left: 9px;
    font-size: 16px;
    outline: none;
}

.favorite-buttons > input {
    outline: none;
}

.favorite-apply {
    font-size: 15px;
    height: 31px;
    padding: 0 8px;
    border-radius: 0 3px 3px 0;
    background: #1bb394;
    color: #fff;
    display: flex;
    align-items: center;
    line-height: 1;
    padding-bottom: 2px;
    transition: 0.15s;
    user-select: none;
}
.favorite-apply:hover {
    background: #169077;
}

.item-favorites-min-height {
    min-height: 236px;
}

.label-color {
    color: rgb(28, 179, 148) !important;
    cursor: pointer;
}

.label-color.label-filter {
    color: #cacccc !important;
    transition: .15s;
}
.label-color.label-filter:hover {
    color: rgba(28,179,148,0.7) !important;
}
.label-color.label-filter.selected,
.label-color.label-filter.selected:hover {
    color: rgb(28, 179, 148) !important;
}

.remove-item-folder {
    margin-left: 4px;
    height: 100%;
    align-items: center;
    display: inline-flex;
    cursor: pointer;
    padding-top: 1px;
}

.close-item-modal {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 16px;
    font-size: 23px;
    cursor: pointer;
}

.item-folder {
    cursor: default;
    color: rgb(111, 162, 207);
    border: 1px solid rgb(111, 162, 207);
    border-radius: 3px;
    height: 24px;
    padding: 0 4px;
}

.item-folder span {
    padding-top: 4px;
    padding-bottom: 1px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.15s;
    max-width: 160px;
}

.item-folder:not(.item-folder:last-child) {
    margin-right: 7px;
}

.item-folder:hover {
    color: white !important;
    background: rgb(111, 162, 207);
}

.item-folders {
    overflow-x: scroll;
    margin: 0 15px;
    margin-bottom: -8px;
    padding-bottom: 2px;
    text-overflow: ellipsis;
}

.item-folders::-webkit-scrollbar {
    /* width: 7px; */
    height: 7px;
    margin-left: 2px;
}

.item-folders::-webkit-scrollbar-track {
    margin-left: 2px;
    background-color: transparent;
}

.item-folders::-webkit-scrollbar-thumb {
    background-color: rgb(170, 227, 255);
    border-radius: 5px;
}

.sort-by-metrics {
    margin-left: auto;
    border-radius: 4px;
    border: 1px solid #3b5998;
}

/* .sort-by-metric:not(.sort-by-metric:last-child) {
    border-right: 1px solid #ccc;
} */
.sort-by-metric.active,
.sort-by-metric:hover {
    background: #3b5998;
    color: #fff;
    fill: #fff;
}
.sort-by-metric.disabled,
.sort-by-metric.disabled:hover {
    background: transparent;
    color: #ccc;
    fill: #ccc;
    cursor: default;
}
.sort-by-metric.disabled:active {
    pointer-events: none;
}
.sort-by-metric {
    padding: 4px 8px;
    font-size: 18px;
    cursor: pointer;
    color: #3b5998;
    fill: #3b5998;
}

.delete-resource-title {
    font-size: 19px;
    background: #ec5e5e;
    color: white;
    padding: 12px;
}

.delete-resource-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    top: 0;
    overflow: hidden;
    /* transition: .15s; */
    height: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #00000078 !important;
}

.delete-resource-modal > div {
    background: white;
    border-radius: 4px;
    /* overflow: hidden; */
    width: 500px;
    box-shadow: 0 0 11px #ffffff6e;
}
.delete-resource {
    padding: 9px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.default-btn {
    height: 28px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 4px;
}
.delete-resource-btn {
    background: #ec5e5e;
    color: white;
    margin-left: 12px;
}
.cancel-btn {
    border: 1px solid #ccc;
    margin-left: auto;
}

.full-item-text {
    max-width: 1000px;
    font-size: 16px;
    line-height: 1.3;
    font-weight: 300;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
}
.full-item-text a {
    color: #23527c;
}
.full-item-text a:hover,
.full-item-text a:focus {
    text-decoration: underline;
}

/* Scrollbar */

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

.tab-content::-webkit-scrollbar {
    width: 7px;
    margin-left: 2px;
}

.tab-content::-webkit-scrollbar-track {
    margin-left: 2px;
    background-color: transparent;
}

.tab-content::-webkit-scrollbar-thumb {
    /*background-color: #eaeaea;*/
    background-color: rgb(170, 227, 255);
    border-radius: 5px;
}

.modal-item_btn {
    align-items: center;
    justify-content: center;
    display: inline-flex;
    height: 35px;
    width: 100%;
    min-width: 127px;
    white-space: nowrap;
    max-width: 150px;
    margin: 0 5px;
    color: inherit;
}

.modal-item_btn i {
    margin: 0 5px 0 0;
}

.modal-item_btn.modal-item_btn-sentiment {
    border-radius: 3px;
    color: white;
    padding-top: 1px;
    transition: 0.15s;
}

.modal-item_btn.modal-item_btn-sentiment.positive {
    background: #1cb394;
}
.modal-item_btn.modal-item_btn-sentiment.positive:hover {
    background: #16987e !important;
}

.modal-item_btn.modal-item_btn-sentiment.neutral {
    background: #f2b90a;
}
.modal-item_btn.modal-item_btn-sentiment.neutral:hover {
    background: #d8a409 !important;
}

.modal-item_btn.modal-item_btn-sentiment.negative {
    background: #ec5e5e;
}
.modal-item_btn.modal-item_btn-sentiment.negative:hover {
    background: #d15353 !important;
}

.modal-item_btn.modal-item_btn-sentiment i {
    margin: 0 0 0 5px;
}

.red-color {
    color: #ec5d5d;
}

.red-border-color {
    border-color: #ec5d5d;
}
.toggle-newspaper {
    background: rgb(50, 54, 57);
    color: white;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 13px;
    border-radius: 10px 10px 0 0;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
}
.toggle-newspaper i {
    transition: 0.15s;
}

.comments {
    margin-bottom: 16px;
}
.comment {
    font-size: 14px;

    padding: 12px 17px 12px 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    /* display: flex; */
    border-radius: 4px;
    transition: 0.2s;
    position: relative;
    min-height: 50px;
    margin-top: 16px;
    line-height: 1.4;
    display: inline-flex;
    width: 100%;
}

.comment:hover {
    transform: scale(1.01);
}

.comment-user {
    color: #000;
    font-weight: 600;
    margin-right: 7px;
    white-space: nowrap;
}
.comment-user:hover {
    color: #000;
    text-decoration: underline;
}

.comment-text {
    color: #333;
    font-weight: 300;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 1px 0;
}
.comment-text:hover {
    color: #000;
}

.comment-info {
    position: absolute;
    right: -10px;
    bottom: -10px;
    border: 1px solid #2f4050;
    height: 24px;
    display: flex;
    align-items: center;
    border-radius: 4px;

    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    background: white;
    color: white;
    font-size: 12px;
}

.comment-date {
    background: #2f4050;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 5px;
}
.comment-likes {
    color: #2f4050;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1px 0 6px;
    margin-right: 5px;
}
.comment-likes i {
    margin-right: 5px;
    font-size: 14px;
}

.comment-title {
    font-size: 20px;
    font-weight: 600;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    margin-right: 10px;
}

.apply-btn {
    margin-left: auto;
    background: #1ab394;
    color: white;
    border-radius: 3px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    height: 28px;
    font-weight: 600;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
}
.apply-btn:hover {
    background: #138871;
}
.apply-btn.disabled {
    background: #a7b1c2;
    pointer-events: none;
}
.comment-status {
    display: flex;
    align-items: center;
    color: #676a6c;
    font-size: 15px;
    border: 1px solid;
    border-radius: 4px;
    padding: 0 5px 2px 5px;
    margin-bottom: 3px;
}
.comment-status.comment-error {
    color: #ec5d5d;
}
.comment-status.comment-parsing {
    color: #1cb394;
}

.search-comments-input {
    padding-left: 8px;
    border: 1px solid #ccc;
    height: 100%;
    margin-right: 10px;
    padding-top: 2px;
    border-radius: 4px;
    width: 100%;
}

.search-comments-input:focus {
    outline: none;
}

.modal-item-social-icon {
    position: relative;
    z-index: 0;
}
.modal-item-social-icon.fa-facebook-square::after,
.modal-item-social-icon.fa-odnoklassniki-square::after,
.modal-item-social-icon.fa-telegram::after,
.modal-item-social-icon.fa-youtube-play::after {
    content: "";
    position: absolute;
    left: 1px;
    right: 1px;
    top: 0;
    bottom: 0;
    height: 10px;
    background: white;
    z-index: -1;
    margin: auto;
    border-radius: 2px;
}
.modal-item-social-icon.fa-odnoklassniki-square::after {
    height: 14px;
}
.modal-item-social-icon.fa-facebook-square::after {
    height: 17px;
    border-radius: 50%;
    top: 1px;
}
.chat-gpt-modal {
    width: 65% !important;
    height: 80%;
    background: transparent !important;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif ;
    font-size: 16px;
    box-shadow: none !important;
    /* min-width: 940px; */
    min-width: 65%;
}

@media (max-width: 1000px) {
    .chat-gpt-modal {
        min-width: 540px;
        width: calc(100% - 20px) !important;
    }
}
.tab-head {
    display: flex;
}

.tab-item {
    position: relative;
    padding: 8px 10px;
    border: 1px solid #d4d4d4;
    border-radius: 4px 4px 0 0;
    margin-right: 10px;
    cursor: pointer;
    margin-bottom: -1px;
    /* background: white; */
    
    border-color: transparent !important;
    color: #A7B1C2;
}

.tab-item:hover {
    color: #676a6c;
}
.tab-item:not(.tab-item.selected):not(.tab-item:hover) {
    color: #929191;
}
.tab-item.selected {
    border-bottom: none;
    background: white;
    color: #495057 !important;
    border-color: #dee2e6 #dee2e6 #fff !important;
}
.tab-content-container {
    background: white;
    overflow: hidden;
    border: 1px solid #d4d4d4;
    border-radius: 0 0 0 5px;
    height: 100%;
}
.tab-content {
    /* padding: 22px; */
    padding: 14px 17px;
    height: calc(100% - 60px);
    overflow-y: scroll;
    overflow-x: visible;
    margin: 2px 2px 0 0;

    border: 2px solid #e7eaec;
    margin: 14px 17px;
    border-radius: 4px;
}
.imas-tag {
    display: inline !important;
    background: #6FA2CF !important;
    color: #fff !important;
    padding: 0 4px !important;
    border-radius: 3px !important;
    padding-bottom: .1em !important;
}
.similars-count {
    position: absolute;
    right: 50px;
    top: -10px;
    
    color: #ffffffd9;
    background: #3b5998c4;

    height: 24px;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 1px 6px 0;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 0 5px #3b5998b3;
    transition: .15s;
}
.similars-count:hover {
    color: #fff;
    background: #3b5998;
}
@media (max-width: 1440px) {
    .item-container {
        width: 100%;
    }
}
/* .fa-exclamation {
    color: #3b5998;
    background: white;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding-left: 1px;
    font-size: 10px;
} */
</style>
