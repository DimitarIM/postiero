import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const { data, error } = await supabase.from("post_categories").select('*').eq('post_id', params.id);

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Categories Fetched!", success: true, data: data },
            { status: 200 })
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { categoyId } = await req.json();

        const supabase = await createBackClient();

        const { data, error } = await supabase.from("post_categories").insert({ post_id: params.id, category_id: categoyId })

        if (error) {
            console.error("Error adding:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Post_Category Added!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function DELETE({ params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("posts_categories")
            .delete()
            .eq('post_id', params.id);

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
