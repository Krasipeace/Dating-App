import { usePathname, useRouter } from "next/navigation";
import { Selection } from "@heroui/react";
import { FaFemale, FaMale } from "react-icons/fa"
import useFilterStore from "./useFilterStore";
import { ChangeEvent, useEffect, useTransition } from "react";
import usePaginationStore from "./usePaginationStore";
import { GENDER_FEMALE, GENDER_MALE, LABEL_LAST_ACTIVE, LABEL_NEW_MEMBERS, LABEL_IN_SAME_CITY, LABEL_IN_SAME_COUNTRY, ORDER_BY_CREATED, ORDER_BY_UPDATED, FILTER_BY_CITY, FILTER_BY_COUNTRY, SEARCH_PARAMS_AGE_RANGE, SEARCH_PARAMS_GENDER, SEARCH_PARAMS_HAS_PHOTO, SEARCH_PARAMS_ORDER_BY, SEARCH_PARAMS_PAGE_NUMBER, SEARCH_PARAMS_PAGE_SIZE } from "@/constants/hookConstants";

/**
 * useFilters hook
 * @returns {Object} Filters object
 * @description useFilters hook to handle filters
 * @example
 *   const { orderByList, filterByGender, selectAge, selectGender, selectOrder, selectUsersWithPhoto, filters, isPending, totalCount } = useFilters()
 */
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

            if (gender) searchParams.set(SEARCH_PARAMS_GENDER, gender.join(","));
            if (ageRange) searchParams.set(SEARCH_PARAMS_AGE_RANGE, ageRange.toString());
            if (orderBy) searchParams.set(SEARCH_PARAMS_ORDER_BY, orderBy);
            if (pageSize) searchParams.set(SEARCH_PARAMS_PAGE_SIZE, pageSize.toString());
            if (pageNumber) searchParams.set(SEARCH_PARAMS_PAGE_NUMBER, pageNumber.toString());

            searchParams.set(SEARCH_PARAMS_HAS_PHOTO, hasPhoto.toString());

            router.replace(`${pathname}?${searchParams}`);
        });
    }, [gender, ageRange, orderBy, router, pathname, pageSize, pageNumber, hasPhoto]);

    const orderByList = [
        { label: LABEL_LAST_ACTIVE, value: ORDER_BY_UPDATED },
        { label: LABEL_NEW_MEMBERS, value: ORDER_BY_CREATED },
        { label: LABEL_IN_SAME_CITY, value: FILTER_BY_CITY },
        { label: LABEL_IN_SAME_COUNTRY, value: FILTER_BY_COUNTRY },
    ]

    const filterByGender = [
        { value: GENDER_MALE, icon: FaMale },
        { value: GENDER_FEMALE, icon: FaFemale }
    ]

    const handleAgeSelection = (value: number | number[]) => {
        setFilters(SEARCH_PARAMS_AGE_RANGE, value);
    }

    const handleOrderBySelection = (value: Selection) => {
        if (value instanceof Set) setFilters(SEARCH_PARAMS_ORDER_BY, value.values().next().value);
    }

    const handleGenderSelection = (value: string) => {
        if (gender.includes(value)) {
            setFilters(SEARCH_PARAMS_GENDER, gender.filter(g => g !== value));
        } else {
            setFilters(SEARCH_PARAMS_GENDER, [...gender, value]);
        }
    }

    const handlePhotoToggleSelection = (p: ChangeEvent<HTMLInputElement>) => {
        setFilters(SEARCH_PARAMS_HAS_PHOTO, p.target.checked);
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