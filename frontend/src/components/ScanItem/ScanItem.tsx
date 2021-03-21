import React, {Component} from "react";

import styled from 'styled-components'
import 'tippy.js/dist/tippy.css';
import ScanItemProperty from "./ScanItemProperty";
import {formatYearAndDayAndMonth} from "../../utils";
import { v4 as uuidv4 } from "uuid";
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
                    if (scan.key === "SCANDATE") {
                        scan.value = formatYearAndDayAndMonth(scan.value);
                    }
                    return (
                        <ScanItemProperty
                                         
                                         query={{
                                            properties: {
                                                key: (scan.key !== "Couldn't get data" ? encodeURIComponent(scan.key) : "invalid"),
                                                value: (scan.value !== "Couldn't get data" ? encodeURIComponent(scan.value) : "invalid")
                                            },
                
                                            searchBar: searchBar,
                                            searchQuery: searchQuery
                                        }}
                                        key={uuidv4()}/>
                    );
                }) : ''}
            </ScanItemContainer>
        );
    }
}




export default ScanItem;
