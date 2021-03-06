import {formatYearAndDayAndMonth} from "./time-parser";
import {convertIntegerToIp} from "./ip-parser";

export function getParameterByName(name: string, url: string) {
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export function doesUrlHaveQuery(url: string) {
    return !!url;

}

export function parseString(key: string, value: string | number | boolean) {
    if (key === "SCANDATE" && typeof value === "string") {

        value = formatYearAndDayAndMonth(value);
    }
    if (key === "IP" && typeof value === "number") {
        value = convertIntegerToIp(value);
    }
    return value;
}
