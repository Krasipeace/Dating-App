"use client";

import UniversalWrapper from "@/components/UniversalWrapper";
import { useRouter } from "next/navigation";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function RegisterSuccessPage() {
    const router = useRouter();
    
    return (
        <UniversalWrapper
            headerText="You registered successfuly"
            subHeaderText="Check your email to verify your registration, so you can login"
            actionLabel="Login now"
            action={() => router.push("/login")}
            headerIcon={FaRegCircleCheck}
        />
    )
}