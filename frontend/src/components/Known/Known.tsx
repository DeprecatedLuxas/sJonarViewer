import React, { Component } from "react";
import styled from "styled-components";
import { buildNewSearch } from "../../utils";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { KnownProperty } from "./KnownProperty";
const StyledKnown = styled.div`
    margin: 10px;
    min-width: 200px;
    background-color: #ffffff;
    min-height: 100px;
    border-radius: 10px;

    transition: transform 0.3s ease;
    box-shadow: 6px 5px 5px rgba(92, 69, 82, 0.4);
    &:hover {
        transform: translateY(-5px);
    }
`;
const KnownItemHeaderContainer = styled.div`
    position: relative;
`;

const KnownItemAmount = styled.a`
    position: absolute;
    padding: 5px;
    color: white;
    background-color: #007bff;
    border: 1px solid rgba(82, 75, 71, 0.4);
    border-radius: 10px;
    right: 5px;
    top: 5px;
`;

const KnownItemHeader = styled.h3`
    text-align: center;
    padding: 5px 15px;
    height: 50px;
`;
const KnownItemButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
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
            <StyledKnown>
                <KnownItemHeaderContainer>
                    <KnownItemAmount>{amount}</KnownItemAmount>
                    <KnownItemHeader>{name}</KnownItemHeader>
                </KnownItemHeaderContainer>
                <KnownProperty
                    propertyKey="Jarmhash"
                    propertyValue={jarmHash}
                />
                <KnownProperty
                    propertyKey="SSL Implementation Tested"
                    propertyValue={sslImplementationTested}
                />

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
            </StyledKnown>
        );
    }
}

export default withRouter(KnownItem);
