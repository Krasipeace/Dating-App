"use client";

import { PhotoSwitchButtonProps } from "@/types/buttonProps";
import { Switch } from "@heroui/react";

/**
 * PhotoSwitchButton component
 * @param {PhotoSwitchButtonProps} { onChange, defaultSelected = true }
 * @returns {JSX.Element} PhotoSwitchButton component
 * @description PhotoSwitchButton component to display a switch button for photo selection
 * @example
 *   <PhotoSwitchButton onChange={onChange} defaultSelected={defaultSelected} />
 * @see PhotoSwitchButtonProps
 */
export default function PhotoSwitchButton({ onChange, defaultSelected = true }: PhotoSwitchButtonProps) {
    return (
        <Switch
            defaultSelected={defaultSelected}
            aria-label="Switch photo selection"
            color="secondary"
            size="sm"
            onChange={onChange}
        />
    );
}