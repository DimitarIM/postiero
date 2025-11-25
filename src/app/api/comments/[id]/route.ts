import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const checkedSession = await verifySession();
    if (!checkedSession)
      return NextResponse.json({ error: "Not Verified" }, { status: 401 });

    const { content } = await req.json();

    const supabase = await createBackClient();

    const { data, error } = await supabase
      .from("posts")
      .update({ content })
      .eq("id", params.id);

    if (error) {
      console.error("Error updating:", error.message);
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Comment Updated!", success: true, data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "Unexpected Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const checkedSession = await verifySession();
    if (!checkedSession)
      return NextResponse.json({ error: "Not Verified" }, { status: 401 });

    const supabase = await createBackClient();

    const { data, error } = await supabase
      .from("comment")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting:", error.message);
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Comment Deleted!", success: true, data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "Unexpected Error", success: false },
      { status: 500 }
    );
  }
}
