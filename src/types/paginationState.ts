import { PaginationResult } from "@/types"

export type PaginationState = {
    pagination: PaginationResult;
    setPagination: (count: number) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}