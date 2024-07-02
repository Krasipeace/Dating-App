"use client";

import { resetPassword, resetPasswordEmail } from "@/app/actions/authActions";
import ResultMessage from "@/components/ResultMessage";
import UniversalWrapper from "@/components/UniversalWrapper";
import { ForgotPasswordSchema, forgotPasswordSchema } from "@/lib/schemas/forgotPasswordSchema";
import { ActionResult } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form"
import { GiHouseKeys } from "react-icons/gi";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const { register, reset, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<ForgotPasswordSchema>({
        mode: "onTouched",
        resolver: zodResolver(forgotPasswordSchema)
    });

    const [result, setResult] = useState<ActionResult<string> | null>(null);

    const onSubmit = async (data: FieldValues) => {
        setResult(await resetPassword(data.password, searchParams.get("token")));
        reset();
    }

    return (
        <UniversalWrapper
            headerIcon={GiHouseKeys}
            headerText="Reset Password"
            subHeaderText="Enter your new password below (Strong passwords has combination of uppercase and lowercase letters, numbers, and symbols)"
            body={
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <Input
                        type="password"
                        label="New password"
                        placeholder="Fill in your new password"
                        variant="bordered"
                        defaultValue=""
                        {...register("password")}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message as string}
                    />
                    <Input
                        type="password"
                        label="Confirm new password"
                        variant="bordered"
                        defaultValue=""
                        {...register("confirmedPassword")}
                        isInvalid={!!errors.confirmedPassword}
                        errorMessage={errors.confirmedPassword?.message as string}
                    />
                    <Button type="submit" color="secondary" isLoading={isSubmitting} isDisabled={!isValid}>
                        Reset password
                    </Button>
                </form>
            }
            footer={
                <ResultMessage result={result} />
            }
        />
    )
}