import { TiDeleteOutline, TiDelete } from "react-icons/ti";
import { ImSpinner2 } from "react-icons/im";
import { DeleteButtonProps } from "@/types/buttonProps";
import { Tooltip } from "@heroui/react";

/**
 * DeleteButton component
 * @param {DeleteButtonProps} { loading }
 * @returns {JSX.Element} DeleteButton component
 * @description DeleteButton component to delete an item
 * @example
 *   <DeleteButton loading={loading} />
 * @see DeleteButtonProps
 */
export default function DeleteButton({ loading }: DeleteButtonProps) {
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer">
            {!loading ? (
                <Tooltip content="Delete" placement="top" aria-live="polite">
                    <button
                        aria-label="Delete"
                    >
                        <TiDeleteOutline
                            size={32}
                            className="fill-white absolute -top-[2px] -right-[2px]"
                            aria-hidden="true"
                            data-testid="TiDeleteOutline"
                        />
                        <TiDelete
                            size={28}
                            className="fill-red-600"
                            aria-hidden="true"
                            data-testid="TiDelete"
                        />
                    </button>
                </Tooltip>
            ) : (
                <ImSpinner2
                    size={32}
                    className="fill-yellow-500 animate-spin"
                    aria-label="Loading"
                    data-testid="ImSpinner2"
                />
            )}
        </div>
    )
}