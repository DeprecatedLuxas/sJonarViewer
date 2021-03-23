import React, { Component } from "react";
import styled from "styled-components";
import { buildNewSearch } from "../../utils";
import { RouteComponentProps, withRouter } from "react-router-dom";
const KnownItemContainer = styled.div`
    margin: 10px;
    width: 350px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 2px solid rgba(82, 75, 71, 0.4);
    transition: transform 0.3s ease;
    box-shadow: 6px 5px 5px rgba(92, 69, 82, 0.4);
    &:hover {
        transform: translateY(-5px);
    }
    
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
const KnownItemHeaderContainer = styled.div`
    position: relative;
`;

const KnownItemAmount = styled.a`
    position: absolute;
    padding: 2px;
    color: white;
    background-color: #007bff;
    border: 1px solid rgba(82, 75, 71, 0.4);
    border-radius: 10px;
    left: 20px;
    top: 4px;
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

interface KnownItemProps extends RouteComponentProps<any> {
    known: KnownItemKnownProps;
}
type KnownItemKnownProps = {
    name: string;
    amount: number;
    sslImplementationTested: string;
    jarmHash: string;
    link: string;
};

class KnownItem extends Component<KnownItemProps, any> {
    redoSearch = (event: React.MouseEvent) => {
        const url = buildNewSearch(
            encodeURIComponent(JSON.stringify({})),
            this.props.known.jarmHash,
            "JARMHASH"
        );
        const metaKeyPressed = event.ctrlKey;

        if (metaKeyPressed) {
            window.open(url);
        } else {
            this.props.history.push(url);
        }
    };

    render() {
        const {
            name,
            amount,
            sslImplementationTested,
            jarmHash,
            link,
        } = this.props.known;
        return (
            <KnownItemContainer>
                <KnownItemHeaderContainer>
                    <KnownItemAmount>{amount}</KnownItemAmount>
                    <KnownItemHeader>{name}</KnownItemHeader>
                </KnownItemHeaderContainer>
                <KnownItemProperty>
                    <KnownItemPropertyKey>Jarmhash</KnownItemPropertyKey>
                    <KnownItemPropertyValue>{jarmHash}</KnownItemPropertyValue>
                </KnownItemProperty>
                <KnownItemProperty>
                    <KnownItemPropertyKey>
                        SSL Implementation Tested
                    </KnownItemPropertyKey>
                    <KnownItemPropertyValue>
                        {sslImplementationTested}
                    </KnownItemPropertyValue>
                </KnownItemProperty>

                <KnownItemButtonContainer>
                    <KnownItemButton
                        href={link === "N/A" ? "" : link}
                        target={link === "N/A" ? "" : "_blank"}
                    >
                        Visit their page
                    </KnownItemButton>
                    <KnownItemButton onClick={this.redoSearch}>
                        Search for jarm
                    </KnownItemButton>
                </KnownItemButtonContainer>
            </KnownItemContainer>
        );
    }
}

export default withRouter(KnownItem);
