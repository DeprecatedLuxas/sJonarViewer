export interface SQLColumn {
    [name: string]: any,
    name: string,
    columnType: string,
    conversion?: SQLColumnConversion,
    settings: SQLColumnSettings
}

export interface SQLColumnSettings {
    canBeSearched: boolean,
    isRange: boolean,
    isConditional: boolean,
    doesShowOnSearch: boolean
}

export interface SQLColumnConversion {
    type: string
}
