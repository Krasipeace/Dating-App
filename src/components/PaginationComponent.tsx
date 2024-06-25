"use client";

import { Pagination } from "@nextui-org/react";
import { useState } from "react";

export default function PaginationComponent() {
    const [active, setActive] = useState(3);

    return (
        <div className="border-t-2 w-full mt-5">
            <div className="flex flex-row justify-between items-center py-5">
                <div>Showing x of size members</div>
                <Pagination
                    initialPage={1}
                    total={20}
                    color="secondary"
                    variant="bordered"
                />
                <div className="flex flex-row gap-1 items-center">
                    Members per page:
                    {[3, 6, 12].map(size => (
                        <div key={size} className={`${active === size ? "pagination-component bg-secondary text-white hover:bg-secondary hover:text-white" : "pagination-component"}`}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}