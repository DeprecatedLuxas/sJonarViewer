import styled from 'styled-components';

type ErrorMessageType = {
    width?: string
}


export const ErrorMessage = styled.span<ErrorMessageType>`
    display: block;
    width: ${props => props.width || "80%"}
    height: auto;
    color: red;
    text-align: center;
    margin: 5px auto 10px auto;
    border-radius: 10px;
`;
