import React from 'react'

function uploadImg() {
  return (
     <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput id="file" helperText="A profile picture is useful to confirm your are logged into your account" {...register("profileImg")} />
        </div>
  )
}

export default uploadImg