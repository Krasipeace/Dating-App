import { calculateAge } from "@/lib/util";
import { MemberCardProps } from "@/types/memberCardProps";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

export default function memberCard({ member }: MemberCardProps) {
    return (
        <Card
            fullWidth
            as={Link}
            href={`/members/${member.userId}`}
        >
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={member.image || "/images/user.png"}
                className="aspect-square object-cover"
            />
            <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
                <div className="flex flex-col text-white">
                    <span className="font-semibold">{member.name}, {calculateAge(member.birthDate)}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}