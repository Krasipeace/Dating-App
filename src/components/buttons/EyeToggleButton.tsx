import { EyeToggleButtonProps } from "@/types/buttonProps";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * EyeToggleButton component
 * @param {EyeToggleButtonProps} { isVisible, onClick }
 * @returns {JSX.Element} EyeToggleButton component
 * @description EyeToggleButton component to toggle visibility of password
 * @example
 *   <EyeToggleButton isVisible={isVisible} onClick={onClick} />
 * @see EyeToggleButtonProps
 */
export default function EyeToggleButton({ isVisible, onClick }: EyeToggleButtonProps) {
    return (
        <>
            <button
                className="focus:outline-none"
                type="button"
                onClick={onClick}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-describedby="eye-tooltip"
                data-testid="EyeToggleButton"
            >
                {isVisible ? (
                    <FaEyeSlash
                        className="text-2xl  text-neutral-600 pointer-events-none"
                        aria-hidden="true"
                        data-testid="FaEyeSlash"
                    />
                ) : (
                    <FaEye
                        className="text-2xl text-neutral-300 pointer-events-none"
                        aria-hidden="true"
                        data-testid="FaEye"
                    />
                )}
            </button>

            {/* screen readers */}
            <div
                id="eye-tooltip"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    whiteSpace: "nowrap",
                }}
            >
                {isVisible ? "Hide password" : "Show password"}
            </div>
        </>
    )
}