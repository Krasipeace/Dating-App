import { Button, Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import NavLink from "./NavLink";
import { GiHalfHeart } from "react-icons/gi";

export default function TopNav() {
    return (
        <Navbar
            maxWidth="xl"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
            classNames={{
                item: [
                    "text-xl",
                    "text-white",
                    "uppercase",
                    "data-[active=true]:text-yellow-200"
                ]
            }}
        >
            <NavbarBrand as={Link} href="/">
                <GiHalfHeart size={50} className="text-orange-400" />
                <div className="font-bold text-3xl flex">
                    <span className="text-red-900">Heart</span>
                    <span className="text-orange-400">Bound</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavLink href="/members" label="People" />
                <NavLink href="/likes" label="Likes" />
                <NavLink href="/messages" label="Messages" />
            </NavbarContent>
            <NavbarContent justify="end">
                <Button as={Link} href="/auth/login" variant="bordered" className="text-green-100">Login</Button>
                <Button as={Link} href="/auth/register" variant="bordered" className="text-green-100">Register</Button>
            </NavbarContent>
        </Navbar>
    )
}