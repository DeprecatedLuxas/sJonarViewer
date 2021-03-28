import React from "react";
import styled from "styled-components";

const StyledProperty = styled.div`
    display: block;
    height: 80px;

    margin-bottom: 20px;
    padding: 5px;
`;

const StyledKey = styled.h4`
    height: 30px;
`;

const StyledValue = styled.span`
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    height: 30px;
    margin-top: 10px;
`;

export const KnownProperty: React.FC<{
    propertyKey: string;
    propertyValue: string;
}> = ({ propertyKey, propertyValue }) => {
    return (
        <StyledProperty>
            <StyledKey>{propertyKey}</StyledKey>
            <StyledValue>{propertyValue}</StyledValue>
        </StyledProperty>
    );
};
