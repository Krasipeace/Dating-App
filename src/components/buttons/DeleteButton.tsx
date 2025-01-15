import { TiDeleteOutline, TiDelete } from "react-icons/ti";
import { ImSpinner2 } from "react-icons/im";
import { DeleteButtonProps } from "@/types/buttonProps";

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
                <>
                    <TiDeleteOutline size={32}
                        data-testid="TiDeleteOutline" className="fill-white absolute -top-[2px] -right-[2px]" />
                    <TiDelete size={28} data-testid="TiDelete" className="fill-red-600" />
                </>
            ) : (
                <>
                    <ImSpinner2 size={32}
                        data-testid="ImSpinner2" className="fill-yellow-500 animate-spin" />
                </>
            )}
        </div>
    )
}