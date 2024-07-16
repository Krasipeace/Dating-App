import { UserFilters } from "@/types";
import { PaginationResult } from "@/types";
import { MessageDto } from "@/types";

export type FilterState = {
    filters: UserFilters;
    setFilters: (filterName: keyof FilterState["filters"], value: any) => void;
}

export type MessageState = {
    messages: MessageDto[];
    add: (message: MessageDto) => void;
    remove: (id: string) => void;
    set: (message: MessageDto[]) => void;
    unreadCount: number;
    updateUnreadCount: (amount: number) => void;
    resetMessages: () => void;
}

export type PaginationState = {
    pagination: PaginationResult;
    setPagination: (count: number) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

export type PresenceState = {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (id: string[]) => void;
}