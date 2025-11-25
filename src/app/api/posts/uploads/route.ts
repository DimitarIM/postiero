import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();
        const { data, error } = await supabase.from('uploads')
            .select('*')
            .order("created_at", { ascending: false })
            .order("id", { ascending: false });;

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Uploads Fetched!", success: true, data: data },
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

        const { reqData } = await req.json();

        const supabase = await createBackClient();

        const { data, error } = await supabase.from("uploads").insert([reqData]).select();


        if (error) {
            console.error("Error adding:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Upload Added!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}

export async function DELETE() {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const { data, error } = await supabase
            .from("uploads")
            .delete()
            .eq('id', checkedSession.userId);

        if (error) {
            console.error("Error deleting:", error.message);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Upload Deleted!", success: true, data: data },
            { status: 201 })


    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}