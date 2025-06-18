"use client";

import { Spinner } from "@heroui/react";
import { useFilters } from "@/hooks/useFilters";
import AgeSliderButton from "../buttons/AgeSliderButton";
import GenderSelectionButton from "../buttons/GenderSelectionButton";
import PhotoSwitchButton from "../buttons/PhotoSwitchButton";
import OrderByFilterButton from "../buttons/OrderByFilterButton";

/**
 * Filters component
 * @returns {JSX.Element} Filters component
 * @description Filters component to display filters for members page
 * @example
 *   <Filters />
 */
export default function Filters() {
    const { orderByList, filterByGender, selectAge, selectGender, selectOrder, selectUsersWithPhoto, filters, isPending, totalCount } = useFilters();

    return (
        <div className="shadow-md py-2">
            <div className="flex flex-row justify-around items-center">
                <div className="flex gap-2 items-center">
                    <div className="text-secondary font-semibold text-xl">
                        Results: {isPending ? <Spinner size='sm' color='secondary' /> : totalCount}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm">Photo</p>
                    <PhotoSwitchButton onChange={selectUsersWithPhoto} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>Gender: </div>
                    {filterByGender.map(({ icon, value }) => (
                        <GenderSelectionButton
                            key={value}
                            icon={icon}
                            value={value}
                            isSelected={filters.gender.includes(value)}
                            onClick={() => selectGender(value)}
                        />
                    ))}
                </div>
                <div className="flex flex-row items-center gap-2 w-1/4">
                    <AgeSliderButton 
                        defaultValue={filters.ageRange}
                        onChangeEnd={selectAge}
                    />
                </div>
                <div className="w-1/6">
                    <OrderByFilterButton
                        orderByList={orderByList}
                        selectedKey={filters.orderBy}
                        onSelectionChange={selectOrder}
                    />
                </div>
            </div>
        </div>
    )
}