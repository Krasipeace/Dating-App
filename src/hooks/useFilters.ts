import { usePathname, useRouter } from "next/navigation";
import { Selection } from "@nextui-org/react";
import { FaFemale, FaMale } from "react-icons/fa"
import useFilterStore from "./useFilterStore";
import { ChangeEvent, useEffect, useTransition } from "react";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { filters, setFilters } = useFilterStore();
    const { gender, ageRange, orderBy, hasPhoto } = filters;
    const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(state => ({
        pageNumber: state.pagination.pageNumber,
        pageSize: state.pagination.pageSize,
        setPage: state.setPage,
        totalCount: state.pagination.totalCount
    }));

    useEffect(() => {
        if (gender || ageRange || orderBy || hasPhoto) setPage(1);
    }, [gender, ageRange, orderBy, hasPhoto, setPage]);

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams();

            if (gender) searchParams.set("gender", gender.join(","));
            if (ageRange) searchParams.set("ageRange", ageRange.toString());
            if (orderBy) searchParams.set("orderBy", orderBy);
            if (pageSize) searchParams.set("pageSize", pageSize.toString());
            if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());

            searchParams.set("hasPhoto", hasPhoto.toString());

            router.replace(`${pathname}?${searchParams}`);
        });
    }, [gender, ageRange, orderBy, router, pathname, pageSize, pageNumber, hasPhoto]);

    const orderByList = [
        { label: "Last active", value: "updated" },
        { label: "Newest members", value: "created" },
    ]

    const filterByGender = [
        { value: "male", icon: FaMale },
        { value: "female", icon: FaFemale }
    ]

    const handleAgeSelection = (value: number[]) => {
        setFilters("ageRange", value);
    }

    const handleOrderBySelection = (value: Selection) => {
        if (value instanceof Set) setFilters("orderBy", value.values().next().value);
    }

    const handleGenderSelection = (value: string) => {
        if (gender.includes(value)) {
            setFilters("gender", gender.filter(g => g !== value));
        } else {
            setFilters("gender", [...gender, value]);
        }
    }

    const handlePhotoToggleSelection = (p: ChangeEvent<HTMLInputElement>) => {
        setFilters("hasPhoto", p.target.checked);
    }

    return {
        orderByList,
        filterByGender,
        selectAge: handleAgeSelection,
        selectGender: handleGenderSelection,
        selectOrder: handleOrderBySelection,
        selectUsersWithPhoto: handlePhotoToggleSelection,
        filters,
        isPending,
        totalCount
    }
}