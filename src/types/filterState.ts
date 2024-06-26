import { UserFilters } from "@/types"

export type FilterState = {
    filters: UserFilters;
    setFilters: (filterName: keyof FilterState["filters"], value: any) => void;
}