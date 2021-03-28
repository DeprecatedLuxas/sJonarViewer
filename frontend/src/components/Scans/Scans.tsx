import React from "react";
import styled from "styled-components";

const StyledScans = styled.div`
    width: 100%;

    margin: 5px 0;
`;

export const Scans: React.FC<{ children: any }> = ({ children }) => (
    <StyledScans>{children}</StyledScans>
);
