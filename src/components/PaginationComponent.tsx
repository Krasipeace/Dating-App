"use client";

import { useEffect } from "react";
import { Pagination } from "@heroui/react";
import usePaginationStore from "@/hooks/usePaginationStore";

/**
 * PaginationComponent component
 * @param {number} totalCount
 * @returns {JSX.Element} PaginationComponent component
 * @description PaginationComponent component to display pagination
 * @example
 *   <PaginationComponent totalCount={totalCount} />
 */
export default function PaginationComponent({ totalCount }: { totalCount: number }) {
    const { setPage, setPageSize, setPagination, pagination } = usePaginationStore(state => ({
        setPage: state.setPage,
        setPageSize: state.setPageSize,
        setPagination: state.setPagination,
        pagination: state.pagination
    }));

    const { pageNumber, pageSize, totalPages } = pagination;
    const pageThreeSelector = 3;
    const pageSixSelector = 6;
    const pageTwelveSelector = 12;

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
                    aria-label="Pagination navigation"
                />
                <div className="flex flex-row gap-1 items-center">
                    Show per page:
                    {[pageThreeSelector, pageSixSelector, pageTwelveSelector].map(size => (
                        <div
                            key={size}
                            className={`${pageSize === size
                                ? "pagination-component bg-secondary text-white hover:bg-secondary hover:text-white"
                                : "pagination-component"}`
                            }
                            onClick={() => setPageSize(size)}
                            aria-label={`Click to show ${size} per page`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}