"use client";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";
import Loading from "@/app/components/animations/loading";
import { useMapContext } from "@/app/providers/mapProvider";
import PostCard from "@/app/components/postCard";
import { useState } from "react";

function Post({ post }) {
  const { mapRef } = useMapContext();
  console.log(mapRef);

  function locatePost(latitude, longitude) {
    mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
  }

  return (
    <div className="flex">
      <PostCard key={post.id} post={post} size={`h-[60px] w-[60px]`} />
      <p>{post.content}</p>
      <button
        onClick={() => locatePost(post.latitude, post.longitude)}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Locate
      </button>
    </div>
  );
}

export default function PostList() {
  const { posts } = useLocationAndPosts();
  const [selectedCategory, setSelectedCategory] = useState({
    all: true,
    food: false,
    drink: false,
    fun: false,
    chill: false,
  });

  if (posts.length === 0) {
    return <Loading className={`absolute -inset-0 m-auto h-20 w-20`} />;
  }

  function SelectButton({ name, isSelected }) {
    return (
      <button
        onClick={() =>
          setSelectedCategory({ ...selectedCategory, [name]: !isSelected })
        }
        className={
          `bg-slate-500 text-white rounded-md p-2 ${
            isSelected ? "bg-slate-700" : ""
          }` + " w-[60px]"
        }
      >
        {name}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ul className="flex flex-row justify-around">
        <SelectButton name="all" isSelected={selectedCategory.all} />
        <SelectButton name="food" isSelected={selectedCategory.food} />
        <SelectButton name="drink" isSelected={selectedCategory.drink} />
        <SelectButton name="fun" isSelected={selectedCategory.fun} />
        <SelectButton name="chill" isSelected={selectedCategory.chill} />
      </ul>
      <ul className="w-full">
        {posts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
