import { MESSAGE_STORE } from "@/constants/hookConstants";
import { MessageState } from "@/types/states";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * useMessageStore hook
 * @returns {Object} MessageState object
 * @description useMessageStore hook to handle messages
 * @example
 *   const { messages, add, remove, set, unreadCount, updateUnreadCount, resetMessages } = useMessageStore()
 */
const useMessageStore = create<MessageState>()(devtools((set) => ({
    messages: [],
    add: (message) => set(state => ({ messages: [message, ...state.messages] })),
    remove: (id) => set(state => ({ messages: state.messages.filter(message => message.id !== id) })),
    set: (messages) => set(state => {
        const map = new Map([...state.messages, ...messages].map(m => [m.id, m]));
        const uniqueMessages = Array.from(map.values());
        return { messages: uniqueMessages }
    }),
    unreadCount: 0,
    updateUnreadCount: (amount: number) => set(state => ({ unreadCount: state.unreadCount + amount })),
    resetMessages: () => set({ messages: [] })
}), { name: MESSAGE_STORE }));

export default useMessageStore;