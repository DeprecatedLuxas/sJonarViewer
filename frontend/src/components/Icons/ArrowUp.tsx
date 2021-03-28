import React from "react";
import { ReactComponent as ArrowUp } from "../../assets/ArrowUp.svg";


type ArrowUpIconProps = {
    size: string
};



export const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
    size
}: ArrowUpIconProps) => {
    return <ArrowUp style={{width: size, height: size}} />;
};
