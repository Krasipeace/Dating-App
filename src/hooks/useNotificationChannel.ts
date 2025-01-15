import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import useMessageStore from "./useMessageStore";
import { likeNotification, messageNotification } from "@/components/Notifications";
import { ROUTE_LIKE_NEW, ROUTE_NEW_MESSAGE, ROUTE_PRIVATE_PREFIX } from "@/constants/actionConstants";
import { CONTAINER_OUTBOX, SEARCH_PARAMS_CONTAINER } from "@/constants/hookConstants";

/**
 * useNotificationChannel hook
 * @param {string | null} userId
 * @param {boolean} profileComplete
 * @returns {void} void
 * @description useNotificationChannel hook to handle notifications
 * @example
 *   useNotificationChannel(userId, profileComplete)
 */
export const useNotificationChannel = (userId: string | null, profileComplete: boolean) => {
    const channelRef = useRef<Channel | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { add, updateUnreadCount } = useMessageStore(state => ({
        add: state.add,
        updateUnreadCount: state.updateUnreadCount
    }));

    const handleNewMessage = useCallback((message: MessageDto) => {
        if (pathname === "/messages" && searchParams.get(SEARCH_PARAMS_CONTAINER) !== CONTAINER_OUTBOX) {
            add(message);
            updateUnreadCount(1);
        } else if (pathname !== `/members/${message.senderId}/chat`) {
            messageNotification(message);
            updateUnreadCount(1);
        }
    }, [add, updateUnreadCount, pathname, searchParams]);

    const handleNewLike = useCallback((data: { name: string, image: string | null, userId: string }) => {
        likeNotification(data.name, data.image, data.userId);
    }, []);

    useEffect(() => {
        if (!userId || !profileComplete) return;

        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(`${ROUTE_PRIVATE_PREFIX}${userId}`);
            channelRef.current.bind(ROUTE_NEW_MESSAGE, handleNewMessage);
            channelRef.current.bind(ROUTE_LIKE_NEW, handleNewLike);
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind(ROUTE_NEW_MESSAGE, handleNewMessage);
                channelRef.current.unbind(ROUTE_LIKE_NEW, handleNewLike);
                channelRef.current = null;
            }
        }
    }, [userId, handleNewMessage, handleNewLike, profileComplete]);
}