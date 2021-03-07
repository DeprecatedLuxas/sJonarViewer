import styled from 'styled-components';

type ErrorMessageType = {
    width?: string
}


export const ErrorMessage = styled.span<ErrorMessageType>`
    display: block;
    width: ${props => props.width || "80%"};
    height: auto;
    color: #721c24;
    background-color: #f8d7da;

    text-align: center;
    margin: 5px auto 10px auto;
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid  #f5c6cb;
    border-radius: .25rem;

`;
