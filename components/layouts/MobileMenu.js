"use client"

import NavItems from "@/components/layouts/LeftNavItems";
import {useState} from "react";
import MenuIcon from "@/components/layouts/MenuIcon";

const NavMenu = () => {

    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    return (
        <nav className={`lg:hidden group ${toggle ? "open" : ""}`}>

            <MenuIcon
                toggleMenu={toggleMenu}
                toggle={toggle}
            />

            <div
                className="
                    fixed pl-2 z-999 transition-all h-[calc(100vh-112px)] w-60 bg-white
                    -right-60 group-[.open]:right-0 top-28 shadow
                "
            >
                <NavItems
                    toggleMenu={toggleMenu}
                />
            </div>

        </nav>
    );
};

export default NavMenu;