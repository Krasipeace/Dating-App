import { Session } from "next-auth"

export type UserMenuProps = {
    userInfo: {
        name: string | null;
        image: string | null;
    } | null;
}