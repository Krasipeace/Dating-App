"use client"

import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiArchiveRegister } from "react-icons/gi";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-2">
                        <GiArchiveRegister size={30} />
                        <h2 className="text-2xl font-bold">Register</h2>
                    </div>
                    <p className="text-neutral-500">Welcome to HeartBound</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Name"
                            variant="bordered"
                            {...register("name")}
                            defaultValue=""
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            defaultValue=""
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            variant="bordered"
                            {...register("password")}
                            type="password"
                            defaultValue=""
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}