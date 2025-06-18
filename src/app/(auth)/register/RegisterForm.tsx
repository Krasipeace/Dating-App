"use client";

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, profileSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Link } from "@heroui/react";
import { FormProvider, useForm } from "react-hook-form";
import { GiArchiveRegister } from "react-icons/gi";
import { toast } from "react-toastify";
import UserDetailsForm from "./UserDetailsForm";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";

const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = stepSchemas[activeStep];

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: "onTouched"
    });

    const { formState: { errors, isValid, isSubmitting }, handleSubmit, setError, getValues } = methods;

    const onSubmit = async () => {
        const result = await registerUser(getValues());

        if (result.status === "success") {
            router.push("/register/success");
            toast.success("Registration Successful");
        } else {
            handleFormServerErrors(result, setError);
        }
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserDetailsForm />
            case 1:
                return <ProfileForm />
            default:
                return "Welcome to Narnia";
        }
    }

    const onBack = () => {
        setActiveStep(prev => prev - 1);
    }

    const onNext = async () => {
        if (activeStep === stepSchemas.length - 1) {
            await onSubmit();
        } else {
            setActiveStep(prev => prev + 1);
        }
    }

    return (
        <AuthWrapper
            headerIcon={GiArchiveRegister}
            headerText="Register"
            subHeaderText="Welcome to HeartBound"
            body={
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className="space-y-4">
                            {getStepContent(activeStep)}
                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">{errors.root?.serverError.message}</p>
                            )}
                            <div className="flex flex-row items-center gap-6">
                                {activeStep !== 0 && (
                                    <Button onPress={onBack} fullWidth>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    isLoading={isSubmitting}
                                    isDisabled={!isValid}
                                    fullWidth
                                    color="secondary"
                                    type="submit"
                                >
                                    {activeStep === stepSchemas.length - 1 ? "Submit" : "Continue"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            }
            footer={
                <div className="flex justify-center w-full">
                    <Link href="/login" className="text-sm underline text-neutral-600">Already have an account?</Link>
                </div>
            }
        />
    )
}