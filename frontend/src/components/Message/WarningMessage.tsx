import React from 'react';
import { Message } from './Message';
import { MdErrorOutline } from "react-icons/md"

export const WarningMessage: React.FC<any> = () => {
    return (
        <Message color="#721c24" backgroundColor="#f8d7da" border="1px solid #f5c6cb">
            <MdErrorOutline color=""/>
        </Message>
    );
}