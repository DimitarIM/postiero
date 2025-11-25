"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PostFormSchema } from "./formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2, UserPlus } from "lucide-react";
import TextEditor from "../text-editor/TextEditor";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useUploadStore } from "@/store/useUploadStore";
import { usePostStore } from "@/store/usePostStore";
import { PostType } from "@/types/types";


function PostUpdateForm({ post }: {post:PostType}) {
  const { loading, editPost, setFormData } = usePostStore();
  const { upload, fetchUpload, deleteUpload } = useUploadStore();

  const [editorContent, setEditorContent] = useState(post.content || "");
  const [preview, setPreview] = useState<string | null>(post.upload_url || null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string>("");

  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: (res) => {
      const fileUrl = res[0].ufsUrl;
      setValue("upload_url", fileUrl);
      setFile(null);
      setProgress(0);
      fetchUpload();
      setUploadError("");
    },
    onUploadError: (err) => {
      setUploadError(err.message);
    },
    onUploadProgress: setProgress,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (files) => {
      const f = files[0];
      setPreview(URL.createObjectURL(f));
      setFile(f);
    },
  });

  const { register, handleSubmit, setValue, reset } = useForm<
    z.infer<typeof PostFormSchema>
  >({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      upload_url: post.upload_url || undefined,
    },
  });

  useEffect(() => {
    setValue("content", editorContent);
  }, [editorContent, setValue]);

  useEffect(() => {
    reset({
      title: post.title,
      content: post.content,
      upload_url: post.upload_url || undefined,
    });
  }, [post, reset]);

  async function onUpdateSubmit(values: z.infer<typeof PostFormSchema>) {
  setFormData({
    title: values.title,
    content: values.content,
    upload_url: values.upload_url,
  });

  editPost(post.id);
}

  return (
    <div className="z-2 min-h-[calc(100vh-70px)] flex flex-col bg-foreground text-accent justify-center items-center gap-10 p-10">
      <h4 className="font-bold pt-3 text-4xl">Edit Post</h4>

      <form
        className="flex flex-col gap-y-5 justify-center items-center"
        onSubmit={handleSubmit(onUpdateSubmit, (errors) => console.log(errors))}
      >
        {/* Title */}
        <input
          {...register("title")}
          placeholder="Title"
          className="border-b border-accent focus:outline-none w-full"
        />

        {/* Image Upload */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Preview</h1>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
              isDragActive
                ? "border-blue-500 bg-blue"
                : "border-gray-300 bg-white"
            }`}
          >
            <input {...getInputProps()} />

            {!preview ? (
              <p className="text-gray-600">
                Drag and drop or click to select a file
              </p>
            ) : (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  width={400}
                  height={200}
                  className="max-h-64 mx-auto rounded"
                />
                <p className="text-sm">{file?.name}</p>
              </>
            )}
          </div>

          {!isUploading && file && (
            <>
              {uploadError && (
                <p className="text-red-600">
                  {uploadError.includes("FileSizeMismatch")
                    ? "File too large (Max 4MB)"
                    : "Upload Error"}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  if (upload) deleteUpload();
                  startUpload([file]);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Upload
              </button>
            </>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm">{progress}%</p>
            </div>
          )}
        </div>

        {/* Editor */}
        <TextEditor content={editorContent} onChange={setEditorContent} />
        <input type="hidden" {...register("content")} />
        
        {/* Submit */}
        <button
          type="submit"
          className="flex justify-center items-center bg-detail text-foreground cursor-pointer h-6 min-w-60"
          onClick={()=>{router.push(`/post/${post.id}`)}}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Update"}
        </button>
        
      </form>
    </div>
  );
}

export default PostUpdateForm;
