'use client'

import PostsHomeGrid from "@/components/PostsHomeGrid";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="flex flex-col pt-[70px] justify-center items-center min-h-screen">
      <PostsHomeGrid/>
    </div>
  );
}
