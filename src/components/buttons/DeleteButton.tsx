import { DeleteButtonProps } from "@/types/deleteButtonProps";
import { TiDeleteOutline, TiDelete } from "react-icons/ti";
import { ImSpinner2 } from "react-icons/im";

export default function DeleteButton({ loading }: DeleteButtonProps) {
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer">
            {!loading ? (
                <>
                    <TiDeleteOutline size={32} className="fill-white absolute -top-[2px] -right-[2px]" />
                    <TiDelete size={28} className="fill-red-600" />
                </>
            ) : (
                <>
                    <ImSpinner2 size={32} className="fill-yellow-500 animate-spin" />
                </>
            )}
        </div>
    )
}