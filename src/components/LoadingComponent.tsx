import { Spinner } from "@nextui-org/react";

/**
 * LoadingComponent component
 * @param {string} label
 * @returns {JSX.Element} LoadingComponent component
 * @description LoadingComponent component to display a loading spinner
 * @example
 *   <LoadingComponent label="Loading..." />
 */
export default function LoadingComponent({ label }: { label?: string }) {
    return (
        <div className="flex justify-center items-center pt-60">
            <Spinner
                label={label || "Loading..."}
                color="warning"
                labelColor="warning"
            />
        </div>
    )
}