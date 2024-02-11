// получаем текущий язык интерфейса
export function getLang() {
    var params = {};

    let tmp_params = window.location.href
        .replace(/\?.*/, "")
        .split("//")
        .join("")
        .split("/");
    for (var p = 0; p < tmp_params.length; p++) {
        var _tmp = tmp_params[p].split("=");

        params[_tmp[0]] = _tmp[1];
    }
    let lang = Object.keys(params)[1];
    return lang;
}
export function langIs(lang) {
    return getLang() === lang;
}