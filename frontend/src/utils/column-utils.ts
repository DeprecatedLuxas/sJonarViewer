import {SQLColumn} from "../types/sql-types";
import config from "@config";


export function getColumn(columnName: string): SQLColumn {
    return config.database.columns.find((column: SQLColumn) => column.name === columnName) as SQLColumn;
}

export function getKeywords() {
    return config.database.columns
        .filter(
            (keyword: SQLColumn) =>
                !keyword.settings.isRange && keyword.settings.canBeSearched
        )
        .map((keyword: SQLColumn) => {
            return keyword.name;
        });
}





export function isColumnConditional(columnName: string): boolean | undefined {
    return config.database.columns.find((column: SQLColumn) => column.name === columnName)?.settings.isConditional

}



export function getRanges() {
    return config.database.columns
        .filter(
            (range: SQLColumn) =>
                range.settings.isRange && range.settings.isConditional
        )
        .map((range) => {
            return range.name;
        });
}

