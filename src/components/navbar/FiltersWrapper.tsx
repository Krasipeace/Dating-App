"use client";

import { usePathname } from "next/navigation";
import Filters from "./Filters";

/**
 * FiltersWrapper component
 * @returns {JSX.Element} FiltersWrapper component
 * @description FiltersWrapper component to wrap the Filters component
 * @example
 *   <FiltersWrapper />
 */
export default function FiltersWrapper() {
    const pathname = usePathname();

    if (pathname === "/members") return <Filters />
    else return null;
}