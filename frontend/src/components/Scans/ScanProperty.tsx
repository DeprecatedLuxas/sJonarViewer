import React from "react";
import styled from "styled-components";
import { v4 as uuidv4} from 'uuid'
const StyledProperty = styled.div``;
const StyledKey = styled.h4`
    color: #007bff;
`;
const StyledValue = styled.span`
    white-space: pre-wrap;
    word-wrap: break-word;
`;

export const ScanProperty: React.FC<{
    propertyKey: string;
    propertyValue: string;
    click: (e: any) => void;
}> = ({ propertyKey, propertyValue, click }) => {
    return ( 
        <StyledProperty onClick={click} key={uuidv4()}>
            <StyledKey key={uuidv4()} data-scan={propertyKey}>{propertyKey}</StyledKey>
            <StyledValue key={uuidv4()} data-scan={propertyKey}>{propertyValue}</StyledValue>
        </StyledProperty>
    );
};
