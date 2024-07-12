import { Spinner } from "@nextui-org/react";

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