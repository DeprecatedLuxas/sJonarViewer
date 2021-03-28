import * as _ from 'lodash'
import {IMatchedKeyword, ISearchQuery} from "../types/search-types";
import {getColumn, getKeywords, getRanges, isColumnConditional} from "./column-utils";
import {
    merge
} from "./object-utils"
import {
    encodeSearch
} from "./string-utils"
const searchRegex = /(\S+:'(?:[^'\\]|\\.)*')|(\S+:"(?:[^"\\]|\\.)*")|(-?"(?:[^"\\]|\\.)*")|(-?'(?:[^'\\]|\\.)*')|\S+|\S+:\S+/g;


export function parseSearchBar(searchBar: string, offset?: number) {
    let parsedSearchQuery: ISearchQuery = {};
    let keywords = getKeywords();
    let ranges = getRanges();
    let matchedKeywords: IMatchedKeyword[] = [];
    let keywordFinder;
    let match;

    while ((keywordFinder = getQueryOperatorsInSearchBar(searchBar)) !== null) {
        match = keywordFinder[0];
        const splitIndex = match.indexOf(":");
        // Check if there is a semicolon in the string.
        if (splitIndex !== -1) {
            // Getting the value before the split.
            const matchedKeywordKey = match.slice(0, splitIndex);
            // Getting the value after the split.
            const matchedKeywordValue = match.slice(splitIndex + 1);

            matchedKeywords.push({
                keyword: matchedKeywordKey,
                value: sanitizeValue(matchedKeywordValue),
                isConditional: isColumnConditional(matchedKeywordKey.toUpperCase())!
            });

        }
    }
    
    // Sorts the array so the ones without the isConditional parameter set to false is always first
    matchedKeywords = matchedKeywords.sort((matchedKeyword: IMatchedKeyword) => {
        return matchedKeyword.isConditional ? -1 : 1;
    });


    // I think this is the fastest for this job.
    while (matchedKeywords.length) {
        // Pops one element at the time from the matchedKeywords arraylist
        match = matchedKeywords.pop();
        if (match === null || typeof match === "undefined") {
            return;
        }
        const keywordKey = match.keyword;
        const keywordKeyUppercase = keywordKey.toUpperCase();


        if (!(-1 === keywords.indexOf(keywordKeyUppercase))) {
            if (parsedSearchQuery[keywordKey]) {
                parsedSearchQuery[keywordKey] = [
                    parsedSearchQuery[keywordKey],
                ];
                parsedSearchQuery[keywordKey].push(match.value);
            } else {
                parsedSearchQuery[keywordKey] = match.value;
            }
        }
        if (!(-1 === ranges.indexOf(keywordKeyUppercase))) {

            parsedSearchQuery[keywordKey] = match.value;
        }

        if (match.isConditional) {
            if (!_.some(_.intersection(keywords.map(v => v.toLowerCase()), _.keys(parsedSearchQuery)))) {
                return "";
            }

        }
    }
    if (offset !== undefined) {
        parsedSearchQuery["offset"] = offset;
    }
    return parsedSearchQuery;
}


function getQueryOperatorsInSearchBar(searchBarValue: string) {
    return searchRegex.exec(searchBarValue);
}



function sanitizeValue(value: string) {
    return value.replace(/["'<>]/g, "")
}


export function convertObjectToSearch(obj: any) {
    const returnedArray: string[] = [];

    Object.entries(obj).forEach((array: [string, unknown]) => {

        // This will probably cause some problems, will check back later.
        let columnObj = getColumn(array[0].toUpperCase())

        if (typeof columnObj === "undefined") {
            return;
        }
        let doesHaveConversionObject = columnObj.conversion?.type;
        if (doesHaveConversionObject) {
            switch (columnObj.conversion?.type) {
                case "DATE":
                    array[1] = `${array[1]}`;
                    returnedArray.push(array.join(":"));
                    break;
                case "INTIP":
                    returnedArray.push(array.join(":"));
                    break;
                default:
                    returnedArray.push(array.join(":"));
                    break;
            }
        } else {
            returnedArray.push(array.join(":"))
        }
    })
    return returnedArray.join(" ");
}

export function buildNewSearch(searchQuery: string, value: string | boolean | number, key: string) {
    const parsedSearchQuery = JSON.parse(decodeURIComponent(searchQuery));
    const NewObject = {}
    
    // @ts-ignore
    NewObject[key.toLowerCase()] = decodeURIComponent(value);
    return `search?query=${encodeSearch(JSON.stringify(merge(parsedSearchQuery, NewObject)))}`;
}

