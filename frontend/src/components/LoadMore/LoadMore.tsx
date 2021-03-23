import React from "react";
import styled from "styled-components";


type LoadMoreProps = {
    loading: number
}

const StyledLoadMore = styled.button.attrs((props: LoadMoreProps) => ({
    disabled: props.loading
}))<LoadMoreProps>`
    background: #007bff;
    border: 0;
    color: white;
    padding: 0 15px;
    margin: 0 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    &[disabled] {
        cursor: not-allowed;
        
        background: rgba(255,53,80,0.4);
    }
`;

export const LoadMore: React.FC<any> = ({ children, onClick, loading }) => {
    return <StyledLoadMore loading={loading} onClick={onClick}>{children}</StyledLoadMore>;
};
