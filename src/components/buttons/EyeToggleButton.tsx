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
export default function eyeToggleButton({ isVisible, onClick }: EyeToggleButtonProps) {
    return (
        <button className="focus:outline-none" type="button" onClick={onClick}>
            {isVisible ? (
                <FaEyeSlash className="text-2xl  text-neutral-600 pointer-events-none" data-testid="FaEyeSlash" />
            ) : (
                <FaEye className="text-2xl text-neutral-300 pointer-events-none" />
            )}
        </button>
    )
}