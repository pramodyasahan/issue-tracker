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

    return (
        <div className="container flex justify-center flex-col max-w-3xl mx-auto mr-60">
            {error && (<Callout.Root color="red" className="mb-4">
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>)}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setError("An unexpected error occurred")
                }
            })}>
                <TextField.Root placeholder="Title" {...register("title")}/>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;