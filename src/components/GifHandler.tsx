import { GifHandlerProps } from "@/types/uiProps";
import Image from "next/image";

export default function GifHandler({ gifUrl, altText = "GIF" }: GifHandlerProps) {
    return (
        <Image src={gifUrl} alt={altText} fill={true} unoptimized={true} />
    );
}
