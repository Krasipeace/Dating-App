import { GifHandlerProps } from "@/types/uiProps";
import Image from "next/image";

/**
 * GifHandler component
 * @param {GifHandlerProps} { gifUrl, altText }
 * @returns {JSX.Element} GifHandler component
 * @description GifHandler component to display a GIF
 * @example
 *   <GifHandler gifUrl={gifUrl} altText={altText} />
 * @see GifHandlerProps
 */
export default function GifHandler({ gifUrl, altText = "GIF" }: GifHandlerProps) {
    return (
        <Image src={gifUrl} alt={altText} fill={true} unoptimized={true} />
    );
}
