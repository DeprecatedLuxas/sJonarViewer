import React, {Component, MouseEventHandler} from "react";
import styled from "styled-components";
import {buildNewSearch, parseString} from "../../utils";
import { RouteComponentProps, withRouter } from 'react-router-dom';


const ScanItemDiv = styled.div`
    &:hover {
        background-color: green;
    }

`;
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
        dataValue: string,
        dataKey: string,
        searchQuery: string
    }
}




class ScanItemProperty extends Component<ScanItemPropertyProps, any> {




   
    redoSearch = (event: React.MouseEvent) => { 

        const {
            dataKey,
            dataValue,
            searchQuery
        } = this.props.query;
        const url = buildNewSearch(searchQuery, dataValue, dataKey);
        const metaKeyPressed = event.ctrlKey

        if (metaKeyPressed) {
            window.open(url);
        } else {
    
            // @ts-ignore
            this.props.history.push(url)
        }
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


export default withRouter(ScanItemProperty); 