import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function getUserId(request) {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) {
    return null;
  }
  const userId = session?.user?.id;
  return userId;
}

async function deletePost(postId, request) {
  const userId = await getUserId(request);
  console.log("userId", userId);
  if (!userId) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
  }
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  console.log(post);
  if (post.authorId !== userId) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
  }
  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const postId = url.pathname.split("/").pop();
  return deletePost(postId, request);
}
