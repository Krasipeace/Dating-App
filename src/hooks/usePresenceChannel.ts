import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import { updateLastActiveUser } from "@/app/actions/memberActions";
import { PRESENCE_PREFIX, PUSHER_MEMBER_ADDED, PUSHER_MEMBER_REMOVED, PUSHER_SUBSCRIPTION_SUCCESS } from "@/constants/hookConstants";

/**
 * usePresenceChannel hook
 * @param {string | null} userId
 * @param {boolean} profileComplete
 * @returns {void} void
 * @description usePresenceChannel hook to handle presence channel
 * @example
 *   usePresenceChannel(userId, profileComplete)
 */
export const usePresenceChannel = (userId: string | null, profileComplete: boolean) => {
    const { set, add, remove } = usePresenceStore(state => ({
        set: state.set,
        add: state.add,
        remove: state.remove
    }));

    const channelRef = useRef<Channel | null>(null);
    const handleSetMembers = useCallback((memberIds: string[]) => {
        set(memberIds);
    }, [set]);
    const handleAddMember = useCallback((memberId: string) => {
        add(memberId)
    }, [add]);
    const handleRemoveMember = useCallback((memberId: string) => {
        remove(memberId);
    }, [remove]);

    useEffect(() => {
        if (!userId || !profileComplete) return;

        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(PRESENCE_PREFIX);

            channelRef.current.bind(PUSHER_SUBSCRIPTION_SUCCESS, async (members: Members) => {
                handleSetMembers(Object.keys(members.members));
                await updateLastActiveUser();
            });

            channelRef.current.bind(PUSHER_MEMBER_ADDED, (member: Record<string, any>) => {
                handleAddMember(member.id);
            });

            channelRef.current.bind(PUSHER_MEMBER_REMOVED, (member: Record<string, any>) => {
                handleRemoveMember(member.id);
            });
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind(PUSHER_SUBSCRIPTION_SUCCESS, handleSetMembers);
                channelRef.current.unbind(PUSHER_MEMBER_ADDED, handleAddMember);
                channelRef.current.unbind(PUSHER_MEMBER_REMOVED, handleRemoveMember);
            }
        }
    }, [handleSetMembers, handleAddMember, handleRemoveMember, userId, profileComplete]);
}