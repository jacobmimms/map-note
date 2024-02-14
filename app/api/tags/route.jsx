import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function getPublicPostsWithTags() {
  try {
    return prisma.post.findMany({
      include: {
        tags: true,
      },
    });
  } catch (error) {
    console.error("Error retrieving posts with tags:", error);
    throw new Error("Failed to retrieve posts with tags");
  }
}

function getAllTags() {
  console.log(prisma);
  try {
    return prisma.tags.findMany();
  } catch (error) {
    console.error("Error retrieving tags:", error);
    throw new Error("Failed to retrieve tags");
  }
}

export async function GET() {
  try {
    const posts = await getAllTags();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.error("Failed to handle GET request");
  }
}
