import React, {Component} from "react";

import styled from 'styled-components'
import 'tippy.js/dist/tippy.css';
import ScanItemProperty from "./ScanItemProperty";
import {formatTime} from "../../utils";

const ScanItemContainer = styled.div`
    width: 90%;
    border: 2px solid rgba(82, 75, 71, 0.4);
    border-radius: 3px;
    background-color: #fff;
    margin: 10px auto;
    display: flex;
    padding: 10px;
    flex-flow: row wrap;
    justify-content: space-around;
    
    
    & div {
        flex: 1 1 0;
        padding: 0 5px;
    }
    
    @media only screen and (max-width: 600px) {
        flex-direction: column;
        
        & > div > h4 {
            margin-top: 10px;
        }
    }

`;

type ScanItemProps = {
    query: {
        searchBar: string,
        properties: {
            key: string,
            value: boolean | string | number
        }[],
        searchQuery: string
    }
}


class ScanItem extends Component<ScanItemProps, any> {

    render() {

        const {
            properties, searchBar, searchQuery
        } = this.props.query;
        return (
            <ScanItemContainer key={properties[0].key}>
                {properties && properties.length > 0 ? properties.map((scan: any) => {
                    let dataValue = scan.value;
                    let dataKey = scan.key;
                    if (dataKey === "SCANDATE") {
                        dataValue = formatTime(dataValue);
                    }
                    return (
                        <ScanItemProperty
                                         
                                         query={{
                                            properties: {
                                                key: scan.key,
                                                value: scan.value
                                            },
                                            dataValue: (dataValue !== "Couldn't get data" ? encodeURIComponent(dataValue) : "invalid"),
                                            dataKey: (dataKey !== "Couldn't get data" ? encodeURIComponent(dataKey) : "invalid"),
                                            searchBar: searchBar,
                                            searchQuery: searchQuery
                                        }}
                                        key={scan.key}/>
                    );
                }) : ''}
            </ScanItemContainer>
        );
    }
}




export default ScanItem;
