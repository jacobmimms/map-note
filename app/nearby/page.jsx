"use client";
import Loading from "@/app/components/animations/loading";
import { useState, useMemo } from "react";
import PostCard from "@/app/components/postCard";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";

function Nearby() {
  const [sortBy, setSortBy] = useState("proximity");
  const { posts, loading } = useLocationAndPosts();
  const memoSort = useMemo(() => {
    if (sortBy === "proximity") {
      return [...posts].sort((a, b) => a.distance - b.distance);
    }
    if (sortBy === "date") {
      return [...posts].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }
  }, [posts, sortBy]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center w-full h-full bg-slate-600`}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-0 bg-slate-700 z-8 rounded-md p-2 z-10">
        <span className="pr-2">sort by:</span>
        <select
          className="bg-slate-700 text-slate-300 h-full text-center"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="proximity">proximity</option>
          <option value="date">date</option>
        </select>
      </div>

      <section className="w-full pt-5 flex flex-col bg-slate-800 rounded-md z-0">
        <div className="w-full flex flex-row min-h-full flex-wrap  overflow-scroll justify-center gap-1">
          {memoSort.map((post) => (
            <PostCard key={post.id} post={post} size={`h-28 w-28`} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Nearby;
