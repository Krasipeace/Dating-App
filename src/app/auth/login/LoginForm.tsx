"use client"

import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched"
    });

    const onSubmit = (data: LoginSchema) => {
        console.log(data);
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-2">
                        <GiPadlock size={20} />
                        <h2 className="text-2xl font-bold">Login</h2>
                    </div>
                    <p className="text-neutral-500">Fill in your e-mail and password to login</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            defaultValue=""
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />
                        <Input
                            label="Password"
                            variant="bordered"
                            {...register("password")}
                            type="password"
                            defaultValue=""
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message as string}
                        />
                        <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}