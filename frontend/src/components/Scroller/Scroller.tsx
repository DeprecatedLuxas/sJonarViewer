import React, { useState, useEffect } from "react";
import {ArrowUpIcon} from '../Icons';


type ScrollerProps = React.HTMLAttributes<HTMLButtonElement> & {
    isSmooth?: boolean;
    fromTop?: number;
    iconSize?: string;
};

const Scroller: React.FC<ScrollerProps> = ({
    isSmooth = false,
    fromTop = 1000,
    iconSize = "1.25rem",
    ...props
}: ScrollerProps) => {
    const [visible, setVisible] = useState(false);
    const onScroll = () => {
        setVisible(document.documentElement.scrollTop > fromTop);
    };

    useEffect(() => {
        document.addEventListener("scroll", onScroll);
        return () => document.removeEventListener("scroll", onScroll);
    });
    return (
        <>
            {visible && (
                <button
                    style={{
                        backgroundColor: "white",
                        right: "40px",
                        bottom: "40px",
                        position: "fixed",
                        zIndex: 2,
                        cursor: "pointer",
                        borderRadius: "7px",
                        width: "40px",
                        height: "40px",
                        transition: "opacity 1s ease-in-out",
                        boxShadow: "0 9px 25px 0 rgba(132, 128, 177, 0.28)",
                        border: "none",
                        outline: "none"
                    }}
                    onClick={() => {
                        if (isSmooth) {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        } else {
                            document.documentElement.scrollTop = 0;
                        }
                    }}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                >
                    <ArrowUpIcon size={iconSize}/>
                </button>
            )}
        </>
    );
};

export default Scroller;
