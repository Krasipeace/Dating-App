import { Session } from "next-auth"

export type UserMenuProps = {
    user: Session["user"]
}