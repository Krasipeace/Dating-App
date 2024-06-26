"use client";

import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination } from "@nextui-org/react";
import { useEffect } from "react";

export default function PaginationComponent({ totalCount }: { totalCount: number }) {
    const { setPage, setPageSize, setPagination, pagination } = usePaginationStore(state => ({
        setPage: state.setPage,
        setPageSize: state.setPageSize,
        setPagination: state.setPagination,
        pagination: state.pagination
    }));

    const { pageNumber, pageSize, totalPages } = pagination;

    useEffect(() => {
        setPagination(totalCount);
    }, [setPagination, totalCount]);

    const start = (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize, totalCount);
    const resultString = `Showing ${start}-${end} of ${totalCount} results`;

    return (
        <div className="border-t-2 w-full mt-5">
            <div className="flex flex-row justify-between items-center py-5">
                <div>{resultString}</div>
                <Pagination
                    page={pageNumber}
                    total={totalPages}
                    color="secondary"
                    variant="bordered"
                    onChange={setPage}
                />
                <div className="flex flex-row gap-1 items-center">
                    Show per page:
                    {[3, 6, 12].map(size => (
                        <div
                            key={size}
                            className={`${pageSize === size ? "pagination-component bg-secondary text-white hover:bg-secondary hover:text-white" : "pagination-component"}`}
                            onClick={() => setPageSize(size)}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}