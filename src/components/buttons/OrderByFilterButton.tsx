"use client";

import { OrderByFilterButtonProps } from "@/types/buttonProps";
import { Select, SelectItem } from "@nextui-org/react";

export default function OrderByFilterButton({ orderByList, selectedKey, onSelectionChange }: OrderByFilterButtonProps) {
    return (
        <Select
            label="Order by"
            fullWidth
            size="sm"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
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
