import React, {Component} from "react";


import styled from "styled-components";

import {buildNewSearch, parseString} from "../../utils";

const ScanItemDiv = styled.div`

`;
const ScanItemValue = styled.span`
    white-space: pre-wrap;
    word-wrap: break-word;
`;
const ScanItemKey = styled.h4`
    color: #007bff;
`;
type ScanItemPropertyProps = {
    query: ScanItemPropertyQueryProps
}

type ScanItemPropertyQueryProps = {
    searchBar: string,
    properties: ScanItemPropertyPropertiesProps,
    dataValue: string,
    dataKey: string,
    searchQuery: string
}

type ScanItemPropertyPropertiesProps = {
    key: string,
    value: boolean | string | number
}


class ScanItemProperty extends Component<ScanItemPropertyProps, any> {


    redoSearch = () => {
        const {
            dataKey,
            dataValue,
            searchBar,
            searchQuery
        } = this.props.query;

        const url = buildNewSearch({
            dataKey: dataKey,
            dataValue: dataValue,
            searchBar: searchBar,
            searchQuery: searchQuery
        })
        window.open(url);

    }


    render() {
        const {
            dataValue,
            dataKey,
            properties,

        } = this.props.query;
        let {
            key,
            value
        } = properties;
        return (
            <ScanItemDiv data-value={dataValue} data-key={dataKey} onClick={this.redoSearch}>
                <ScanItemKey key={dataKey}>
                    {key}
                </ScanItemKey>
                <ScanItemValue key={dataValue}>
                    {parseString(key, value)}
                </ScanItemValue>
            </ScanItemDiv>
        );
    }
}


export default ScanItemProperty;
