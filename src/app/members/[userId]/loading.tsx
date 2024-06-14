import { Spinner } from "@nextui-org/react"

export default function Loading() {
    return (
        <div className="flex justify-center items-center vertical-center mt-10">
            <Spinner label="Loading..." color="warning" labelColor="warning" />
        </div>
    )
}