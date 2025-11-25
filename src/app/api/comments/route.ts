import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
    try {
        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .order("created_at", { ascending: false })
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }
        return NextResponse.json(
            { message: "Comments Fetched!", success: true, data: data },
            { status: 200 })
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const { post_id, parent_id, content, level } = await req.json();
        console.log(parent_id);

        const user_id = checkedSession.userId;

        const res = await fetch(`${BASE_URL}/api/profiles/${user_id}`,{
            headers: {
                Cookie: req.headers.get("cookie") ?? ""
            }
        });
        if (!res.ok) {
            console.error("Profile fetch failed:", res.status);
            throw new Error(`Profile not found`);
        }

        const username = (await res.json()).data?.username;

        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("comments")
            .insert([{ user_id, post_id, parent_id, username, content, level }])
            .select();

        if (error) {
            console.error("Error posting comment:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Comment Created!", success: true, data: data },
            { status: 201 })

    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}


