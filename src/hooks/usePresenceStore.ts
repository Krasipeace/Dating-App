import { PRESENCE_STORE } from "@/constants/hookConstants";
import { PresenceState } from "@/types/states";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePresenceStore = create<PresenceState>()(devtools((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) => set((state) => ({ members: state.members.filter(member => member !== id) })),
    set: (ids => set({ members: ids }))
}), { name: PRESENCE_STORE }));

export default usePresenceStore;