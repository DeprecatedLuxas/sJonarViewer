import moment from "moment";
import config from "@config";

export function formatTime(time: string) {
    return moment(time).format(config.time.format);
}


export function formatYearAndDayAndMonth(time: string) {
    return moment(time).format("YYYY-MM-DD")
}
