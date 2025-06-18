import { StarButtonProps } from "@/types/buttonProps";
import { Tooltip } from "@heroui/react";
import { GoStar, GoStarFill } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";

/**
 * StarButton component
 * @param {StarButtonProps} { selected, loading }
 * @returns {JSX.Element} StarButton component
 * @description StarButton component to display a star button
 * @example
 *   <StarButton selected={selected} loading={loading} />
 * @see StarButtonProps
 */
export default function StarButton({ selected, loading }: StarButtonProps) {
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer">
            {!loading ? (
                <Tooltip content={selected ? "Selected as avatar" : "Set as profile image"} placement="top" aria-live="polite">
                    <button
                        aria-label={selected ? "Selected as avatar" : "Set as profile image"}
                        aria-describedby="tooltip-text"
                        className="relative"
                    >
                        <GoStar
                            size={32}
                            className="fill-white absolute -top-[2px] -right-[2px]"
                            aria-hidden="true"
                            data-testid="GoStar"
                        />
                        <GoStarFill
                            size={28}
                            className={selected ? "fill-orange-300" : "fill-neutral-500/70"}
                            aria-hidden="true"
                            data-testid="GoStarFill"
                        />
                    </button>
                </Tooltip>
            ) : (
                <div aria-live="polite">
                    <ImSpinner2 size={32} className="fill-yellow-500 animate-spin" data-testid="ImSpinner2" />
                </div>
            )}
        </div>
    );
}