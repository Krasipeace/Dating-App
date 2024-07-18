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
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary-600">
                    <div className="flex flex-row items-center gap-2">
                        <GiPadlock size={20} />
                        <h2 className="text-2xl font-bold">Login</h2>
                    </div>
                    <p className="text-neutral-500">Enter e-mail and password to login</p>
                </div>
            </CardHeader>
            <CardBody>
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
                            fullWidth color="secondary"
                            type="submit">
                            Login
                        </Button>
                        <p className="text-secondary-800 text-center font-semibold">Login with</p>
                        <SocialLogin />
                        <div className="flex justify-center hover:underline text-sm">
                            <Link href="/forgot-password">Forgot password?</Link>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}