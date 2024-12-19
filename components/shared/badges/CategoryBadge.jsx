/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";


export default function CategoryBadge({ children, className }) {
    return (
        <Fragment>
            <span className={twMerge("px-3 py-1 font-lato", className)}>{children}</span>
        </Fragment>
    )
}
