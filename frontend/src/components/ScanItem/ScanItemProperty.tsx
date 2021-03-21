import React, {Component} from "react";
import styled from "styled-components";
import {buildNewSearch, parseString} from "../../utils";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const ScanItemDiv = styled.div``;
const ScanItemValue = styled.span`
    white-space: pre-wrap;
    word-wrap: break-word;
`;
const ScanItemKey = styled.h4`
    color: #007bff;
`;
interface ScanItemPropertyProps extends RouteComponentProps<any> {
    query: {
        searchBar: string,
        properties:{
            key: string,
            value: boolean | string | number
        },
        searchQuery: string
    }
}




class ScanItemProperty extends Component<ScanItemPropertyProps, any> {
   
    redoSearch = (event: React.MouseEvent) => { 

        const {
            properties,
            searchQuery
        } = this.props.query;
        const { key, value } = properties;
        const url = buildNewSearch(searchQuery, value, key);
        const metaKeyPressed = event.ctrlKey
        console.log(url)
        if (metaKeyPressed) {
            window.open(url);
        } else {
            this.props.history.push(url)
        }
    }


    render() {
        const { key, value } = this.props.query.properties;

        return (
            <ScanItemDiv data-value={value} data-key={key} onClick={this.redoSearch}>
                <ScanItemKey key={uuidv4()}>
                    {key}
                </ScanItemKey>
                <ScanItemValue key={uuidv4()}>
                    {parseString(key, value)}
                </ScanItemValue>
            </ScanItemDiv>
        );
    }
}


export default withRouter(ScanItemProperty); 