import { formatYearAndDayAndMonth } from "./time-parser";
import { convertIntegerToIp } from "./ip-parser";

export function getParameterByName(name: string, url: string) {
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

export function sortValues(key: string, order = "asc") {
    return function innerSort(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
    };
}

export function encodeSearch(search: string) {
    return btoa(
        encodeURIComponent(search).replace(
            /%([0-9A-F]{2})/g,
            function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }
        )
    );
}

export function decodeSearch(search: string) {
    return decodeURIComponent(
        Array.prototype.map
            .call(atob(search), function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}
