"use client";

import { AgeSliderButtonProps as AgeSliderButtonProps } from "@/types/buttonProps";
import { Slider } from "@nextui-org/react";

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