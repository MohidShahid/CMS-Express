import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Textarea } from "flowbite-react";
import configServiceInstance from "../api/config"

function AddPost() {
  const { register, handleSubmit, reset } = useForm();
  const [status , setStatus] = useState("")

  const handlePost = async(data) =>{
    try {
      await configServiceInstance.CreatePost(data);
      setStatus("Post Created Successfully")
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-start justify-start my-32 ml-20">
      <form className="flex max-w-md w-3/4 flex-col gap-4" onSubmit={handleSubmit(handlePost)}>
        <h1 className="font-bold text-slate-700">What's in your mind ?</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Your Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="write post title here..."
            required
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="content" value="Your Content" />
          </div>
          <Textarea
            id="comment"
            placeholder="Your Content here...."
            required
            rows={4}
            {...register("content", { content: "Content is required" })}
          />
        </div>
      <p>{status}</p>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default AddPost;
