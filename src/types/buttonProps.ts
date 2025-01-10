import { Photo } from "@prisma/client";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { IconType } from "react-icons";

export type UploadImageButtonProps = {
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}

export type ThumbsButtonProps = {
    messageId: string;
}

export type DeleteButtonProps = {
    loading: boolean;
    onClick?: () => void;
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

export type EyeToggleButtonProps = {
    isVisible: boolean;
    onClick: () => void;
}

export type ApprovePhotoProps = {
    photoId: string;
}

export type RejectButtonProps = {
    photo: Photo
}

export type AgeSliderButtonProps = {
    defaultValue: number[];
    onChangeEnd: (value: number[]) => void;
}

export type GenderSelectionButtonProps = {
    icon: IconType;
    value: string;
    isSelected: boolean;
    onClick: () => void;
}

export type PhotoSwitchButtonProps = {
    onChange: (event: any) => void;
    defaultSelected?: boolean;
}

export type OrderByFilterButtonProps = {
    orderByList: { label: string; value: string }[];
    selectedKey: string;
    onSelectionChange: (value: any) => void;
}

export type EditUserButtonProps = {
    userId: string;
    onClick: () => void;
}

export type UserMessageToggleButtonProps = {
    memberId: string;
    currentStatus: boolean;
}
