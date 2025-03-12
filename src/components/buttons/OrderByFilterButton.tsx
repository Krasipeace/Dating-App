"use client";

import { OrderByFilterButtonProps } from "@/types/buttonProps";
import { Select, SelectItem } from "@nextui-org/react";

/**
 * OrderByFilterButton component
 * @param {OrderByFilterButtonProps} { orderByList, selectedKey, onSelectionChange }
 * @returns {JSX.Element} OrderByFilterButton component
 * @description OrderByFilterButton component to display a select button for ordering
 * @example
 *   <OrderByFilterButton orderByList={orderByList} selectedKey={selectedKey} onSelectionChange={onSelectionChange} />
 * @see OrderByFilterButtonProps
 */
export default function OrderByFilterButton({ orderByList, selectedKey, onSelectionChange }: OrderByFilterButtonProps) {
    return (
        <Select
            label="Order by"
            fullWidth
            size="sm"
            variant="bordered"
            color="secondary"
            aria-label="Select order of users"
            selectedKeys={new Set([selectedKey])}
            onSelectionChange={onSelectionChange}
        >
            {orderByList.map(item => (
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>
    );
}
