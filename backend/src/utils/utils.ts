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

export function formatTime(time: string) {
    return moment(time).format(config.time.format);
}



export function merge<A, B>(a: A, b: B): A | B {
    return Object.assign({}, a, b);
}

export function getColumns() {
    return config.database.columns.filter((column: any) => column.settings.doesShowOnSearch).
    map((column) => column.name)
}



export function buildSQLStatement(searchQuery: any) {
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
            console.error("There was no column named after objKeyUppercase")
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
                            formatTime(firstSeparatorValue),
                            formatTime(secondSeparatorValue)
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
                        queryBuilder.whereBetween(objKey, [formatTime(objValue), formatTime2(objValue, 1)])
    
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
    queryBuilder.limit(config.database.returnLimit);
    return queryBuilder;
}

function getColumn(columnName: string): SQLColumn {
    return config.database.columns.find((column: SQLColumn) => column.name === columnName);
}
export function formatTime2(time: string, howMuchToAdd: number) {
    return moment(time).add(howMuchToAdd, 'second').format(config.time.format);
}
