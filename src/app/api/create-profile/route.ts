import { NextRequest, NextResponse } from "next/server";
import { createBackClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createBackClient();
  const { id, email, username } = await req.json();

  const { error } = await supabase
    .from("profiles")
    .insert([{ id, email, username }]);

    
  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}