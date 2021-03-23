import React from 'react';
import { Message } from './Message';
import { MdErrorOutline, MdClose } from "react-icons/md"

export const ErrorMessage: React.FC<any> = ({ code, message}) => {
    return (
        <Message color="#721c24" backgroundColor="#f8d7da" border="1px solid #f5c6cb">
            <MdErrorOutline/>
            <MdClose/>
            <p>{message}</p>
            <p>{code}</p>
        </Message>
    );
}