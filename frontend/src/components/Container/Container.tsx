import styled from 'styled-components';


type ContainerProps = {width?: string}

export const Container = styled.div<ContainerProps>`
    width: ${props => props.width || "80%"};
    
    background: #ffffff;
    border-radius: 15px;
    
    margin: 20px auto;
    
    @media only screen and (max-width: 600px) {
        width: 100%;   
    }
`;
