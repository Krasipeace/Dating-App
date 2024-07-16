"use client";

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { FaTreeCity } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";

export default function ProfileForm() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]

    return (
        <div className="space-y-4">
            <Select
                isRequired
                aria-label="Choose your gender"
                label="Gender"
                variant="bordered"
                {...register("gender")}
                defaultSelectedKeys={getValues("gender")}
                isInvalid={!!errors.gender}
                errorMessage={errors.gender?.message as string}
                onChange={e => setValue("gender", e.target.value)}
            >
                {genders.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                isRequired
                label="Date of Birth"
                variant="bordered"
                type="date"
                {...register("birthDate")}
                defaultValue={getValues("birthDate")}
                isInvalid={!!errors.birthDate}
                errorMessage={errors.birthDate?.message as string}
            />
            <Input
                startContent={
                    <MdOutlinePlace className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isRequired
                label="Country"
                variant="bordered"
                {...register("country")}
                defaultValue={getValues("country")}
                isInvalid={!!errors.country}
                errorMessage={errors.country?.message as string}
            />
            <Input
                startContent={
                    <FaTreeCity className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isRequired
                label="City"
                variant="bordered"
                {...register("city")}
                defaultValue={getValues("city")}
                isInvalid={!!errors.city}
                errorMessage={errors.city?.message as string}
            />
            <Textarea
                startContent={
                    <TbFileDescription className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isRequired
                label="Description"
                variant="bordered"
                {...register("description")}
                defaultValue={getValues("description")}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message as string}
            />
        </div>
    )
}