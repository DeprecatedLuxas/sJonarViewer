export interface SearchParameters {
    dataKey: string,
    dataValue: string,
    searchBar: string,
    searchQuery: string
}

export interface IMatchedKeyword {
    keyword: string,
    value: string,
    isConditional: boolean
}

export interface ISearchQuery {
    [name: string]: any
}
