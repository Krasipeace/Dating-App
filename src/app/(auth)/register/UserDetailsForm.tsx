"use client";

import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function UserDetailsForm() {
    const { register, getValues, formState: { errors } } = useFormContext();
    return (
        <div className="space-y-4">
            <Input
                label="Name"
                variant="bordered"
                {...register("name")}
                defaultValue={getValues("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
            />
            <Input
                label="Email"
                variant="bordered"
                {...register("email")}
                defaultValue={getValues("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
            />
            <Input
                label="Password"
                variant="bordered"
                {...register("password")}
                type="password"
                defaultValue={getValues("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
            />
        </div>
    )
}