"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import useMessageStore from "@/hooks/useMessageStore";
import { getUnreadMessageCount } from "@/app/actions/messageActions";
import { SessionProvider } from "next-auth/react";
import { CookieConsentProvider } from "@/hooks/useCookieConsent";

/**
 * Providers component
 * @param {ReactNode} children
 * @param {string | null} userId
 * @param {boolean} profileComplete
 * @returns {JSX.Element} Providers component
 * @description Providers component to wrap the app with providers
 * @example
 *   <Providers userId={userId} profileComplete={profileComplete}>
 *       {children}
 *   </Providers>
 */
export default function Providers({ children, userId, profileComplete }: { children: ReactNode, userId: string | null, profileComplete: boolean }) {
    const isUnreadCountSet = useRef(false);

    const { updateUnreadCount } = useMessageStore(state => ({
        updateUnreadCount: state.updateUnreadCount
    }));

    const setUnreadCount = useCallback((amount: number) => {
        updateUnreadCount(amount);
    }, [updateUnreadCount]);

    useEffect(() => {
        if (!isUnreadCountSet.current && userId) {
            getUnreadMessageCount().then(count => {
                setUnreadCount(count)
            });
        }
        isUnreadCountSet.current = true;
    }, [setUnreadCount, userId]);

    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete);

    return (
        <CookieConsentProvider>
            <SessionProvider>
                <NextUIProvider>
                    <ToastContainer position="bottom-right" className="z-50" pauseOnHover />
                    {children}
                </NextUIProvider>
            </SessionProvider>
        </CookieConsentProvider>
    )
}