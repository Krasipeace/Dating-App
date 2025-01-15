"use client";

import { AgeSliderButtonProps as AgeSliderButtonProps } from "@/types/buttonProps";
import { Slider } from "@nextui-org/react";

/**
 * AgeSliderButton component
 * @param {AgeSliderButtonProps} { defaultValue, onChangeEnd }
 * @returns {JSX.Element} AgeSliderButton component
 * @description AgeSliderButton component to display a slider for age selection
 * @example
 *   <AgeSliderButton defaultValue={[18, 100]} onChangeEnd={onChangeEnd} />
 * @see AgeSliderButtonProps
 */
export default function AgeSliderButton({ defaultValue, onChangeEnd }: AgeSliderButtonProps) {
    const minAgeValue = 18;
    const maxAgeValue = 100;

    return (
        <Slider
            label="Age range"
            aria-label="Slider selection for age between 18 and 100"
            color="secondary"
            size="sm"
            minValue={minAgeValue}
            maxValue={maxAgeValue}
            defaultValue={defaultValue}
            onChangeEnd={(value) => onChangeEnd(value as number[])}
        />
    );
}