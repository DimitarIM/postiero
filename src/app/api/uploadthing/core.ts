import { createBackClient } from "@/utils/supabase/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing();

export const ourFileRouter = {
    mediaUploader: f({
        image: { maxFileSize: "4MB" },
        })
    .middleware(async () => {
        const supabase = await createBackClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new UploadThingError("Unauthorized");

        return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
            const data = {
                user_id: metadata.userId,
                url: file.ufsUrl,
            }

            return data;

        })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;