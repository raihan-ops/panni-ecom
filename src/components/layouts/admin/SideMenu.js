"use client";

import Link from "next/link";
import {ADMIN_ARTICLES_PATH} from "@/helpers/Slugs";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useState} from "react";

// import RightArrow from "public/right-arrow.webp";
import {ADMIN_NAVS} from "@/helpers/Navs";

const SideMenu = () => {

    const pathname = usePathname();

    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    const isActiveRoute = (route) => {

        if (route === pathname) {
            return "bg-emerald-700 text-white";
        }

        return "bg-gray-200 hover:bg-emerald-700 hover:text-white";
    }

    return (
        <div
            className={
                `
                    w-64 h-screen border-r border-emerald-700 bg-white ${toggle ? "lg:-ml-64" : "lg:ml-0"}
                    transition-all lg:relative absolute z-999 ${toggle ? "max-lg:-left-64" : "max-lg:left-0"}
                `
            }
        >
            <div
                className="bg-white w-8 h-8 absolute top-4 -right-8 flex-center cursor-pointer"
                onClick={toggleMenu}
            >
                {/* <Image
                    className={`transition-all ${!toggle ? "rotate-180" : ""}`}
                    src={RightArrow}
                    alt="Arrow for collapse side menu"
                /> */}
            </div>
            <Link
                title="Admin dashboard link"
                href={ADMIN_ARTICLES_PATH}
            >
                <div
                    className="w-full h-16 flex-center p-4"
                >
                    {/* <Image
                        src={LogoFull}
                        alt="STS full logo"
                    /> */}
                </div>
            </Link>
            <nav>
                <ul
                    className="p-4"
                >
                    {
                        ADMIN_NAVS.map((nav, id) => (
                            <li
                                key={id}
                                className={`mb-2 rounded cursor-pointer transition-all ${isActiveRoute(nav.path)}`}
                            >
                                <Link
                                    href={nav.path}
                                    title={nav.title}
                                    className="p-2 inline-block w-full h-full"
                                >
                                    {nav.displayName}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
};

export default SideMenu;