"use client";

import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface IssueFormProps {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueFormProps>();
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
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;