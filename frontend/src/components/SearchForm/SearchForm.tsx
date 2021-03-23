import styled from "styled-components";



interface SearchFormProps {
    error: boolean;
}
export const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    
    input {
        flex: 1;
        border: solid 1px ${(props: SearchFormProps) => props.error ? "#f5c6cb" : "#007bff"};
        padding: 10px 15px;
        border-radius: 4px; 
        font-size: 16px;
        &:focus {
            outline: none;
        }
    }


    
    @media only screen and (max-width: 600px) {
        flex-direction: column;

    }
    
`;


type SearchButtonProps = {
    loading: number
}
export const SearchButton = styled.button.attrs((props: SearchButtonProps) => ({
    disabled: props.loading
}))<SearchButtonProps>`
    
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

    
    @media only screen and (max-width: 600px) {
            margin: 10px 0px;
            width: 100%;
    }
`;
