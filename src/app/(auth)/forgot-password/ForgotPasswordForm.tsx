"use client";

import { resetPasswordEmail } from "@/app/actions/authActions";
import ResultMessage from "@/components/ResultMessage";
import UniversalWrapper from "@/components/UniversalWrapper";
import { ActionResult } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form"
import { GiHouseKeys } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

export default function ForgotPasswordForm() {
    const { register, reset, handleSubmit, formState: { isValid, isSubmitting } } = useForm();
    const [result, setResult] = useState<ActionResult<string> | null>(null);

    const onSubmit = async (data: FieldValues) => {
        setResult(await resetPasswordEmail(data.email));
        reset();
    }

    return (
        <UniversalWrapper
            headerIcon={GiHouseKeys}
            headerText="Forgot Password"
            subHeaderText="Enter your email address to receive a link to reset your password"
            body={
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <Input
                        startContent={
                            <MdEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        type="email"
                        label="Email address"
                        placeholder="your.email@example.com"
                        variant="bordered"
                        defaultValue=""
                        {...register("email", { required: true })}
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