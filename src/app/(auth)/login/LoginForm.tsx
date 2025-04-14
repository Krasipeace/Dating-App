"use client"

import { signInUser } from "@/app/actions/authActions";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import EyeToggleButton from "@/components/buttons/EyeToggleButton";
import AuthWrapper from "@/components/AuthWrapper";

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched"
    });
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data: LoginSchema) => {
        const result = await signInUser(data);
        if (result.status === "success") {
            router.push("/members");
            router.refresh();
            toast.success("Login Successful");
        } else {
            toast.error(result.error as string);
        }
    }

    return (
        <AuthWrapper
            headerIcon={GiPadlock}
            headerText="Login"
            subHeaderText="Enter e-mail and password to login"
            body={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            startContent={
                                <MdEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            defaultValue=""
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            startContent={
                                <PiPasswordBold className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Password"
                            variant="bordered"
                            {...register("password")}
                            defaultValue=""
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            type={isVisible ? "text" : "password"}
                            endContent={
                                <EyeToggleButton isVisible={isVisible} onClick={toggleVisibility} />
                            }
                        />
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            color="secondary"
                            type="submit"
                        >
                            Login
                        </Button>
                        <p className="text-secondary-800 text-center font-semibold">Login with</p>
                        <SocialLogin />
                    </div>
                </form>
            }
            footer={
                <div className="flex justify-center w-full">
                    <Link href="/forgot-password" className="text-sm underline text-red-800">Forgot password?</Link>
                </div>
            }
        />
    )
}