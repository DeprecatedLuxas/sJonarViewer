import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.h1`
    user-select: none;
    cursor: pointer;
    text-align: center;
`;


export const Header: React.FC<any> = ({ children }) => {
    let history = useHistory();
    return (
        <StyledHeader onClick={() => history.push("/")}>
            {children}
        </StyledHeader>
    );
}