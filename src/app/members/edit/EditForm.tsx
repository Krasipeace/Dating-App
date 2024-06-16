"use client";

import { updateProfile } from "@/app/actions/userActions";
import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema";
import { handleFormServerErrors } from "@/lib/utilities";
import { EditFormProps } from "@/types/editFormProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditForm({ member }: EditFormProps) {
    const router = useRouter();
    const { register, handleSubmit, reset, setError, formState: { isValid, isDirty, isSubmitting, errors } } = useForm<MemberEditSchema>({
        resolver: zodResolver(memberEditSchema),
        mode: "onTouched",
    });

    useEffect(() => {
        if (member) {
            reset({
                name: member.name,
                description: member.description,
                city: member.city,
                country: member.country,
            });
        }
    }, [member, reset]);

    const onSubmit = async (data: MemberEditSchema) => {
        const nameUpdated = data.name !== member.name;
        const result = await updateProfile(data, nameUpdated);

        if (result.status === "success") {
            toast.success("Profile Updated");
            router.refresh();
            reset({ ...data });
        } else {
            handleFormServerErrors(result, setError);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <Input
                label="Name"
                variant="bordered"
                {...register("name")}
                defaultValue={member.name}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
            />
            <Textarea
                label="Description"
                variant="bordered"
                {...register("description")}
                defaultValue={member.description}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                minRows={6}
                maxRows={10}
            />
            <div className="flex flex-row gap-3">
                <Input
                    label="City"
                    variant="bordered"
                    {...register("city")}
                    defaultValue={member.city}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                />
                <Input
                    label="Country"
                    variant="bordered"
                    {...register("country")}
                    defaultValue={member.country}
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                />
            </div>
            {errors.root?.serverError && (
                <p className="text-danger text-sm">{errors.root?.serverError.message}</p>
            )}
            <Button
                type="submit"
                className="flex self-end"
                variant="solid"
                isDisabled={!isValid || !isDirty}
                color="secondary"
            >
                Update Info
            </Button>
        </form>
    )
}