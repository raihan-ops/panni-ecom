import React from 'react';
import { twMerge } from "tailwind-merge";


const Text = ({ children, className }) => {
    
    return (
        <>
            <span className={twMerge("text-neutral-light font-600 text-too-small", className)}>
            {children}
            </span>
        </>
    );
};

export default Text;