"use client";

import UniversalWrapper from "@/components/UniversalWrapper";
import { ProfileSchema, profileSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ImProfile } from "react-icons/im";
import ProfileForm from "../register/ProfileForm";
import { Button } from "@nextui-org/react";
import { completeSocialProfile } from "@/app/actions/authActions";
import { signIn } from "next-auth/react";

export default function CompleteProfileForm() {
    const methods = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        mode: "onTouched"
    });

    const { handleSubmit, formState: { errors, isSubmitting, isValid } } = methods;
    const onSubmit = async (data: ProfileSchema) => {
        const result = await completeSocialProfile(data);

        if (result.status === "success") {
            signIn(result.data, {
                callbackUrl: "/members"
            });
        }
    }
    return (
        <UniversalWrapper
            headerText="Profile details missing"
            subHeaderText="In order to use the app, you must add more details about yourself"
            headerIcon={ImProfile}
            body={
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <ProfileForm />
                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">{errors.root?.serverError.message}</p>
                            )}
                            <div className="flex flex-row items-center gap-6">
                                <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color="secondary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            }
        />
    )
}