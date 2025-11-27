import z from "zod";

export const LoginFormSchema = z.object({
    email: z.email({ message: "Enter a valid email address" }),
    password: z.string().min(1),
})

export const SignUpFormSchema = z.object({
    username: z.string().min(3),
    email: z.string().min(2).max(50),
    password: z.string().min(1),
})

export const PostFormSchema = z.object({
    title: z.string().min(3),
    content: z.string().optional(),
    upload_url: z.string().optional(),
});

export const CommentFormSchema = z.object({
    content: z.string().min(1),
    parent_id: z.string().min(1).nullable(),
    post_id: z.string().min(1),
    level: z.number().min(0)
});