"use client"
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function LikeButton({ commentId }: { commentId: number }) {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  const { data, refetch } = api.likes.getLikes.useQuery({ postId: commentId });

  useEffect(() => {
    if ((data?.likes ?? 0) > 0) {
      setLiked(true); 
    }
  }, [data]);

  const toggleLike = api.likes.toggleLike.useMutation({
    onSuccess: () => refetch(),
  });

  const handleLike = async () => {
    setLiked(!liked);
    await toggleLike.mutateAsync({ postId: commentId });
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-[#898989]">{data?.likes || 0}</span>
      <button onClick={handleLike}>
        <Heart
          className={`w-4 h-4 transition-colors ${
            liked ? "fill-[#898989] text-[#898989]" : "fill-none text-gray-500"
          }`}
        />
      </button>
    </div>
  );
}
