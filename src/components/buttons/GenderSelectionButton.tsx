// components/GenderButton.tsx

"use client";

import { GenderSelectionButtonProps } from "@/types/buttonProps";
import { Button } from "@nextui-org/react";

export default function GenderSelectionButton({ icon: Icon, value, isSelected, onClick }: GenderSelectionButtonProps) {
    return (
        <Button
            size="sm"
            isIconOnly
            color={isSelected ? "secondary" : "default"}
            onClick={onClick}
        >
            <Icon size={24} />
        </Button>
    );
}
