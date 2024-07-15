import { CloudinaryUploadWidgetResults } from "next-cloudinary";

export type UploadImageButtonProps = {
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}

export type ThumbsButtonProps = {
    messageId: string;
}

export type DeleteButtonProps = {
    loading: boolean;
}

export type LikeButtonProps = {
    loading: boolean;
    hasLiked: boolean;
    toggleLike: () => void;
}

export type StarButtonProps = {
    selected: boolean;
    loading: boolean;
}