import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/dal";
import { createBackClient } from "@/utils/supabase/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params; // await it here

  const checkedSession = await verifySession();
  if (!checkedSession)
    return NextResponse.json({ error: "Not Verified" }, { status: 401 });

  const { content } = await req.json();
  const supabase = await createBackClient();

  const { data, error } = await supabase
    .from("posts")
    .update({ content })
    .eq("id", id);

  if (error) {
    console.error("Error updating:", error.message);
    return NextResponse.json({ error: error.message, success: false }, { status: 400 });
  }

  return NextResponse.json({ message: "Comment Updated!", success: true, data }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params; 

  const checkedSession = await verifySession();
  if (!checkedSession)
    return NextResponse.json({ error: "Not Verified" }, { status: 401 });

  const supabase = await createBackClient();

  const { data, error } = await supabase
    .from("comment")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting:", error.message);
    return NextResponse.json({ error: error.message, success: false }, { status: 400 });
  }

  return NextResponse.json({ message: "Comment Deleted!", success: true, data }, { status: 200 });
}
