import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false })
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Posts Fetched!", success: true, data: data },
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

        const { username, full_name, avatar_url, bio } = await req.json();

        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("users")
            .insert([{ username, full_name, avatar_url, bio }])

        if (error) {
            console.error("Error Adding: ", error.message);
            return NextResponse.json({ error: "Error Adding", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "User Added!", success: true, data: data },
            { status: 201 }
        )
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function PUT() {
}

export async function DELETE() {
}

