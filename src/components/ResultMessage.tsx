import { ResultMessageProps } from "@/types/uiProps";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";

/**
 * ResultMessage component
 * @param {ResultMessageProps} { result }
 * @returns {JSX.Element | null} ResultMessage component or null if no result
 * @description ResultMessage component to display a success or error message
 * @example
 *   <ResultMessage result={result} />
 * @see ResultMessageProps
 */
export default function ResultMessage({ result }: ResultMessageProps) {
    if (!result) return null;

    return (
        <div className={`p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm ${result.status === 'error'
            ? 'text-danger-800 bg-danger-50'
            : 'text-success-800 bg-success-50'
            }`}
        >
            {result.status === "success" ? (
                <FaCheckCircle size={20} aria-label="Icon with positive feedback" aria-hidden="true" />
            ) : (
                <FaCircleExclamation size={20} aria-label="Icon with warning feedback" aria-hidden="true" />
            )}
            <p>
                {result.status === 'success' ? result.data : result.error as string}
            </p>
        </div>
    )
}