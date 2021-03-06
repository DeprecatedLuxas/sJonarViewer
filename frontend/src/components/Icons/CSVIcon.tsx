import styled from 'styled-components'
import {ReactComponent as CSVLogo } from "../../assets/csv.svg"

type CsvIconProps = {
    width?: string,
    height?: string
}

export const CSVIcon = styled(CSVLogo)<CsvIconProps>`
    width: ${props => props.width || "26px"};
    height: ${props => props.height || "26px"};
    outline: none;    
    color:  #808080;
`
