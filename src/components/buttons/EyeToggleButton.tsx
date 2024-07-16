import { EyeToggleButtonProps } from "@/types/buttonProps";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function eyeToggleButton({ isVisible, onClick }: EyeToggleButtonProps) {
    return (
        <button className="focus:outline-none" type="button" onClick={onClick}>
            {isVisible ? (
                <FaEyeSlash className="text-2xl text-neutral-600 pointer-events-none" />
            ) : (
                <FaEye className="text-2xl text-neutral-300 pointer-events-none" />
            )}
        </button>
    )
}