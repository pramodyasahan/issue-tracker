"use client";

import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {Button, Callout, TextField, Text} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {validationSchema} from "@/app/validationSchema";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueFormProps = z.infer<typeof validationSchema>

const NewIssuePage = () => {
        const router = useRouter();
        const {
            register,
            control,
            handleSubmit,
            formState: {errors}
        } = useForm<IssueFormProps>({
            resolver: zodResolver(validationSchema)
        });

        const [error, setError] = useState('')
        const [isSubmitting, setIsSubmitting] = useState(false)

        const onSubmit = handleSubmit(async (data) => {
            try {
                setIsSubmitting(true)
                await axios.post('/api/issues', data);
                router.push('/issues');
            } catch (error) {
                setIsSubmitting(false)
                setError("An unexpected error occurred")
            }
        });

        return (
            <div className="container flex justify-center flex-col max-w-3xl mx-auto mr-60">
                {error && (<Callout.Root color="red" className="mb-4">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>)}
                <form className="space-y-3" onSubmit={onSubmit}>
                    <TextField.Root placeholder="Title" {...register("title")}/>
                    <ErrorMessage>{errors.title?.message}</ErrorMessage>
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
                    />
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>
                    <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
                </form>
            </div>
        );
    }
;

export default NewIssuePage;