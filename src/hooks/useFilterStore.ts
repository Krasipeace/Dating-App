import { GENDER_FEMALE, GENDER_MALE, ORDER_BY_UPDATED } from "@/constants/hookConstants";
import { FilterState } from "@/types/states";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/** 
 * useFilterStore hook
 * @returns {Object} FilterState object
 * @description useFilterStore hook to handle filters
 * @example
 *  const { filters, setFilters } = useFilterStore();
 *  setFilters("ageRange", [18, 100]);
 * @see FilterState
 * */
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