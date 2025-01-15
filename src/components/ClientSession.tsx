"use client";

import { useSession } from "next-auth/react";
import GifHandler from "./GifHandler";

/**
 * ClientSession component
 * @returns {JSX.Element} ClientSession component
 * @description ClientSession component to display the client session data
 * @example
 *   <ClientSession />
 */
export default function ClientSession() {
    const session = useSession();

    return (
        <div className="bg-rose-50 p-10 rounded-3xl shadow-md w-1/2 overflow-auto">
            <h2 className="text-2xl font-semibold">Client session data:</h2>
            {session ? (
                <div>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
            ) : (
                <div>
                    <GifHandler gifUrl="https://i.imgur.com/Jw7WhXd.gif" altText="front-page-image" width="1152" height="648" />
                </div>
            )}
        </div>
    )
}