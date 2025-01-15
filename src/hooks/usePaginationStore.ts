import { PAGINATION_STORE } from "@/constants/hookConstants";
import { PaginationState } from "@/types/states";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * usePaginationStore hook
 * @returns {Object} PaginationState object
 * @description usePaginationStore hook to handle pagination
 * @example
 *   const { pagination, setPagination, setPage, setPageSize } = usePaginationStore();
 *   setPagination(100);
 *   setPage(2);
 *   setPageSize(20);
 * @see PaginationState
 */
const usePaginationStore = create<PaginationState>()(devtools((set) => ({
    pagination: {
        pageNumber: 1,
        pageSize: 12,
        totalCount: 0,
        totalPages: 1
    },
    setPagination: (totalCount: number) => set(state => ({
        pagination: {
            pageNumber: 1,
            pageSize: state.pagination.pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / state.pagination.pageSize)
        }
    })),
    setPage: (page: number) => {
        set(state => ({
            pagination: {
                ...state.pagination,
                pageNumber: page
            }
        }))
    },
    setPageSize: (pageSize: number) => {
        set(state => ({
            pagination: {
                ...state.pagination,
                pageSize: pageSize,
                pageNumber: 1,
                totalPages: Math.ceil(state.pagination.totalCount / pageSize)
            }
        }))
    },
}), { name: PAGINATION_STORE }));

export default usePaginationStore;