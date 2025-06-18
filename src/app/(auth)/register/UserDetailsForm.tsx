"use client";

import EyeToggleButton from "@/components/buttons/EyeToggleButton";
import { Input } from "@heroui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdEmail, MdOutlinePermIdentity } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

export default function UserDetailsForm() {
    const { register, getValues, formState: { errors } } = useFormContext();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="space-y-4">
            <Input
                startContent={
                    <MdOutlinePermIdentity className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name"
                variant="bordered"
                {...register("name")}
                defaultValue={getValues("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
            />
            <Input
                startContent={
                    <MdEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                variant="bordered"
                {...register("email")}
                defaultValue={getValues("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
            />
            <Input
                startContent={
                    <PiPasswordBold className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                variant="bordered"
                {...register("password")}
                defaultValue={getValues("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
                type={isVisible ? "text" : "password"}
                endContent={
                    <EyeToggleButton isVisible={isVisible} onClick={toggleVisibility} />
                }
            />
        </div>
    )
}