import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = await createBackClient();

        const { id } = await params;

        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .order("created_at", { ascending: false })
            .eq('parent_id', id);

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }
        return NextResponse.json(
            { message: "Replies Fetched!", success: true, data: data },
            { status: 200 })
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}