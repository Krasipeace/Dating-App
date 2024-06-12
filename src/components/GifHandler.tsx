import { GifHandlerProps } from "@/types/gifHandlerProps";
import Image from "next/image";

export default function GifHandler({ gifUrl, altText = "GIF" }: GifHandlerProps) {
    return (
        <Image src={gifUrl} alt={altText} fill={true} unoptimized={false} />
    );
}
