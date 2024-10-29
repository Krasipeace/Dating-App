import { GENDER_FEMALE, GENDER_MALE, ORDER_BY_UPDATED } from "@/constants/hookConstants";
import { FilterState } from "@/types/states";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useFilterStore = create<FilterState>()(devtools((set) => ({
    filters: {
        ageRange: [18, 100],
        gender: [GENDER_MALE, GENDER_FEMALE],
        orderBy: ORDER_BY_UPDATED,
        hasPhoto: true
    },
    setFilters: (filterName, value) => set(state => {
        return {
            filters: { ...state.filters, [filterName]: value }
        }
    })
})));

export default useFilterStore;