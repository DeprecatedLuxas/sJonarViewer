import React from "react";
import styled from "styled-components";

export const StyledScanItems = styled.div`
    width: 100%;

    margin: 5px 0;
`;

export const ScanItems: React.FC<any> = ({ children }) => {
    return <StyledScanItems>{children}</StyledScanItems>;
};
