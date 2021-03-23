import moment from 'moment';
import config from "../../../config.json";
import database from '../database/database';
import {SQLColumn} from "../types";


export function convertIpToInteger(ip: string) {
    return (
        ip.split(".").reduce((ipInt: number, octet: string) => {
            return (ipInt << 8) + parseInt(octet, 10);
        }, 0) >>> 0
    );
}
export function convertIntegerToIp(ipInt: number) {
    return (
        (ipInt >>> 24) +
        "." +
        ((ipInt >> 16) & 255) +
        "." +
        ((ipInt >> 8) & 255) +
        "." +
        (ipInt & 255)
    );
}

export function merge<A, B>(a: A, b: B): A | B {
    return Object.assign({}, a, b);
}

export function getColumns() {
    return config.database.columns.filter((column: any) => column.settings.doesShowOnSearch).
    map((column) => column.name)
}



export function buildSQLStatement(searchQuery: any, withLimit: boolean = true, offset?: number) {
    let queryBuilder = database.select(getColumns()).from(config.database.table);
    let objKey: string;
    let objKeyUppercase: string; // Used to find the column details.
    let objValue: string;
    let columnObject: SQLColumn;

    Object.keys(searchQuery).map((obj: string) => {
        objKey = obj;
        objKeyUppercase = objKey.toUpperCase();
        objValue = searchQuery[objKey];
        columnObject = getColumn(objKeyUppercase);
        // When there was no column found.
        if (!columnObject) {
            throw new Error("Object key is not found error?")
        }

        if (columnObject.settings.isRange) {
            // Check whether objValue contains ..
            if (/\.\./g.test(objValue)) {
                let separatorValue = objValue.split("..");
                let firstSeparatorValue = separatorValue[0];
                let secondSeparatorValue = separatorValue[1];
                if (typeof columnObject.conversion !== "undefined") {
                    if (columnObject.conversion.type === "DATE") {
                        queryBuilder.whereBetween(objKey, [
                            TimeHelper.formatYearMonthAndDay(firstSeparatorValue),
                            TimeHelper.formatYearMonthAndDay(secondSeparatorValue)
                        ]);
                    } 
                } else {
                    queryBuilder.whereBetween(objKey, [
                        firstSeparatorValue,
                        secondSeparatorValue,
                    ]);
                }

            // This is here so the scandate can be used with and without the ..
            } else {
                if (typeof columnObject.conversion !== "undefined") {
                    if (columnObject.conversion.type === "DATE") {
                        queryBuilder.whereBetween(objKey, [TimeHelper.formatYearMonthAndDay(objValue), TimeHelper.addSecondsToTime(objValue, 86399)])
    
                    }
                } else {
                    queryBuilder.where(objKey, objValue);
                }
            }

        } else {
            if (/\.\./g.test(objValue)) {
                throw new Error("RANGE ERROR ..")
            }
            if (columnObject.conversion?.type === undefined) {
                queryBuilder.where(objKey, objValue)
            } else {
                queryBuilder.where(objKey, convertIpToInteger(objValue));
            }

        }
    });
    if (withLimit) {
        queryBuilder.limit(config.database.returnLimit);
    }
    if (offset) {
        queryBuilder.offset(offset);
    }
    return queryBuilder;
}

function getColumn(columnName: string): SQLColumn {
    return config.database.columns.find((column: SQLColumn) => column.name === columnName);
}


class TimeHelper {

    static formatYearMonthAndDay(time: string) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }

    static addSecondsToTime(time: string, seconds: number) {
        return moment(time).add(seconds, 'second').format("YYYY-MM-DD HH:mm:ss");
    }
}
