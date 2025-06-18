"use client";

import { AgeSliderButtonProps as AgeSliderButtonProps } from "@/types/buttonProps";
import { Slider } from "@heroui/react";
import { useState } from "react";

/**
 * AgeSliderButton component
 * @param {AgeSliderButtonProps} { defaultValue, onChangeEnd }
 * @returns {JSX.Element} AgeSliderButton component
 * @description AgeSliderButton component to display a slider for age selection
 * @example
 *   <AgeSliderButton defaultValue={[18, 100]} onChangeEnd={onChangeEnd} />
 * @see AgeSliderButtonProps
 */
export default function AgeSliderButton({ defaultValue, minValue = 18, maxValue = 100, onChange, onChangeEnd }: AgeSliderButtonProps) {
    const [selectedValue, setSelectedValue] = useState<number | number[]>(defaultValue);

    return (
        <>
            <Slider
                label="Age range"
                aria-label="Select age range"
                title={`Selected age range: ${Array.isArray(selectedValue) ? `${selectedValue[0]} to ${selectedValue[1]}` : selectedValue}`}
                color="secondary"
                size="md"
                minValue={minValue}
                maxValue={maxValue}
                defaultValue={defaultValue}
                onChange={(value) => {
                    setSelectedValue(value as number | number[]);
                    if (onChange) onChange(value as number | number[]);
                }}
                onChangeEnd={(value) => onChangeEnd(value as number[])}
                data-testid="AgeSliderButton"
            />

            {/* screen readers */}
            <div
                id="age-range-label"
                aria-live="polite"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    whiteSpace: "nowrap",
                }}
            >
                {`Selected age range: ${Array.isArray(selectedValue)
                    ? `${selectedValue[0]} to ${selectedValue[1]}`
                    : selectedValue}`
                }
            </div>
        </>
    );
}