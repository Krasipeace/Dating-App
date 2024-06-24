import { MessageState } from "@/types/messageState";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMessageStore = create<MessageState>()(devtools((set) => ({
    messages: [],
    add: (message) => set(state => ({ messages: [message, ...state.messages] })),
    remove: (id) => set(state => ({ messages: state.messages.filter(message => message.id !== id) })),
    set: (messages) => set({ messages }),
    unreadCount: 0,
    updateUnreadCount: (amount: number) => set(state => ({ unreadCount: state.unreadCount + amount }))
}), { name: "messageStore" }));

export default useMessageStore;