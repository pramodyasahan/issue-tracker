"use client";

import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {Button, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";

interface IssueFormProps {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueFormProps>();

    return (
        <form className="max-w-2xl space-y-3" onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/issues', data);
            router.push('/issues');
        })}>
            <TextField.Root placeholder="Title" {...register("title")}/>
            <Controller
                name="description"
                control={control}
                render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;