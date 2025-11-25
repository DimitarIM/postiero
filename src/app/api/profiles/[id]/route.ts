import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        const checkedSession = await verifySession();
        if (!checkedSession) return NextResponse.json({ error: "Not Verified" }, { status: 401 });

        const supabase = await createBackClient();

        const { id } = await params
        console.log(id);

        const { data, error } = await supabase
        .from("profiles")
        .select('*')
        .eq('id', id).single();

        console.log(data);

        if (error) {
            console.error("Error fetching: ", error.message);
            return NextResponse.json({ error: "Error Fetching", success: false }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Profile Fetched!", success: true, data: data },
            { status: 200 })
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return NextResponse.json({ error: "Unexpected Error", success: false }, { status: 500 })
    }
}
