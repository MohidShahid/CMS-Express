import React, { useState } from "react";
import { Label, FileInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import authService from "../api/authService";

function UploadImg() {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState("");
  
  const fileSubmit = (data) => {
    const formData = new FormData();
    formData.append("profileImg", data.profileImg[0]); // Ensure correct field name
  
    authService
      .fileUpload(formData)
      .then((res) => setStatus("File uploaded successfully"))
      .catch((err) => setStatus("Upload failed"));
  };
  
  return (
    <div
      id="fileUpload"
      className="w-full my-28 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit(fileSubmit)} className="flex gap-3 flex-col">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Upload file" />
        </div>
        <FileInput
          id="file"
          helperText="A profile picture is useful to confirm your are logged into your account"
          {...register("profileImg")}
        />
        <Button type="submit">Submit</Button>
        <p className="text-slate-900 font-semibold">{status}</p>
      </form>
    </div>
  );
}

export default UploadImg;
