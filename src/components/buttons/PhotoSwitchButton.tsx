"use client";

import { PhotoSwitchButtonProps } from "@/types/buttonProps";
import { Switch } from "@nextui-org/react";

export default function PhotoSwitchButton({ onChange, defaultSelected = true }: PhotoSwitchButtonProps) {
    return (
        <Switch
            defaultSelected={defaultSelected}
            color="secondary"
            size="sm"
            onChange={onChange}
        />
    );
}