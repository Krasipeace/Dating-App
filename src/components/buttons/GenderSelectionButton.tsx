"use client";

import { GenderSelectionButtonProps } from "@/types/buttonProps";
import { Button, Tooltip } from "@heroui/react";

export default function GenderSelectionButton({ icon: Icon, value, isSelected, onClick }: GenderSelectionButtonProps) {
    return (
        <>
            <Tooltip content={value} placement="top" aria-live="polite">
                <Button
                    size="md"
                    isIconOnly
                    color={isSelected ? "secondary" : "default"}
                    onClick={onClick}
                    aria-label={value}
                    aria-describedby="tooltip-text"
                >
                    <Icon size={24} aria-hidden="true" />
                </Button>
            </Tooltip>

            {/* screen readers */}
            <div
                id="tooltip-text"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    whiteSpace: "nowrap",
                }}
            >
                {value}
            </div>
        </>
    );
}
