import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}

async function getUserPosts(session) {
  return prisma.post.findMany({
    where: {
      authorId: session.id,
    },
  });
}

async function getNearbyPosts(location) {
  //   const posts = await prisma.$queryRaw`
  //   SELECT *, earth_distance(
  //     ll_to_earth(${location.latitude}, ${location.longitude}),
  //     ll_to_earth("latitude", "longitude")
  //   ) as distance
  //   FROM "posts"
  //   ORDER BY distance ASC
  // `;

  // just get all posts and include tags
  const posts = await prisma.post.findMany({
    include: {
      tags: true,
    },
  });
  return NextResponse.json(posts);
}

async function uploadPost(post, request) {
  const { id, content, location, tags } = post;
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL);
  }
  const result = await prisma.post.create({
    data: {
      title: id,
      author: { connect: { id: userId } },
      content: content,
      latitude: location.latitude,
      longitude: location.longitude,
      tags: {
        create: tags.map((tag) => ({ name: tag })),
      },
    },
  });
  return NextResponse.json(result);
}

async function getUserId(request) {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) {
    return null;
  }
  const userId = session?.user?.id;
  return userId;
}

export async function POST(request) {
  try {
    const { post, nearby } = await request.json();
    if (nearby) {
      return await getNearbyPosts(nearby.location);
    }
    if (post) {
      return await uploadPost(post, request);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
