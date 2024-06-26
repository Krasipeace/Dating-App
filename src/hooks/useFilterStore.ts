import { FilterState } from "@/types/filterState";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useFilterStore = create<FilterState>()(devtools((set) => ({
    filters: {
        ageRange: [18, 100],
        gender: ["male", "female"],
        orderBy: "updated",
        hasPhoto: true
    },
    setFilters: (filterName, value) => set(state => {
        return {
            filters: { ...state.filters, [filterName]: value }
        }
    })
})));

export default useFilterStore;