import { CloudinaryUploadWidgetResults } from "next-cloudinary"

export type UploadImageButtonProps = {
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}