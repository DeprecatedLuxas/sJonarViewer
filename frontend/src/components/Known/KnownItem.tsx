import React, {Component} from 'react';
import styled from 'styled-components'
import {buildNewSearch} from "../../utils";

const KnownItemContainer = styled.div`
    margin: 10px;
    width: 350px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 2px solid rgba(82, 75, 71, 0.4);
`;

const KnownItemProperty = styled.div`
    margin-top: 5px;
    padding: 5px;
`;
const KnownItemPropertyKey = styled.h4``;
const KnownItemPropertyValue = styled.span`
    white-space: pre-wrap;
    word-wrap: break-word;
`;
const KnownItemHeader = styled.h3`
    text-align: center;
    padding: 5px 0;
`;
const KnownItemButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
    @media only screen and (max-width: 1200px) {
        flex-direction: column;
    }
`;

const KnownItemButton = styled.a`
    cursor: pointer;
    width: 60%;
    margin: 5px;

    text-align: center;
    padding: 6px 12px;
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 6px;
    text-decoration: none;
    
    
`;

type KnownItemProps = {
    known: KnownItemKnownProps
}
type KnownItemKnownProps = {
    name: string,
    sslImplementationTested: string,
    jarmHash: string,
    link: string
}


class KnownItem extends Component<KnownItemProps, any> {


    redoSearch = () => {
        const url = buildNewSearch({
            dataKey: "JARMHASH",
            dataValue: this.props.known.jarmHash,
            searchBar: "",
            searchQuery: encodeURIComponent(JSON.stringify({}))
        })
        window.open(url);

    }

    render() {
        const {
            name,
            sslImplementationTested,
            jarmHash,
            link
        } = this.props.known;
        return (
            <KnownItemContainer>
                <KnownItemHeader>{name}</KnownItemHeader>
                <KnownItemProperty>
                    <KnownItemPropertyKey>Jarmhash</KnownItemPropertyKey>
                    <KnownItemPropertyValue>{jarmHash}</KnownItemPropertyValue>
                </KnownItemProperty>
                <KnownItemProperty>
                    <KnownItemPropertyKey>SSL Implementation Tested</KnownItemPropertyKey>
                    <KnownItemPropertyValue>{sslImplementationTested}</KnownItemPropertyValue>
                </KnownItemProperty>

                <KnownItemButtonContainer>
                    <KnownItemButton href={link === "N/A" ? "" : link} target="_blank">
                        Visit
                    </KnownItemButton>
                    <KnownItemButton onClick={this.redoSearch}>
                        Search for jarm
                    </KnownItemButton>
                </KnownItemButtonContainer>


            </KnownItemContainer>
        )
    }
}


export default KnownItem;
