"use client";

import { Button, Select, SelectItem, Selection, Slider } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFemale, FaMale } from "react-icons/fa"

export default function Filters() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const orderByList = [
        { label: "Last active", value: "updated" },
        { label: "Newest members", value: "created" }
    ]

    const filterByGender = [
        { value: "male", icon: FaMale },
        { value: "female", icon: FaFemale }
    ]

    const selectedGender = searchParams.get("gender")?.split(",") || ["male", "female"];

    const handleAgeSelection = (value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set("ageRange", value.join(","));
        router.replace(`${pathname}?${params}`);
    }

    const handleOrderBySelection = (value: Selection) => {
        if (value instanceof Set) {
            const params = new URLSearchParams;
            params.set("orderBy", value.values().next().value);
            router.replace(`${pathname}?${params}`);
        }
    }

    const handleGenderSelection = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (selectedGender.includes(value)) {
            params.set("gender", selectedGender.filter(g => g !== value).toString());
        } else {
            params.set("gender", [...selectedGender, value].toString());
        }

        router.replace(`${pathname}?${params}`);
    }

    if (pathname !== "/members") return null;

    return (
        <div className="shadow-md py-2">
            <div className="flex flex-row justify-around items-center">
                <div className="text-secondary font-semibold text-xl">Results: </div>
                <div className="flex gap-2 items-center">
                    <div>Gender: </div>
                    {filterByGender.map(({ icon: Icon, value }) => (
                        <Button
                            key={value}
                            size="sm"
                            isIconOnly
                            color={selectedGender.includes(value) ? "secondary" : "default"}
                            onClick={() => handleGenderSelection(value)}
                        >
                            <Icon size={24} />
                        </Button>
                    ))}
                </div>
                <div className="flex flex-row items-center gap-2 w-1/4">
                    <Slider
                        label="Age range"
                        color="secondary"
                        size="sm"
                        minValue={18}
                        maxValue={100}
                        defaultValue={[18, 100]}
                        onChangeEnd={(value) => handleAgeSelection(value as number[])}
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        label="Order by"
                        fullWidth
                        size="sm"
                        variant="bordered"
                        color="secondary"
                        aria-label="Order by selector"
                        selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
                        onSelectionChange={handleOrderBySelection}
                    >
                        {orderByList.map(item => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}