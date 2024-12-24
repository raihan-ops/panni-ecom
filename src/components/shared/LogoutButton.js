"use client";

import {useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import Spinner from "@/components/shared/Spinner";

const LogoutButton = () => {

    const {data: session, status} = useSession();

    const [loading, setLoading] = useState(false);

    const logout = async () => {

        try {
            setLoading(true);
            await signOut();
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }

    }

    return (
        <button
            className="default-btn py-2 px-4 text-white border hover:bg-white hover:text-black"
            onClick={logout}
            disabled={loading || status === "loading"}

        >
            {
                loading || status === "loading" && <Spinner/>
            }
            Logout
        </button>
    );
};

export default LogoutButton;