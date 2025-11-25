import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const supabase = await createBackClient();

        const { id } = await context.params

        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Post Fetched!", success: true, data: data },
            { status: 200 })
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { title, upload_url, content } = await req.json();

        console.log(title, upload_url, content);
        const supabase = await createBackClient();
        const {id} = await context.params;

        const { data, error } = await supabase
            .from("posts")
            .update({ title: title, upload_url: upload_url, content: content })
            .eq('id', id);

        if (error) {
            console.error("Error updating:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Post Updated!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}



export async function DELETE(req:NextRequest, context: { params: Promise<{ id: string }> } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const {id} = await context.params;

        const { data, error } = await supabase
            .from("posts")
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
            { message: "Post Deleted!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}
