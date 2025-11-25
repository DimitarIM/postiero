import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { content } = await req.json();

        const supabase = await createBackClient();

        const {id} = await params;

        const { data, error } = await supabase
            .from("posts")
            .update({ content: content })
            .eq('id', id);

        if (error) {
            console.error("Error updating:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Comment Updated!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const {id} = await params;

        const { data, error } = await supabase
            .from("comment")
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Comment Deleted!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}
